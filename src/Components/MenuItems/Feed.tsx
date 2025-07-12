import BackpackOutlinedIcon from "@mui/icons-material/BackpackOutlined";
import { IMenueItem } from "../../models/menu-item";

const feed: IMenueItem = {
  id: "feed",
  title: "Feed Management",
  children: [
    {
      id: "feed-child",
      title: "Feed",
      type: "item",
      url: "/feed",
      icon: BackpackOutlinedIcon,
      breadcrumbs: false,
    },
  ],
};

export default feed;
