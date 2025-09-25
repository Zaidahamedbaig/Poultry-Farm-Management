import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Feed, Partner, Sales, Stock } from "../Pages";

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
    element: <Partner />,
  },
]);

export default MainRouter;
