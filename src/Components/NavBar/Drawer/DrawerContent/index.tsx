// project imports
// import NavCard from "./NavCard";
import Navigation from "./Navigation";
import SimpleBar from "../../../Third-Party/SimpleBar";
import { useGetMenuMaster } from "../../../../api/menu";

// DRAWER CONTENT

export default function DrawerContent() {
  const { menuMaster }: any = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened ?? false;

  return (
    <>
      <SimpleBar
        sx={{
          "& .simplebar-content": { display: "flex", flexDirection: "column" },
        }}
      >
        <Navigation />
        {/* {drawerOpen && <NavCard />} */}
      </SimpleBar>
    </>
  );
}
