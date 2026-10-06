import { NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api/client";
import type { PublicLeadPreview } from "@/lib/admission-lead";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const leadId = new URL(request.url).searchParams.get("leadId") ?? "";
  try {
    const { data } = await apiFetch<PublicLeadPreview>("/admissions/lead", {
      query: { leadId },
      cache: "no-store",
    });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { status: "not_found", message: error.message },
        { status: error.status || 404 }
      );
    }
    return NextResponse.json(
      { status: "not_found", message: "Lead not found." },
      { status: 404 }
    );
  }
}
