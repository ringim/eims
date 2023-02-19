import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import ProtectedRoute from "./ProtectedRoute";
import Submission from "./pages/Submission";
import { useStore } from "./store";
// ----------------------------------------------------------------------

export default function Router() {
  const isAdmin = useStore((state) => state?.userInfo?.isAdmin);
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        {
          path: "dashboard",
          element: (
            // <ProtectedRoute>
            <DashboardAppPage />
            // </ProtectedRoute>
          ),
        },
        {
          path: "survey",
          element: (
            // <ProtectedRoute>
            <UserPage />
            // </ProtectedRoute>
          ),
        },
        { path: "user-permissions", element: <UserPage /> },
        { path: "submission", element: <Submission /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
