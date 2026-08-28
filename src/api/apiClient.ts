export const AUTH_UNAUTHORIZED_EVENT = "wiz-auth-unauthorized";

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
const CSRF_EXEMPT_PATHS = new Set(["/auth/login", "/auth/register"]);
const SESSION_RESET_PATHS = new Set([
  "/auth/login",
  "/auth/register",
  "/auth/logout",
  "/auth/change-password",
]);

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

type ErrorPayload = {
  message?: unknown;
};

type CsrfResponse = {
  csrfToken: string;
};

let csrfToken: string | null = null;

function buildUrl(path: string): string {
  if (!path.startsWith("/")) {
    throw new Error(`API path must start with "/": ${path}`);
  }

  return `${API_BASE_URL}${path}`;
}

function getPayloadMessage(payload: unknown): string | null {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "message" in payload
  ) {
    const message = (payload as ErrorPayload).message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return null;
}

function isCsrfResponse(payload: unknown): payload is CsrfResponse {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "csrfToken" in payload &&
    typeof payload.csrfToken === "string" &&
    payload.csrfToken.length > 0
  );
}

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();

  return text || null;
}

async function getCsrfToken(): Promise<string> {
  if (csrfToken) {
    return csrfToken;
  }

  const response = await fetch(buildUrl("/api/csrf-token"), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  });

  const payload = await readResponseBody(response);

  if (!response.ok || !isCsrfResponse(payload)) {
    throw new Error("CSRF token could not be loaded.");
  }

  csrfToken = payload.csrfToken;

  return csrfToken;
}

export class ApiError extends Error {
  readonly status: number;
  readonly payload: unknown;

  constructor(status: number, message: string, payload: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase();
  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");

  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (
    !SAFE_METHODS.has(method) &&
    !CSRF_EXEMPT_PATHS.has(path)
  ) {
    headers.set("X-CSRFToken", await getCsrfToken());
  }

  const response = await fetch(buildUrl(path), {
    ...options,
    method,
    headers,
    credentials: "include",
    body:
      options.body === undefined
        ? undefined
        : JSON.stringify(options.body),
  });

  const payload = await readResponseBody(response);

  if (response.ok && SESSION_RESET_PATHS.has(path)) {
    csrfToken = null;
  }

  if (response.status === 401 && path !== "/auth/me") {
    window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
  }

  if (!response.ok) {
    const message =
      getPayloadMessage(payload) ??
      `Request failed (HTTP ${response.status}).`;

    throw new ApiError(response.status, message, payload);
  }

  return payload as T;
}
