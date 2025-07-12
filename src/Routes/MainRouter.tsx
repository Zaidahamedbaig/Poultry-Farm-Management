import { createBrowserRouter } from "react-router-dom";
import Partner from "../Pages/Partner";
import Dashboard from "../Pages/Dashboard";
import Sales from "../Pages/Sales";
import Feed from "../Pages/Feed";
import Stock from "../Pages/Stock";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
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
