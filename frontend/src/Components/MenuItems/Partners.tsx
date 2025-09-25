import { IMenueItem } from "../../models/menu-item";
import { HandshakeOutlined } from "@mui/icons-material";

const partner: IMenueItem = {
  id: "partner",
  title: "Partner Management",
  children: [
    {
      id: "partner",
      title: "Partners",
      type: "item",
      url: "/partners",
      icon: HandshakeOutlined,
      breadcrumbs: false,
    },
  ],
};

export default partner;
