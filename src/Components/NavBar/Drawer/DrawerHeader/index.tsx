import { styled } from "@mui/material/styles";

interface DrawerHeaderStyledProps {
  open: boolean;
}

const DrawerHeaderStyled = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerHeaderStyledProps>(({ open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  minHeight: "60px",
  paddingTop: "8px",
  paddingBottom: "8px",
  paddingLeft: open ? "24px" : 0,
}));

export default DrawerHeaderStyled;
