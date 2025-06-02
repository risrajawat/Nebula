"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import TopStatsBlock from "../components/TopLang";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const ContributionGraph = dynamic(() => import("react-github-calendar"), {
  ssr: false,
});

interface Repo {
  owner: string;
  name: string;
}

interface ProfileProps {
  repositories: Repo[];
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  githubId?: string;
  createdAt: string;
  updatedAt: string;
  profilePic?: string;
}

interface CommitDetail {
  repoName: string;
  message: string;
  date: string;
  sha: string;
  url: string;
}

interface MergeDetail {
  repoName: string;
  title: string;
  date: string;
  url: string;
}

const Profile: React.FC<ProfileProps> = ({ repositories }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    githubId: "",
    profilePic: "",
  });
  const [commitDetails, setCommitDetails] = useState<CommitDetail[]>(
    JSON.parse(localStorage.getItem("cachedCommits") || "[]")
  );
  const [mergeDetails, setMergeDetails] = useState<MergeDetail[]>(
    JSON.parse(localStorage.getItem("cachedMerges") || "[]")
  );
  const [repoMeta, setRepoMeta] = useState<any[]>([]);
  const [lastFetched, setLastFetched] = useState<number | null>(null);
  const [nextFetchTime, setNextFetchTime] = useState<string>("");
  const [contributorRank, setContributorRank] = useState<number | null>(null);
  const [topLanguages, setTopLanguages] = useState<string[]>([]);
  const [estimatedTime, setEstimatedTime] = useState<string>("");

  const [lineChartType, setLineChartType] = useState<
    "commits" | "issues" | "prs"
  >("commits");
  const [lineChartData, setLineChartData] = useState({
    commits: [] as { date: string; count: number }[],
    issues: [] as { date: string; count: number }[],
    prs: [] as { date: string; count: number }[],
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    const savedProfile = localStorage.getItem("savedProfile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setFormData(parsed);
      setUser((prev) => ({ ...(prev as UserData), ...parsed }));
    }

    fetch("/api/getuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData((prev) => ({ ...data, ...prev }));
      });
  }, []);

  useEffect(() => {
    if (formData.githubId) {
      setFormData((prev) => ({
        ...prev,
        profilePic: `https://github.com/${formData.githubId}.png`,
      }));
    }
  }, [formData.githubId]);

  const handleSave = () => {
    if (!formData.username || !formData.githubId) {
      toast.error("Username and GitHub ID are required.");
      return;
    }
    localStorage.setItem("savedProfile", JSON.stringify(formData));
    toast.success("Profile changes saved locally!");
    setUser({ ...(user as UserData), ...formData });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchAll = async () => {
      if (!formData.githubId) return;
      const now = Date.now();
      if (lastFetched && now - lastFetched < 5 * 60 * 1000) return;

      try {
        const [eventsRes, repoRes, contributorsRes] = await Promise.all([
          fetch(`https://api.github.com/repos/SASTxNST/Website_SAST/events`),
          fetch("https://api.github.com/repos/SASTxNST/Website_SAST"),
          fetch(
            "https://api.github.com/repos/SASTxNST/Website_SAST/contributors"
          ),
        ]);

        const events = await eventsRes.json();
        const repo = await repoRes.json();
        const contributors = await contributorsRes.json();

        setRepoMeta([repo]);

        const commits: CommitDetail[] = [];
        const merges: MergeDetail[] = [];

        const commitMap: Record<string, number> = {};
        const issueMap: Record<string, number> = {};
        const prMap: Record<string, number> = {};

        if (Array.isArray(events)) {
          events.forEach((event: any) => {
            const dateStr = new Date(event.created_at).toLocaleDateString();

            if (event.type === "PushEvent") {
              event.payload.commits.forEach((c: any) => {
                commits.push({
                  repoName: event.repo.name,
                  message: c.message,
                  date: new Date(event.created_at).toLocaleString(),
                  sha: c.sha,
                  url: `https://github.com/${event.repo.name}/commit/${c.sha}`,
                });
                commitMap[dateStr] = (commitMap[dateStr] || 0) + 1;
              });
            } else if (
              event.type === "PullRequestEvent" &&
              event.payload.pull_request?.merged
            ) {
              merges.push({
                repoName: event.repo.name,
                title: event.payload.pull_request.title,
                date: new Date(
                  event.payload.pull_request.merged_at
                ).toLocaleString(),
                url: event.payload.pull_request.html_url,
              });
            }

            if (
              event.type === "IssuesEvent" &&
              event.payload.action === "opened"
            ) {
              issueMap[dateStr] = (issueMap[dateStr] || 0) + 1;
            }

            if (
              event.type === "PullRequestEvent" &&
              event.payload.action === "opened"
            ) {
              prMap[dateStr] = (prMap[dateStr] || 0) + 1;
            }
          });
        }

        setCommitDetails(commits);
        setMergeDetails(merges);
        localStorage.setItem("cachedCommits", JSON.stringify(commits));
        localStorage.setItem("cachedMerges", JSON.stringify(merges));
        setLastFetched(now);

        const next = new Date(now + 5 * 60 * 1000);
        setNextFetchTime(next.toLocaleTimeString());

        const rank =
          contributors.findIndex((c: any) => c.login === formData.githubId) + 1;
        setContributorRank(rank > 0 ? rank : null);

        const formatMap = (map: Record<string, number>) =>
          Object.entries(map).map(([date, count]) => ({ date, count }));

        setLineChartData({
          commits: formatMap(commitMap),
          issues: formatMap(issueMap),
          prs: formatMap(prMap),
        });
      } catch (err) {
        console.error("Unexpected GitHub fetch error:", err);
        toast.error(
          "GitHub API failed. Possibly rate-limited or user not found."
        );
      }
    };

    const interval = setInterval(fetchAll, 5 * 60 * 1000);
    fetchAll();
    return () => clearInterval(interval);
  }, [formData.githubId, lastFetched]);

  const stars = repoMeta[0]?.stargazers_count || 0;
  const forks = repoMeta[0]?.forks_count || 0;

  const barData = commitDetails.reduce((acc: any, commit) => {
    const date = commit.date.split(",")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const formattedChartData = Object.entries(barData).map(([date, count]) => ({
    date,
    count,
  }));

  const pieData = [
    { name: "Commits", value: commitDetails.length },
    { name: "PR Merges", value: mergeDetails.length },
  ];
  const pieColors = ["#4fc3f7", "#8884d8"];

  return (
    <div className="min-h-screen p-6 text-white font-orbitron">
      <Toaster />

      <div className="flex justify-between items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome, {formData.username}
          </h1>
          <p className="text-sm text-gray-400">
            Next update at: {nextFetchTime}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm bg-[#2a2f4a] px-3 py-1 rounded-full">
            ⭐ Stars: {stars}
          </div>
          <div className="text-sm bg-[#2a2f4a] px-3 py-1 rounded-full">
            🍴 Forks: {forks}
          </div>
          <button
            onClick={handleLogout}
            className="ml-4 text-sm px-3 py-1 rounded bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <TopStatsBlock
        topLanguages={topLanguages}
        estimatedTime={estimatedTime}
        contributorRank={contributorRank}
        nextFetchTime={nextFetchTime}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-300">Username</span>
            <input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 rounded bg-[#1E1E3F] border border-gray-600"
              placeholder="Enter your name"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-300">GitHub Username</span>
            <input
              value={formData.githubId}
              onChange={(e) =>
                setFormData({ ...formData, githubId: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 rounded bg-[#1E1E3F] border border-gray-600"
              placeholder="GitHub handle"
            />
          </label>
          <button
            onClick={handleSave}
            className="px-4 py-2 mt-2 rounded bg-green-600 hover:bg-green-700 text-sm"
          >
            Save Changes
          </button>
        </div>

        <div className="bg-[#1E1E3F] p-4 rounded-xl flex flex-col items-center justify-center">
          <p className="text-sm mb-2 text-gray-300">
            Profile Picture (from GitHub)
          </p>
          {formData.profilePic && (
            <Image
              src={formData.profilePic}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#4fc3f7]"
            />
          )}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-400">Public Profile:</p>
            <a
              href={`/public/${formData.githubId}`}
              className="text-sm text-blue-400 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Public Card
            </a>
            <p className="text-xs mt-1 text-gray-400">
              Rank:{" "}
              <span className="text-white font-semibold">
                #{contributorRank ?? "—"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="bg-[#3b2a530f] p-4 rounded-xl">
          <p className="text-md font-bold text-[#9DA4F2] mb-2">
            Contribution Heatmap
          </p>
          {formData.githubId && (
            <ContributionGraph
              username={formData.githubId}
              colorScheme="dark"
            />
          )}
        </div>

        {/* <div className="bg-[#3b2a530f] p-4 rounded-xl">
          <p className="text-md font-bold text-[#9DA4F2] mb-2">Commits Per Day</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={formattedChartData}>
              <XAxis dataKey="date" hide tick={false} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4fc3f7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

        <div className="bg-[#3b2a530f] p-4 rounded-xl">
          <p className="text-md font-bold text-[#9DA4F2] mb-2">
            Contribution Type Split
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#3b2a530f] p-4 rounded-xl col-span-full">
          <div className="flex justify-between items-center mb-3">
            <p className="text-md font-bold text-[#9DA4F2]">
              Contribution Over Time
            </p>
            <div className="space-x-2">
              {["commits", "issues", "prs"].map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setLineChartType(type as "commits" | "issues" | "prs")
                  }
                  className={`px-3 py-1 rounded-full text-xs ${
                    lineChartType === type
                      ? "bg-[#4fc3f7] text-black"
                      : "bg-[#2a2f4a] text-white"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineChartData[lineChartType]}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#4fc3f7"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Profile;
