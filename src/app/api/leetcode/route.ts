import { NextResponse } from "next/server";

interface LeetCodePayload {
  solved: number;
  ranking: string;
  acceptanceRate: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") ?? "chandrasekharyamparala";

  const fallback: LeetCodePayload = {
    solved: 200,
    ranking: "Top 20%",
    acceptanceRate: "73%",
  };

  const endpoints = [
    `https://alfa-leetcode-api.onrender.com/${username}/solved`,
    `https://leetcode-stats-api.herokuapp.com/${username}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { next: { revalidate: 3600 } });
      if (!response.ok) {
        continue;
      }

      const data = (await response.json()) as {
        solvedProblem?: number;
        totalSolved?: number;
        acceptanceRate?: number;
        ranking?: number;
      };

      const solved = data.solvedProblem ?? data.totalSolved ?? fallback.solved;
      const acceptance =
        typeof data.acceptanceRate === "number"
          ? `${data.acceptanceRate.toFixed(0)}%`
          : fallback.acceptanceRate;
      const ranking =
        typeof data.ranking === "number"
          ? `#${data.ranking.toLocaleString()}`
          : fallback.ranking;

      return NextResponse.json(
        { solved, ranking, acceptanceRate: acceptance },
        { status: 200 }
      );
    } catch {
      continue;
    }
  }

  return NextResponse.json(fallback, { status: 200 });
}
