import { NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api/client";
import { ADMISSION_APPLY_SUCCESS_MESSAGE } from "@/services/admission-apply.service";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const { data } = await apiFetch<{ message?: string }>("/admissions/apply", {
      method: "POST",
      body,
      cache: "no-store",
    });

    return NextResponse.json({
      message: data?.message || ADMISSION_APPLY_SUCCESS_MESSAGE,
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
