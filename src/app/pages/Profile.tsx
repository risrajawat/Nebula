"use client";
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

const ContributionGraph = dynamic(() => import("react-github-calendar"), { ssr: false });

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
  const [topLanguages, setTopLanguages] = useState<string[]>(["English"]);
  const [estimatedTime, setEstimatedTime] = useState<string>("");

  const [lineChartType, setLineChartType] = useState<"commits" | "issues" | "prs">("commits");
  const [lineChartData, setLineChartData] = useState({
    commits: [] as { date: string; count: number }[],
    issues: [] as { date: string; count: number }[],
    prs: [] as { date: string; count: number }[],
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;
  
    fetch("/api/getuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData({
          username: data.username || "",
          githubId: data.githubId || "",
          profilePic: data.githubId
            ? `https://github.com/${data.githubId}.png`
            : "",
        });
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
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
          fetch("https://api.github.com/repos/SASTxNST/Website_SAST/contributors"),
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
            } else if (event.type === "PullRequestEvent" && event.payload.pull_request?.merged) {
              merges.push({
                repoName: event.repo.name,
                title: event.payload.pull_request.title,
                date: new Date(event.payload.pull_request.merged_at).toLocaleString(),
                url: event.payload.pull_request.html_url,
              });
            }

            if (event.type === "IssuesEvent" && event.payload.action === "opened") {
              issueMap[dateStr] = (issueMap[dateStr] || 0) + 1;
            }

            if (event.type === "PullRequestEvent" && event.payload.action === "opened") {
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

        const rank = contributors.findIndex((c: any) => c.login === formData.githubId) + 1;
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
        toast.error("GitHub API failed. Possibly rate-limited or user not found.");
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
  const formattedChartData = Object.entries(barData).map(([date, count]) => ({ date, count }));

  const pieData = [
    { name: "Commits", value: commitDetails.length },
    { name: "PR Merges", value: mergeDetails.length },
  ];
  const pieColors = ["#56d364", "#1f6feb"]; // GitHub green and blue

  return (
    <div className="min-h-screen bg-[#0d1117] p-6 text-[#c9d1d9] font-sans">
      <Toaster 
        toastOptions={{
          style: {
            background: '#161b22',
            color: '#c9d1d9',
            border: '1px solid #30363d'
          }
        }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-[#30363d] pb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#e6edf3]">Welcome, {formData.username || 'Developer'}</h1>
          {/* <p className="text-sm text-[#7d8590]">Next data refresh: {nextFetchTime || 'soon'}</p> */}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center text-sm bg-[#161b22] px-3 py-1.5 rounded-md border border-[#30363d]">
            <span className="text-[#7d8590] mr-1">⭐</span>
            <span className="font-medium">{stars}</span>
          </div>
          <div className="flex items-center text-sm bg-[#161b22] px-3 py-1.5 rounded-md border border-[#30363d]">
            <span className="text-[#7d8590] mr-1">🍴</span>
            <span className="font-medium">{forks}</span>
          </div>
          <button 
            onClick={handleLogout} 
            className="ml-2 text-sm px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#363b42] text-[#f85149] hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      <TopStatsBlock 
        topLanguages={topLanguages} 
        estimatedTime={estimatedTime} 
        contributorRank={contributorRank} 
        nextFetchTime={nextFetchTime} 
      />

      {/* Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Profile Form */}
        <div className="bg-[#161b22] p-5 rounded-lg border border-[#30363d]">
          <h2 className="text-lg font-semibold mb-4 text-[#e6edf3] border-b border-[#30363d] pb-3">Profile Settings</h2>
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-[#7d8590] block mb-1">Display name</span>
              <input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 rounded bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] outline-none transition"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-sm text-[#7d8590] block mb-1">GitHub username</span>
              <input
                value={formData.githubId}
                onChange={(e) => setFormData({ ...formData, githubId: e.target.value })}
                className="w-full px-3 py-2 rounded bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] outline-none transition"
                placeholder="GitHub username"
              />
            </label>
            <button
              onClick={handleSave}
              className="px-4 py-2 mt-2 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-sm transition-colors"
            >
              Save changes
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-[#161b22] p-5 rounded-lg border border-[#30363d] flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-[#e6edf3] border-b border-[#30363d] pb-3">Profile Preview</h2>
          <div className="flex flex-col items-center justify-center flex-grow">
            {formData.profilePic ? (
              <img
                src={formData.profilePic}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#30363d] mb-4"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-[#0d1117] border-4 border-[#30363d] mb-4 flex items-center justify-center text-[#7d8590]">
                No Image
              </div>
            )}
            <div className="text-center">
              <p className="text-sm text-[#7d8590]">GitHub Contributions Rank</p>
              <div className="mt-1 bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1 inline-block">
                <span className="font-semibold text-[#e6edf3]">
                  {contributorRank ? `#${contributorRank}` : 'Not ranked'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Visualization Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Contribution Heatmap */}
        <div className="bg-[#161b22] p-5 rounded-lg border border-[#30363d]">
          <h2 className="text-lg font-semibold mb-4 text-[#e6edf3] border-b border-[#30363d] pb-3">Contribution Heatmap</h2>
          {formData.githubId ? (
            <div className="p-2">
              <ContributionGraph 
                username={formData.githubId} 
                colorScheme="dark"
                blockSize={12}
                blockMargin={4}
                fontSize={10}
              />
            </div>
          ) : (
            <div className="text-center py-8 text-[#7d8590]">
              Enter GitHub username to see contributions
            </div>
          )}
        </div>

        {/* Contribution Split */}
        <div className="bg-[#161b22] p-5 rounded-lg border border-[#30363d]">
          <h2 className="text-lg font-semibold mb-4 text-[#e6edf3] border-b border-[#30363d] pb-3">Contribution Breakdown</h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={60} 
                  innerRadius={30}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: '#161b22',
                    borderColor: '#30363d',
                    borderRadius: '6px',
                    color: '#e6edf3'
                  }}
                  itemStyle={{ color: '#e6edf3' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-[#161b22] p-5 rounded-lg border border-[#30363d] mb-8">
        <div className="flex justify-between items-center mb-4 border-b border-[#30363d] pb-3">
          <h2 className="text-lg font-semibold text-[#e6edf3]">Activity Over Time</h2>
          <div className="flex space-x-1 bg-[#0d1117] rounded-md p-1 border border-[#30363d]">
            {["commits", "issues", "prs"].map((type) => (
              <button
                key={type}
                onClick={() => setLineChartType(type as "commits" | "issues" | "prs")}
                className={`px-3 py-1 rounded-md text-xs ${
                  lineChartType === type
                    ? "bg-[#1f6feb] text-white"
                    : "text-[#7d8590] hover:bg-[#21262d]"
                } transition-colors`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData[lineChartType]}>
              <XAxis 
                dataKey="date" 
                stroke="#7d8590"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                allowDecimals={false} 
                stroke="#7d8590"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  background: '#161b22',
                  borderColor: '#30363d',
                  borderRadius: '6px',
                  color: '#e6edf3'
                }}
                itemStyle={{ color: '#e6edf3' }}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#1f6feb" 
                strokeWidth={2} 
                dot={{ fill: '#1f6feb', r: 3 }}
                activeDot={{ fill: '#56d364', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Profile;