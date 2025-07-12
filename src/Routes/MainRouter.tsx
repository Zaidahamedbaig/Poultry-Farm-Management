import { lazy } from "react";
import Loadable from "../Components/Loadable";
import { createBrowserRouter } from "react-router-dom";
import Partner from "../Pages/Partner";
const DashboardDefault = Loadable(lazy(() => import("../Pages/Dashboard")));
const Sales = Loadable(lazy(() => import("../Pages/Sales")));
const Feed = Loadable(lazy(() => import("../Pages/Feed")));
const Stock = Loadable(lazy(() => import("../Pages/Stock")));

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <DashboardDefault />,
  },
  {
    path: "/dashboard",
    element: <DashboardDefault />,
  },
  {
    path: "/sales",
    element: <Sales />,
  },
  {
    path: "/feed",
    element: <Feed />,
  },
  {
    path: "/stock",
    element: <Stock />,
  },
    {
    path: "/partners",
    element: <Partner/>,
  },
]);

export default MainRouter;
