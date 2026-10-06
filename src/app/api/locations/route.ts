import { NextResponse } from "next/server";
import { searchIndiaLocations } from "@/lib/location/india-post";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  const items = await searchIndiaLocations(query);
  return NextResponse.json({ items });
}
