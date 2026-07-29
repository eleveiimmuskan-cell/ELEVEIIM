import { NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api/client";
import type { ApiCourse } from "@/types/api-course";

export async function GET() {
  try {
    const { data } = await apiFetch<ApiCourse[]>("/courses", {
      query: {
        isPublished: true,
        page: 1,
        limit: 100,
      },
      cache: "no-store",
    });

    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { message: "Failed to load courses." },
      { status: 500 }
    );
  }
}

