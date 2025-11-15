"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { leetcode as defaultLeet } from "@/data";
import MagicButton from "@/components/MagicButton";

type ProgressBarProps = Readonly<{
  label: string;
  solved: number | string;
  total: number | string;
  progress: { pct?: number; pctStr?: string } | null;
  color?: string;
}>;

const LeetCode = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>(defaultLeet);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const user = "TachyonTracer";
    if (!user) return;
    (async () => {
      try {
        const res = await fetch(
          `/api/leetcode?username=${encodeURIComponent(user)}`
        );
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          setError(err?.error || "Failed to fetch LeetCode");
          return;
        }
        const json = await res.json();
        setData((d: any) => ({ ...d, ...json }));
      } catch (e) {
        // keep fallback static data and log
        console.error("Failed to load leetcode stats", e);
        setError("Failed to load leetcode stats");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getCount = (diff: "All" | "Easy" | "Medium" | "Hard") => {
    // prefer API breakdown; fallback to default dataset
    if (!loading && data?.breakdown?.[diff] !== undefined) {
      return data.breakdown[diff];
    }

    if (diff === "All") return defaultLeet.totalSolved;
    if (diff === "Easy") return defaultLeet.easy;
    if (diff === "Medium") return defaultLeet.medium;
    if (diff === "Hard") return defaultLeet.hard;
    return 0;
  };

  const getAllCount = (diff: string) => {
    const match = data?.allQuestions?.find(
      (a: any) =>
        String(a.difficulty || "").toLowerCase() ===
        String(diff || "").toLowerCase()
    );
    return match ? Number(match.count || 0) : undefined;
  };

  const getProgress = (diff: string) => {
    // prefer API progress (which now includes pct and pctStr)
    if (!loading && data?.progress?.[diff] !== undefined) {
      return data.progress[diff];
    }
    const total = getAllCount(diff);
    if (total === undefined) return null;
    const solved = getCount(diff as any) ?? 0;
    const pct = (Number(solved) / Number(total)) * 100;
    const pctRounded = Math.round(pct * 100) / 100; // two decimals
    return {
      pct: pctRounded,
      pctStr: pctRounded < 0.01 ? "<0.01%" : `${pctRounded}%`,
    };
  };

  type ProgressBarProps = Readonly<{
    label: string;
    solved: number | string;
    total: number | string;
    progress: { pct?: number; pctStr?: string } | null;
    color?: string;
  }>;

  function ProgressBar({
    label,
    solved,
    total,
    progress,
    color = "from-purple-500 to-blue-500",
  }: ProgressBarProps) {
    const pct = progress?.pct ?? null;
    const pctStr =
      progress?.pctStr ?? (pct !== null && pct !== undefined ? `${pct}%` : "—");

    const width =
      pct !== null && pct !== undefined
        ? `${Math.min(100, Number(pct))}%`
        : "0%";

    return (
      <motion.div
        className="rounded-xl p-4 bg-black/60 border border-white/[.08] hover:border-purple/30 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-white font-semibold">{label}</div>
          <div className="text-white/80 font-bold">{solved ?? "—"}</div>
        </div>

        <div className="relative">
          <div className="h-2 bg-white/[.06] rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${color} rounded-full`}
              initial={{ width: "0%" }}
              whileInView={{ width }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-white/50 text-xs">
            <div>of {total ?? "—"}</div>
            <div className="font-semibold">{pctStr}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="py-20 scroll-mt-20" id="leetcode">
      <motion.h1
        className="heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Problem solving & <span className="text-purple">LeetCode</span>
      </motion.h1>

      <div className="max-w-5xl mx-auto mt-12 px-4">
        <motion.div
          className="relative bg-gradient-to-br from-slate-900/80 to-black-100/80 border border-purple/20 rounded-3xl p-8 backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple to-blue-500 flex items-center justify-center">
                  <span className="text-2xl">💻</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl font-hero">
                    {loading ? "Loading..." : data.username}
                  </h3>
                  <p className="text-xs text-purple/70">LeetCode Profile</p>
                </div>
              </div>
              {(!defaultLeet.username ||
                defaultLeet.username === "your-username") && (
                <p className="text-sm text-yellow-300 mt-2">
                  Tip: set{" "}
                  <span className="font-mono text-xs px-2">
                    leetcode.username
                  </span>{" "}
                  in{" "}
                  <span className="font-mono text-xs px-2">data/index.ts</span>{" "}
                  or set{" "}
                  <span className="font-mono text-xs px-2">
                    NEXT_PUBLIC_LEETCODE_USERNAME
                  </span>{" "}
                  to enable live stats
                </p>
              )}
              <div className="flex items-center gap-6 mb-4">
                {/* Total removed — focus on individual progress bars */}
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-emerald-400 font-semibold">
                      {loading ? "—" : getCount("Easy")}
                    </span>
                    <span className="text-white/50 ml-1">Easy</span>
                  </div>
                  <div>
                    <span className="text-yellow-400 font-semibold">
                      {loading ? "—" : getCount("Medium")}
                    </span>
                    <span className="text-white/50 ml-1">Medium</span>
                  </div>
                  <div>
                    <span className="text-pink-400 font-semibold">
                      {loading ? "—" : getCount("Hard")}
                    </span>
                    <span className="text-white/50 ml-1">Hard</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {(loading
                  ? defaultLeet.topTags
                  : data.skillTags || defaultLeet.topTags
                ).map((t: string, idx: number) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-purple/10 border border-purple/20 text-purple font-medium hover:bg-purple/20 transition-colors"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              
            </div>

            <div className="flex items-center gap-4">
              <a
                href={data.link || defaultLeet.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                <MagicButton
                  title="Visit profile"
                  icon={<FaExternalLinkAlt />}
                  position="right"
                />
              </a>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {(data.featuredProblems || defaultLeet.featuredProblems).map(
              (p: any, idx: number) => (
                <motion.a
                  key={p.title}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-4 rounded-xl bg-gradient-to-br from-black/80 to-black/40 border border-white/[.08] hover:border-purple/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-purple transition-colors">
                      {p.title}
                    </h4>
                    <FaExternalLinkAlt className="text-white/40 text-xs flex-shrink-0 group-hover:text-purple transition-colors" />
                  </div>
                  <p className="text-xs text-white/50">View on LeetCode</p>
                </motion.a>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeetCode;
