import DrawerHeaderStyled from "./DrawerHeaderStyled";
import Logo from "../../DrawerLogo";
import { SxProps, Theme } from "@mui/material";
import { useGetMenuMaster } from "../../../../api/menu";

interface DrawerHeaderProps {
  open: boolean;
}

export default function DrawerHeader({ open }: DrawerHeaderProps) {
  const headerSx: SxProps<Theme> = {
    minHeight: "60px",
    width: "initial",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: open ? "2px" : 0,
  };

  const logoSx: SxProps<Theme> = {
    width: open ? "auto" : 25,
    height: 35,
    marginLeft: "-12px",
  };
  const { menuMaster = {} }: any = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened ?? false;
  return (
    <DrawerHeaderStyled open={open} sx={headerSx}>
      <Logo isIcon={!open} sx={logoSx} />
      {drawerOpen && (
        <p
          style={{
            fontSize: "22px",
            fontWeight: 600,
            fontFamily: "cinzel",
            color: "#B2860D",
          }}
        >
          Golden Feather
        </p>
      )}
    </DrawerHeaderStyled>
  );
}
