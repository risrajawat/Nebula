"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

// Define a type for contributors
interface Contributor {
  login: string;
  count: number;
  avatar: string;
  html_url: string;
}

function LeaderboardContest() {
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setIsSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    async function fetchPRContributors() {
      setLoading(true);
      setError("");
      try {
        let page = 1;
        let allPRs: any[] = [];
        const headers: Record<string, string> = {};
        if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
          headers["Authorization"] =
            `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
        }
        while (true) {
          const res = await fetch(
            `https://api.github.com/repos/SASTxNST/Website_SAST/pulls?state=all&per_page=100&page=${page}`,
            { headers }
          );
          const prs: any[] = await res.json();
          if (!Array.isArray(prs) || prs.length === 0) break;
          allPRs = allPRs.concat(prs);
          if (prs.length < 100) break;
          page++;
        }
        // Count PRs per user
        const prCount: Record<string, number> = {};
        const userInfo: Record<string, { avatar: string; html_url: string }> =
          {};
        allPRs.forEach((pr) => {
          if (pr.user && pr.user.login) {
            const login = pr.user.login as string;
            prCount[login] = (prCount[login] || 0) + 1;
            if (!userInfo[login]) {
              userInfo[login] = {
                avatar: pr.user.avatar_url,
                html_url: pr.user.html_url,
              };
            }
          }
        });
        // Convert to array and sort
        const sorted: Contributor[] = Object.entries(prCount)
          .map(([login, count]) => ({
            login,
            count: count as number,
            avatar: userInfo[login].avatar,
            html_url: userInfo[login].html_url,
          }))
          .sort((a, b) => b.count - a.count);
        setContributors(sorted);
      } catch (e) {
        setError("Failed to fetch PR data from GitHub.");
      }
      setLoading(false);
    }
    fetchPRContributors();
  }, []);

  if (!mounted) return null;

  // Podium logic for top 3
  const podium = contributors.slice(0, 3);

  return (
    <div className="leaderboard-bg">
      <Sidebar
        setActiveSection={() => {}}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <main className="leaderboard-main">
        <div className="leaderboard-header">
          <div className="leaderboard-title-group">
            <span className="leaderboard-contest-label">LEADERBOARD</span>
            <h1 className="leaderboard-title">GitHub PR Rankings</h1>
          </div>
        </div>

        {loading ? (
          <div
            style={{
              color: "#fff",
              margin: "2rem",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            Loading...
          </div>
        ) : error ? (
          <div
            style={{
              color: "red",
              margin: "2rem",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        ) : (
          <>
            <div className="leaderboard-podium">
              {podium[1] && (
                <div className="podium-item second">
                  <div className="podium-avatar">
                    <img src={podium[1].avatar} alt={podium[1].login} />
                    <span className="podium-rank">2</span>
                  </div>
                  <div className="podium-name">{podium[1].login}</div>
                  <div className="podium-score">{podium[1].count} PRs</div>
                </div>
              )}
              {podium[0] && (
                <div className="podium-item first">
                  <div className="podium-avatar">
                    <img src={podium[0].avatar} alt={podium[0].login} />
                    <span className="podium-rank">1</span>
                  </div>
                  <div className="podium-name">{podium[0].login}</div>
                  <div className="podium-score">{podium[0].count} PRs</div>
                </div>
              )}
              {podium[2] && (
                <div className="podium-item third">
                  <div className="podium-avatar">
                    <img src={podium[2].avatar} alt={podium[2].login} />
                    <span className="podium-rank">3</span>
                  </div>
                  <div className="podium-name">{podium[2].login}</div>
                  <div className="podium-score">{podium[2].count} PRs</div>
                </div>
              )}
            </div>

            <div className="leaderboard-table-wrapper">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>RANK</th>
                    <th>USER</th>
                    <th>PRs</th>
                    <th>PROFILE</th>
                  </tr>
                </thead>
                <tbody>
                  {contributors.map((user, idx) => (
                    <tr
                      key={user.login}
                      className={idx === 0 ? "highlight-row" : ""}
                    >
                      <td>
                        <span
                          className={`rank-badge rank-${
                            idx + 1 <= 3 ? idx + 1 : "default"
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </td>
                      <td className="user-cell">
                        <img
                          src={user.avatar}
                          alt={user.login}
                          className="user-avatar"
                        />
                        <span className="user-name">{user.login}</span>
                      </td>
                      <td>
                        <span className="score-badge">{user.count}</span>
                      </td>
                      <td>
                        <a
                          href={user.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#3182ce",
                            textDecoration: "underline",
                          }}
                        >
                          Profile
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
      <style jsx>{`
        .leaderboard-bg {
          min-height: 100vh;
          background: linear-gradient(180deg, #1a1a2e 0%, #222244 100%);
          display: flex;
          width: 100%;
          overflow-x: hidden;
          position: relative;
        }

        .leaderboard-main {
          flex: 1;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.3s ease-out;
          margin-left: ${isSidebarOpen ? "0" : "0"};
          width: ${isSidebarOpen ? "calc(100% - 20rem)" : "100%"};
          font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            sans-serif;
        }

        .leaderboard-header {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          transition: all 0.3s ease-out;
          position: relative;
          margin-left: auto;
          margin-right: auto;
          left: 0; /* Remove left offset for centering */
          text-align: center; /* Center text inside */
        }
        .leaderboard-title-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .leaderboard-contest-label {
          color: #fff;
          background: #3182ce;
          border-radius: 8px;
          padding: 0.2rem 1.2rem;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }
        .leaderboard-title {
          color: #fff;
          font-size: 2.7rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .leaderboard-howitworks {
          background: #fff;
          color: #2c5282;
          border: none;
          border-radius: 12px;
          font-weight: 500;
          font-size: 1.1rem;
          padding: 0.6rem 1.5rem;
          cursor: pointer;
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
        }
        .leaderboard-podium {
          width: 100%;
          max-width: 1100px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
          transition: all 0.3s ease-out;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          /* Removed left offset for centering */
        }
        .podium-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: none;
        }
        .podium-item .podium-avatar {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
          box-shadow: 0 2px 12px 0 rgba(44, 34, 100, 0.12);
        }
        .podium-item.first .podium-avatar {
          width: 110px;
          height: 110px;
          margin-bottom: 0.5rem;
        }
        .podium-item .podium-avatar img {
          width: 80%;
          height: 80%;
          border-radius: 50%;
          object-fit: cover;
        }
        .podium-item .podium-rank {
          position: absolute;
          bottom: -18px;
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          color: #2d1e60;
          font-weight: 700;
          font-size: 1.2rem;
          border-radius: 50%;
          padding: 0.2rem 0.9rem;
          box-shadow: 0 2px 8px 0 rgba(44, 34, 100, 0.1);
        }
        .podium-item.first .podium-rank {
          font-size: 1.4rem;
          padding: 0.2rem 1.2rem;
        }
        .podium-item .podium-name {
          color: #fff;
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
        }
        .podium-item .podium-score {
          color: #ffb800;
          font-weight: 700;
          font-size: 1.1rem;
        }
        .podium-item.first {
          margin-bottom: 1.5rem;
        }
        .leaderboard-xp-banner {
          background: #2b6cb0;
          color: #fff;
          border-radius: 18px;
          padding: 1.2rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1100px;
          width: 100%;
          margin-bottom: 2.5rem;
          font-size: 1.15rem;
          font-weight: 500;
        }
        .leaderboard-xp-sub {
          font-size: 1rem;
          font-weight: 400;
        }
        .leaderboard-xp-actions {
          display: flex;
          gap: 1rem;
        }
        .leaderboard-xp-btn {
          background: #fff;
          color: #2b6cb0;
          border: none;
          border-radius: 12px;
          font-weight: 500;
          font-size: 1.1rem;
          padding: 0.7rem 1.5rem;
          cursor: pointer;
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
        }
        .leaderboard-table-wrapper {
          width: 100%;
          max-width: 1300px; /* Increased from 1100px to 1300px */
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 16px 0 rgba(44, 34, 100, 0.1);
          overflow-x: auto;
          transition: all 0.3s ease-out;
          margin: 0 auto;
          position: relative;
        }

        .leaderboard-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 1.08rem;
          min-width: 800px;
          max-width: 1000px; /* Prevent content from stretching too much */
          margin: 0 auto; /* Center the table inside the wrapper */
        }
        .leaderboard-table thead tr {
          background: #f7f7fa;
        }
        .leaderboard-table th,
        .leaderboard-table td {
          padding: 1.1rem 0.8rem;
          text-align: left;
          font-weight: 600;
        }
        .leaderboard-table th {
          color: #3182ce;
          font-size: 1.05rem;
          font-weight: 700;
        }
        .leaderboard-table td {
          color: #2d1e60;
          font-weight: 500;
        }
        .leaderboard-table .user-cell {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }
        .user-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e6e6ff;
        }
        .user-name {
          font-weight: 600;
          color: #2d1e60;
        }
        .score-badge {
          color: #ffb800;
          font-weight: 700;
          font-size: 1.1rem;
        }
        .submission-cell {
          color: #4299e1;
          font-size: 1rem;
        }
        .rank-badge {
          display: inline-block;
          min-width: 2.2rem;
          text-align: center;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          background: #f7f7fa;
          color: #2d1e60;
        }
        .rank-1 {
          background: #ffe066;
          color: #2d1e60;
        }
        .rank-2 {
          background: #e6e6e6;
          color: #2d1e60;
        }
        .rank-3 {
          background: #ffd6a0;
          color: #2d1e60;
        }
        .highlight-row {
          background: #fff7e6;
        }
        @media (max-width: 1200px) {
          .leaderboard-header,
          .leaderboard-podium,
          .leaderboard-table-wrapper {
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
            /* Remove left offset for centering */
          }
        }
        @media (max-width: 1024px) {
          .leaderboard-header,
          .leaderboard-podium,
          .leaderboard-table-wrapper {
            max-width: calc(100% - 2rem);
            margin-left: auto;
            margin-right: auto;
          }
        }
        @media (max-width: 768px) {
          .leaderboard-main {
            padding: 1.5rem;
            margin-left: 0;
          }
          .leaderboard-header {
            padding: 0;
          }
          .leaderboard-title {
            font-size: 2rem;
            text-align: center;
          }
          .leaderboard-table {
            min-width: 700px;
          }
        }
        @media (max-width: 480px) {
          .leaderboard-main {
            padding: 1rem;
          }
          .leaderboard-table {
            min-width: 600px;
          }
          .leaderboard-table th,
          .leaderboard-table td {
            padding: 0.6rem 0.4rem;
            font-size: 0.85rem;
          }
        }
        @media (max-width: 1400px) {
          .leaderboard-table-wrapper {
            max-width: 1100px;
          }
        }
      `}</style>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default LeaderboardContest;
