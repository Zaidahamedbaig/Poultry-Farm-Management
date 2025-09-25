import Box from "@mui/material/Box";
import NavGroup from "./NavGroup";
import menuItem from "../../../../MenuItems";

export default function Navigation() {

  return (
    <Box sx={{ pt: 2 }}>
      {menuItem.items.map((item) => (
        <NavGroup key={item.id} item={item} />
      ))}
    </Box>
  );
}
