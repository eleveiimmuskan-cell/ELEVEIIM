import { NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api/client";

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

    const { data } = await apiFetch<ScholarshipApplyResult>(
      "/scholarships/apply",
      {
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
      }
    );

    return NextResponse.json({
      message:
        data?.message ||
        "Thank you! Your scholarship application was received. Our team will contact you within 48 hours",
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
