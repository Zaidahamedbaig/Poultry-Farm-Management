import { StockOutlined } from "@ant-design/icons";
import { IMenueItem } from "../../models/menu-item";

const stock: IMenueItem = {
  id: "stock",
  title: "Stock Management",
  children: [
    {
      id: "stock-child",
      title: "Stock",
      type: "item",
      url: "/stock",
      icon: StockOutlined,
      breadcrumbs: false,
    },
  ],
};

export default stock;
