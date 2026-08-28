import { apiRequest } from "./apiClient";
import type { AssigneeOption } from "../types/user";

type AssigneesResponse = {
  users: AssigneeOption[];
};

export async function getAssignableUsers(
  signal?: AbortSignal,
): Promise<AssigneeOption[]> {
  const response = await apiRequest<AssigneesResponse>(
    "/api/users/assignees",
    { signal },
  );

  return response.users;
}
