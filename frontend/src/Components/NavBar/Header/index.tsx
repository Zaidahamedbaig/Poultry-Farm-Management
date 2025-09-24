import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { SxProps, Theme } from "@mui/material";
import AppBarStyled from "./AppBarStyled";
import IconButton from "../../@extended/IconButton";
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from "../../../config";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";

interface HeaderProps {
  drawerOpen: boolean;
  onDrawerToggle: () => void;
}

export default function Header({ drawerOpen, onDrawerToggle }: HeaderProps) {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  const mainHeader = (
    <Toolbar>
      <IconButton
        aria-label="open drawer"
        onClick={onDrawerToggle}
        edge="start"
        color="primary"
        variant="light"
        sx={{
          color: "text.primary",
          bgcolor: drawerOpen ? "transparent" : "grey.100",
          ...(theme.palette.mode === "dark" && {
            bgcolor: drawerOpen ? "transparent" : "background.default",
          }),
          ml: { xs: 0, lg: -2 },
          transition: theme.transitions.create("all", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {!drawerOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
    </Toolbar>
  );

  const appBarStyles: {
    position: "fixed";
    color: "inherit";
    elevation: number;
    sx: SxProps<Theme>;
  } = {
    position: "fixed",
    color: "inherit",
    elevation: 0,
    sx: {
      borderBottom: "1px solid",
      borderBottomColor: "divider",
      zIndex: theme.zIndex.drawer + 1,
      width: {
        xs: "100%",
        lg: drawerOpen
          ? `calc(100% - ${DRAWER_WIDTH}px)`
          : `calc(100% - ${MINI_DRAWER_WIDTH}px)`,
      },
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  };

  return (
    <>
      {!downLG ? (
        <AppBarStyled open={drawerOpen} {...appBarStyles}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBarStyles}>{mainHeader}</AppBar>
      )}
    </>
  );
}
