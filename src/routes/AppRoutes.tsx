import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthProvider from "../auth/AuthProvider";
import AppLayout from "../components/layout/AppLayout";
import AuditLogPage from "../pages/AuditLogPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import ResetUserPasswordPage from "../pages/ResetUserPasswordPage";
import TaskDetailPage from "../pages/TaskDetailPage";
import TaskFormPage from "../pages/TaskFormPage";
import TeamPage from "../pages/TeamPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/tasks/:taskId/edit" element={<TaskFormPage />} />

            <Route element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="/tasks/:taskId" element={<TaskDetailPage />} />

              <Route element={<ProtectedRoute allowedRole="Admin" />}>
                <Route path="/admin/users" element={<TeamPage />} />
                <Route path="/admin/audit-logs" element={<AuditLogPage />} />
                <Route
                  path="/admin/users/:userId/reset-password"
                  element={<ResetUserPasswordPage />}
                />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
