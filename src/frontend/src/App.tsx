import {
  RouterProvider,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Route as RootRoute } from "./routes/__root";

import { PageLoading } from "@/components/LoadingSpinner";
// ─── Lazy page imports ─────────────────────────────────────────────────────────
import { Suspense, lazy } from "react";

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const CompliancePage = lazy(() => import("@/pages/CompliancePage"));
const ComplianceDetailPage = lazy(() => import("@/pages/ComplianceDetailPage"));
const AirQualityPage = lazy(() => import("@/pages/AirQualityPage"));
const PiezometerPage = lazy(() => import("@/pages/PiezometerPage"));
const TreesPage = lazy(() => import("@/pages/TreesPage"));
const ReportsPage = lazy(() => import("@/pages/ReportsPage"));

// ─── Route definitions ─────────────────────────────────────────────────────────

const indexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoading />}>
      <DashboardPage />
    </Suspense>
  ),
});

const complianceRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/compliance",
  component: () => (
    <Suspense fallback={<PageLoading />}>
      <CompliancePage />
    </Suspense>
  ),
});

const complianceDetailRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/compliance/$taskId",
  component: () => (
    <Suspense fallback={<PageLoading />}>
      <ComplianceDetailPage />
    </Suspense>
  ),
});

const airRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/monitoring/air",
  component: () => (
    <Suspense fallback={<PageLoading />}>
      <AirQualityPage />
    </Suspense>
  ),
});

const piezoRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/monitoring/piezometer",
  component: () => (
    <Suspense fallback={<PageLoading />}>
      <PiezometerPage />
    </Suspense>
  ),
});

const treesRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/trees",
  component: () => (
    <Suspense fallback={<PageLoading />}>
      <TreesPage />
    </Suspense>
  ),
});

const reportsRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/reports",
  component: () => (
    <Suspense fallback={<PageLoading />}>
      <ReportsPage />
    </Suspense>
  ),
});

// ─── Router ────────────────────────────────────────────────────────────────────

const routeTree = RootRoute.addChildren([
  indexRoute,
  complianceRoute,
  complianceDetailRoute,
  airRoute,
  piezoRoute,
  treesRoute,
  reportsRoute,
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
