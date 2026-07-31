import { NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api/client";

interface ContactProxyBody {
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
  hp?: string;
  formLoadedAt?: number;
}

interface ContactSubmitResult {
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactProxyBody;

    const { data } = await apiFetch<ContactSubmitResult>("/contact", {
      method: "POST",
      body: {
        name: body.name?.trim() || "",
        phone: body.phone?.trim() || "",
        email: body.email?.trim() || "",
        subject: body.subject?.trim() || "",
        message: body.message?.trim() || "",
        hp: body.hp?.trim() || "",
        formLoadedAt: body.formLoadedAt ?? Date.now(),
      },
      cache: "no-store",
    });

    return NextResponse.json({
      message: data?.message || "Thank you! We will get back to you shortly.",
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
