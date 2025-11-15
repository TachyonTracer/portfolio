import { NextResponse } from "next/server";

const query = `query userSessionProgress($username: String!) {
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: $username) {
    username
    submitStats {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
    }
  }
}`;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get("username") || "TachyonTracer";

    if (!username) {
      return NextResponse.json(
        { error: "username is required" },
        { status: 400 }
      );
    }

    // Use the LeetCode GraphQL endpoint (undocumented public endpoint — may change)
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "Next.js LeetCode Fetcher",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "LeetCode request failed" },
        { status: res.status }
      );
    }

    const json = await res.json();

    const matchedUser = json?.data?.matchedUser;
    if (!matchedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // compute totals from submitStats
    const acSubmissions = matchedUser.submitStats?.acSubmissionNum || [];
    const totalSubmissionsArr =
      matchedUser.submitStats?.totalSubmissionNum || [];
    const allQuestions = json?.data?.allQuestionsCount || [];
    let total = 0;
    const breakdown: Record<string, number> = {};
    const submissions: Record<string, number> = {};
    const totalSubmissionCount: Record<string, number> = {};
    for (const stat of acSubmissions) {
      if (!stat?.difficulty) continue;
      const diff = stat.difficulty;
      const count = Number(stat.count || 0);
      const subs = Number(stat.submissions || 0);
      breakdown[diff] = count;
      submissions[diff] = subs;
      // parse total submission counts
      const totalRow = totalSubmissionsArr.find(
        (r: any) => r.difficulty === diff
      );
      totalSubmissionCount[diff] = Number(totalRow?.count || 0);
      if (diff === "All") total = count; // 'All' contains total solved
    }

    // Build a case-insensitive map for allQuestionsCount
    const allQMap = Object.fromEntries(
      (allQuestions || []).map((a: any) => [
        String(a.difficulty || "").toLowerCase(),
        Number(a.count || 0),
      ])
    );

    // Progress: solved / all questions (case-insensitive)
    const progress = Object.fromEntries(
      (Object.keys(breakdown) || []).map((k) => {
        const key = String(k).toLowerCase();
        const totalCount = allQMap[key];
        if (!totalCount) return [k, null];
        // percent as two decimal places (0.00..100.00)
        const pct = (breakdown[k] / totalCount) * 100;
        const pctRounded = Math.round(pct * 100) / 100; // two decimals
        const pctStr = pctRounded < 0.01 ? "<0.01%" : `${pctRounded}%`;
        return [k, { pct: pctRounded, pctStr }];
      })
    );

    const payload = {
      username: matchedUser.username,
      totalSolved: total,
      breakdown,
      submissions,
      totalSubmissionCount,
      allQuestions,
      progress,
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        // cache at CDN for 60s and allow stale revalidate — change as appropriate
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
