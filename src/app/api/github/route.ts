import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") ?? "chandrasekharyamparala";

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "chandra-portfolio",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ repos: [] }, { status: 200 });
    }

    const data = (await response.json()) as Array<{
      id: number;
      name: string;
      description: string | null;
      stargazers_count: number;
      html_url: string;
      language: string | null;
      updated_at: string;
      forks_count: number;
    }>;

    return NextResponse.json({ repos: data }, { status: 200 });
  } catch {
    return NextResponse.json({ repos: [] }, { status: 200 });
  }
}
