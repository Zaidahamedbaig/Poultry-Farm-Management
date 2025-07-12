import Navigation from "./Navigation";
import SimpleBar from "../../../SimpleBar/SimpleBar";
import { useGetMenuMaster } from "../../../../api/menu";

export default function DrawerContent() {
  const { menuMaster }: any = useGetMenuMaster();

  return (
    <>
      <SimpleBar
        sx={{
          "& .simplebar-content": { display: "flex", flexDirection: "column" },
        }}
      >
        <Navigation />
      </SimpleBar>
    </>
  );
}
