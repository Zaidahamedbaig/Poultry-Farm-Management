// assets
import { LineChartOutlined } from "@ant-design/icons";
import { IMenueItem } from "../../models/menu-item";

const sales:IMenueItem = {
  id: "sales",
  title: "Sales Management",
  children: [
    {
      id: "sales-child",
      title: "Sales",
      type: "item",
      url: "/sales",
      icon: LineChartOutlined,
      breadcrumbs: false
    },
  ],
};

export default sales;
