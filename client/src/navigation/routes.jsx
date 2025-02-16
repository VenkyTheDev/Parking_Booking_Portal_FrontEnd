import { lazy } from "react";

export const privateRoutes = [
  { path: "/home", Component: lazy(() => import("../screens/home")) },
  { path: "/actions", Component: lazy(() => import("../screens/actions")) },
  { path: "/profile", Component: lazy(() => import("../screens/profile")) },
  { path: "/history", Component: lazy(() => import("../screens/history")) },
  { path: "/book", Component: lazy(() => import("../screens/book")) },
  { path: "/parkings", Component: lazy(() => import("../screens/parkings")) },
  { path: "/about", Component: lazy(() => import("../screens/about")) },
  { path: "/editParking", Component: lazy(() => import("../screens/editParking")) },
  { path: "/addParking", Component: lazy(() => import("../screens/addParking")) },
];

export const publicRoutes = [
  { path: "/auth", Component: lazy(() => import("../screens/auth")) },
  { path: "/test", Component: lazy(() => import("../screens/test")) },
];
