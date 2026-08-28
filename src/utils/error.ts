import { ApiError } from "../api/apiClient";

export function getErrorMessage(
  error: unknown,
  fallback = "エラーが発生しました。",
): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}
