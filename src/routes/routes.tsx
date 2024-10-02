import Login from "../pages/login";
import Signup from "../pages/signup";
import ForgotPassword from "../pages/forgot-password";
import ResetPassword from "../pages/reset-password";

import Dashboard from "../pages/dashboard";
import Documents from "../pages/documents";
import Security from "../pages/security";
import Profile from "../pages/profile";
import Document from "../pages/document";
import { ProtectedRoute } from "../hocs/ProtectedRoute";
import { PublicRoute } from "../hocs/PublicRoute";
import Subscriptions from "../pages/Subscriptions";

const routes = [
  {
    path: "/login",
    name: "Login",
    layout: "/",
    exact: true,
    component: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    name: "Signup",
    layout: "/",
    exact: true,
    component: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    layout: "/",
    exact: true,
    component: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    layout: "/",
    exact: true,
    component: (
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    name: "Dashboard",
    layout: "/",
    exact: true,
    // @ts-ignore
    component: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/document",
    name: "Document",
    layout: "/",
    exact: true,
    component: (
      <ProtectedRoute>
        <Documents />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/subscriptions",
  //   name: "Subscriptions",
  //   layout: "/",
  //   exact: true,
  //   component: <ProtectedRoute><Subscriptions /></ProtectedRoute>,
  // },
  {
    path: "/security",
    name: "Security",
    layout: "/",
    exact: true,
    component: (
      <ProtectedRoute>
        <Security />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    name: "Profile",
    layout: "/",
    exact: true,
    component: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/document-id",
    name: "DocumentId",
    layout: "/",
    exact: true,
    component: (
      <ProtectedRoute>
        <Document />
      </ProtectedRoute>
    ),
  },
];

export { routes };
