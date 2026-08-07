import { NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api/client";
import { SCHOLARSHIP_APPLY_SUCCESS_MESSAGE } from "@/services/scholarship-apply.service";

interface ScholarshipApplyProxyBody {
  name?: string;
  email?: string;
  phone?: string;
  courseId?: string;
  message?: string;
  hp?: string;
  formLoadedAt?: number;
}

interface ScholarshipApplyResult {
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ScholarshipApplyProxyBody;

    await apiFetch<ScholarshipApplyResult>("/scholarships/apply", {
      method: "POST",
      body: {
        name: body.name?.trim() || "",
        email: body.email?.trim() || "",
        phone: body.phone?.trim() || "",
        courseId: body.courseId?.trim() || "",
        message: body.message?.trim() || "",
        hp: body.hp?.trim() || "",
        formLoadedAt: body.formLoadedAt ?? Date.now(),
      },
      cache: "no-store",
    });

    return NextResponse.json({
      message: SCHOLARSHIP_APPLY_SUCCESS_MESSAGE,
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
