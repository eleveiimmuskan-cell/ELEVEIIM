import { ApiError } from "@/lib/api/client";
import { getConfiguredApiBase } from "@/lib/configured-api";

export type CollegeStudentFormCollege = {
  id: string;
  name: string;
  collegeCode: string;
  city: string | null;
  courses: Array<{ id: string; title: string; fee: number }>;
};

export type CollegeStudentFormSubmit = {
  name: string;
  phone: string;
  email?: string;
  courseId?: string;
  interestedCourse?: string;
  remarks?: string;
};

function collegeStudentFormUrl(collegeId: string) {
  return `${getConfiguredApiBase()}/college-student-form/${encodeURIComponent(collegeId)}`;
}

function unwrap<T>(payload: { data?: T } | T | null): T | null {
  if (!payload || typeof payload !== "object") return null;
  if ("data" in payload && payload.data != null) return payload.data as T;
  return payload as T;
}

export async function fetchCollegeStudentForm(collegeId: string) {
  const res = await fetch(collegeStudentFormUrl(collegeId), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  let payload: { message?: string | string[]; data?: CollegeStudentFormCollege } | null =
    null;
  try {
    payload = (await res.json()) as {
      message?: string | string[];
      data?: CollegeStudentFormCollege;
    };
  } catch {
    payload = null;
  }
  if (!res.ok) {
    const message = Array.isArray(payload?.message)
      ? payload.message.join(" ")
      : payload?.message || "College form not found.";
    throw new ApiError(message, res.status);
  }
  const data = unwrap<CollegeStudentFormCollege>(payload);
  if (!data?.id) throw new ApiError("College form not found.", 404);
  return data;
}

export async function submitCollegeStudentForm(
  collegeId: string,
  input: CollegeStudentFormSubmit
) {
  const res = await fetch(collegeStudentFormUrl(collegeId), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });
  let payload: {
    message?: string | string[];
    data?: { id?: string; created?: boolean };
  } | null = null;
  try {
    payload = (await res.json()) as {
      message?: string | string[];
      data?: { id?: string; created?: boolean };
    };
  } catch {
    payload = null;
  }
  if (!res.ok) {
    const message = Array.isArray(payload?.message)
      ? payload.message.join(" ")
      : payload?.message || "Could not submit the form.";
    throw new ApiError(message, res.status);
  }
  return unwrap<{ id?: string; created?: boolean }>(payload) ?? { created: true };
}
