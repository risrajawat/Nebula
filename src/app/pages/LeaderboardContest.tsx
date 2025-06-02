"use client";
import Image from "next/image";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const leaderboardData = [
  {
    rank: 1,
    name: "Shitanshu Kumar Singh",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    score: 888,
    lastSubmission: "13 days ago",
  },
  {
    rank: 2,
    name: "Avi Meher",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    score: 870,
    lastSubmission: "18 days ago",
  },
  {
    rank: 3,
    name: "Adityaraj Pal",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    score: 868,
    lastSubmission: "19 days ago",
  },
  // ...add more users as needed
  {
    rank: 51,
    name: "Ankit Kumar Pandey",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    score: 290,
    lastSubmission: "20 days ago",
  },
];

const months = ["All Time", "May 25"];

const LeaderboardPage = () => {
  // Avoid hydration errors by ensuring the component only renders on the client
  const [mounted, setMounted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(months[1]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="leaderboard-bg">
      <Sidebar setActiveSection={() => {}} />
      <main className="leaderboard-main">
        <div className="leaderboard-header">
          <div className="leaderboard-tabs">
            {months.map((month) => (
              <button
                key={month}
                className={`leaderboard-tab${
                  selectedMonth === month ? " active" : ""
                }`}
                onClick={() => setSelectedMonth(month)}
              >
                {month}
              </button>
            ))}
          </div>
          <div className="leaderboard-title-group">
            <span className="leaderboard-contest-label">MAY 2025 CONTEST</span>
            <h1 className="leaderboard-title">Leaderboard</h1>
          </div>
          <button className="leaderboard-howitworks">How it Works</button>
        </div>

        <div className="leaderboard-podium">
          <div className="podium-item second">
            <div className="podium-avatar">
              <Image
                src={leaderboardData[1].avatar}
                alt={leaderboardData[1].name}
              />
              <span className="podium-rank">2</span>
            </div>
            <div className="podium-name">Avi Meher</div>
            <div className="podium-score">870</div>
          </div>
          <div className="podium-item first">
            <div className="podium-avatar">
              <Image
                src={leaderboardData[0].avatar}
                alt={leaderboardData[0].name}
              />
              <span className="podium-rank">1</span>
            </div>
            <div className="podium-name">Shitanshu Ku...</div>
            <div className="podium-score">888</div>
          </div>
          <div className="podium-item third">
            <div className="podium-avatar">
              <Image
                src={leaderboardData[2].avatar}
                alt={leaderboardData[2].name}
              />
              <span className="podium-rank">3</span>
            </div>
            <div className="podium-name">Adityaraj Pal</div>
            <div className="podium-score">868</div>
          </div>
        </div>

        <div className="leaderboard-xp-banner">
          <span>
            Increase your XP to climb the leaderboard!
            <br />
            <span className="leaderboard-xp-sub">
              Solve assignments, arena questions, contests, and quizzes.
            </span>
          </span>
          <div className="leaderboard-xp-actions">
            <button className="leaderboard-xp-btn">Solve Assignments</button>
            <button className="leaderboard-xp-btn">Go To Arena</button>
          </div>
        </div>

        <div className="leaderboard-table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>RANK</th>
                <th>CHANGE</th>
                <th>NAME</th>
                <th>XP THIS MONTH</th>
                <th>LATEST SUBMISSION</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, idx) => (
                <tr
                  key={user.rank}
                  className={user.rank === 51 ? "highlight-row" : ""}
                >
                  <td>
                    <span
                      className={`rank-badge rank-${
                        user.rank <= 3 ? user.rank : "default"
                      }`}
                    >
                      {user.rank}
                    </span>
                  </td>
                  <td>–</td>
                  <td className="user-cell">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      className="user-avatar"
                    />
                    <span className="user-name">{user.name}</span>
                  </td>
                  <td>
                    <span className="score-badge">{user.score}</span>
                  </td>
                  <td className="submission-cell">{user.lastSubmission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <style jsx>{`
        .leaderboard-bg {
          min-height: 100vh;
          background: linear-gradient(180deg, #2d1e60 0%, #3a2e7b 100%);
          display: flex;
        }
        .leaderboard-main {
          flex: 1;
          padding: 2rem 0.5rem 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .leaderboard-header {
          width: 100%;
          max-width: 1100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          gap: 1rem;
        }
        .leaderboard-tabs {
          display: flex;
          gap: 0.5rem;
        }
        .leaderboard-tab {
          background: #fff;
          color: #2d1e60;
          border: none;
          border-radius: 16px;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 0.5rem 1.5rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .leaderboard-tab.active {
          background: #6c47ff;
          color: #fff;
        }
        .leaderboard-title-group {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .leaderboard-contest-label {
          color: #fff;
          background: #6c47ff;
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
          font-weight: 800;
          letter-spacing: 0.02em;
        }
        .leaderboard-howitworks {
          background: #fff;
          color: #2d1e60;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 0.6rem 1.5rem;
          cursor: pointer;
          box-shadow: 0 2px 8px 0 rgba(44, 34, 100, 0.08);
        }
        .leaderboard-podium {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
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
          background: #7c5cff;
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
          font-weight: 600;
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
          color: #7c5cff;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 0.7rem 1.5rem;
          cursor: pointer;
          box-shadow: 0 2px 8px 0 rgba(44, 34, 100, 0.08);
        }
        .leaderboard-table-wrapper {
          width: 100%;
          max-width: 1100px;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 16px 0 rgba(44, 34, 100, 0.1);
          overflow-x: auto;
        }
        .leaderboard-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 1.08rem;
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
          color: #7c5cff;
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
          color: #7c5cff;
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
        @media (max-width: 900px) {
          .leaderboard-main,
          .leaderboard-header,
          .leaderboard-xp-banner,
          .leaderboard-table-wrapper {
            max-width: 98vw;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          .leaderboard-podium {
            gap: 1.2rem;
          }
        }
        @media (max-width: 600px) {
          .leaderboard-main {
            padding: 1rem 0.1rem 1rem 0;
          }
          .leaderboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.7rem;
          }
          .leaderboard-title {
            font-size: 2rem;
          }
          .leaderboard-podium {
            gap: 0.5rem;
          }
          .podium-item .podium-avatar {
            width: 60px;
            height: 60px;
          }
          .podium-item.first .podium-avatar {
            width: 80px;
            height: 80px;
          }
          .leaderboard-xp-banner {
            flex-direction: column;
            align-items: flex-start;
            font-size: 1rem;
            padding: 0.7rem 1rem;
            gap: 0.7rem;
          }
          .leaderboard-xp-actions {
            width: 100%;
            justify-content: flex-end;
          }
          .leaderboard-table th,
          .leaderboard-table td {
            padding: 0.7rem 0.4rem;
            font-size: 0.98rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LeaderboardPage;

// Add this at the bottom to register the page route for Next.js App Router
export const dynamic = "force-static";
