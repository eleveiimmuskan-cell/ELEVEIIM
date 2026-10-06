import { NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api/client";
import { ADMISSION_APPLY_SUCCESS_MESSAGE } from "@/services/admission-apply.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function safeFormLoadedAt(value: unknown) {
  const n = Number(value);
  if (!Number.isFinite(n)) return Date.now() - 8_000;
  const age = Date.now() - n;
  if (age < 0 || age > 24 * 60 * 60 * 1000) return Date.now() - 8_000;
  return n;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const { data } = await apiFetch<{
      message?: string;
      leadId?: string;
      leadCode?: string;
    }>("/admissions/apply", {
      method: "POST",
      body: {
        profile: body.profile ?? {},
        leadId: body.leadId ?? null,
        counsellorId: body.counsellorId ?? null,
        courseId: body.courseId ?? null,
        photo: body.photo ?? null,
        documents: Array.isArray(body.documents) ? body.documents : [],
        hp: typeof body.hp === "string" ? body.hp : "",
        formLoadedAt: safeFormLoadedAt(body.formLoadedAt),
      },
      cache: "no-store",
    });

    return NextResponse.json({
      message: data?.message || ADMISSION_APPLY_SUCCESS_MESSAGE,
      leadId: data?.leadId,
      leadCode: data?.leadCode,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status || 500 }
      );
    }
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
