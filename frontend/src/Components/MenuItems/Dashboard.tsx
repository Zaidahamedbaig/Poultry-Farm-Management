import { IMenueItem } from "../../models/menu-item";
import {  BarChartOutlined } from "@mui/icons-material";

const dashboard: IMenueItem = {
  id: "dashboard",
  title: "Analytics",
  children: [
    {
      id: "dashboard-child",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: BarChartOutlined,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
