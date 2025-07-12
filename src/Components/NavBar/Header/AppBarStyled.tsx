// material-ui
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

// project imports
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from "../../../config";

interface AppBarStyledProps extends MuiAppBarProps {
  open: boolean;
}

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarStyledProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: open
      ? theme.transitions.duration.enteringScreen
      : theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? DRAWER_WIDTH : 0,
  width: open
    ? `calc(100% - ${DRAWER_WIDTH}px)`
    : `calc(100% - ${MINI_DRAWER_WIDTH}px)`,
}));

export default AppBarStyled;
