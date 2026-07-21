/** Pagination metadata returned by list endpoints. */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** Standard response envelope from the backend TransformInterceptor. */
interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  message?: string | string[];
  meta?: PaginationMeta;
  statusCode?: number;
}

export interface ApiResult<T> {
  data: T;
  meta?: PaginationMeta;
}

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function getApiBase(): string {
  return (
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    ""
  );
}

/** Serializes a flat query object into a URL search string, skipping empties. */
export function buildQueryString(
  params: Record<string, string | number | boolean | undefined | null>
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.append(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export interface ApiFetchOptions extends Omit<RequestInit, "body"> {
  /** Query params appended to the endpoint. */
  query?: Record<string, string | number | boolean | undefined | null>;
  /** Next.js fetch cache / revalidate options. */
  next?: NextFetchRequestConfig;
  /** JSON body — serialized automatically. */
  body?: unknown;
}

/**
 * Public API fetch for the ELEVEIIM NestJS backend.
 * Unwraps the `{ success, data, meta }` envelope and supports ISR via `next.revalidate`.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<ApiResult<T>> {
  const base = getApiBase();
  if (!base) {
    throw new ApiError(
      "API base URL is not configured. Set NEXT_PUBLIC_API_URL.",
      500
    );
  }

  const { query, next, body, headers, ...rest } = options;
  const qs = query ? buildQueryString(query) : "";
  const url = `${base}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}${qs}`;

  const res = await fetch(url, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    next,
  });

  let envelope: ApiEnvelope<T> | null = null;
  try {
    envelope = (await res.json()) as ApiEnvelope<T>;
  } catch {
    // non-JSON error body
  }

  if (!res.ok || envelope?.success === false) {
    const message =
      (Array.isArray(envelope?.message)
        ? envelope?.message[0]
        : envelope?.message) || `API Error: ${res.status} ${res.statusText}`;
    throw new ApiError(message, res.status);
  }

  return {
    data: envelope?.data as T,
    meta: envelope?.meta,
  };
}
