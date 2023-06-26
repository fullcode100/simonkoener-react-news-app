import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

const AppLayout = React.lazy(() => import("../components/layout"));
const Signup = React.lazy(() => import("../pages/Signup"));
const Signin = React.lazy(() => import("../pages/Signin"));
const NewsList = React.lazy(() => import("../pages/News"));
const NewsDetail = React.lazy(() => import("../pages/NewsDetail"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/news",
        element: <NewsList />,
      },
      {
        path: "/news/view",
        element: <NewsDetail />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
]);

export default router;
