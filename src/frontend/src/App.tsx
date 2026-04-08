import { RouterProvider, createRouter } from "@tanstack/react-router";
import {
  Outlet,
  createRootRoute,
  createRoute,
  redirect,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";

import { Skeleton } from "@/components/ui/skeleton";
// Lazy page imports
import { Suspense, lazy } from "react";

const NewsFeed = lazy(() => import("./pages/NewsFeed"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const Live = lazy(() => import("./pages/Live"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// ── Root Route ────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense
        fallback={
          <div className="p-8 space-y-4 max-w-7xl mx-auto">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

// ── Index redirect ────────────────────────────────────────────────────────────

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/news-feed" });
  },
});

// ── News Feed ─────────────────────────────────────────────────────────────────

const newsFeedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/news-feed",
  component: NewsFeed,
});

// ── Article Detail ─────────────────────────────────────────────────────────────

const articleDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/article/$id",
  component: ArticleDetail,
});

// ── Live Video ────────────────────────────────────────────────────────────────

const liveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/live",
  component: Live,
});

// ── Dashboard ─────────────────────────────────────────────────────────────────

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});

// ── Admin Login ───────────────────────────────────────────────────────────────

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLogin,
});

// ── Admin Dashboard ───────────────────────────────────────────────────────────

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: AdminDashboard,
});

// ── Router ────────────────────────────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  indexRoute,
  newsFeedRoute,
  articleDetailRoute,
  liveRoute,
  dashboardRoute,
  adminLoginRoute,
  adminDashboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
