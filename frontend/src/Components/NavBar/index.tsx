import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Drawer from "./Drawer";
import Header from "./Header";
import { handlerDrawerOpen, useGetMenuMaster } from "../../api/menu";

export default function DashboardLayout() {
  const theme = useTheme();
  const downXL = useMediaQuery(theme.breakpoints.down("xl"));
  const { menuMaster } = useGetMenuMaster();
  const [drawerOpen, setDrawerOpen] = useState(
    menuMaster?.isDashboardDrawerOpened ?? false
  );

 
  useEffect(() => {
    const newOpenState = !downXL;
    handlerDrawerOpen(newOpenState);
    setDrawerOpen(newOpenState);
  }, [downXL]);

  const handleDrawerToggle = () => {
    const newOpenState = !drawerOpen;
    handlerDrawerOpen(newOpenState);
    setDrawerOpen(newOpenState);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Header drawerOpen={drawerOpen} onDrawerToggle={handleDrawerToggle} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Box
        component="main"
        sx={{
          width: `calc(100% - ${drawerOpen ? 260 : 80}px)`,
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar sx={{ mt: "inherit" }} />
        <Box
          sx={{
            px: { xs: 0, sm: 2 },
            position: "relative",
            minHeight: "calc(100vh - 110px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
