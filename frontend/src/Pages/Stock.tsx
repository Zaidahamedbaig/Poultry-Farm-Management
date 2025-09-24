import Header from "../Components/NavBar/Header";
import Drawer from "../Components/NavBar/Drawer";
import { handlerDrawerOpen, useGetMenuMaster } from "../api/menu";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import GFTable from "../Components/Table/Table";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectStock } from "../store/slices/stock/stockSlice";
import { useEffect, useState } from "react";
import { getStock } from "../store/thunk/stock/getStockDetail";
import { getPartnerDetails } from "../store/thunk/partner/getPartnerDetails";
import { Button, Grid } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { selectSalesDetails } from "../store/slices/sales/salesSlice";
import { getAllFeed } from "../store/thunk/feed/getFeedStock";
import StockDetails from "../Components/StockComponents/StockDetails";
import MortalityAndMissing from "../Components/StockComponents/MortalityAndMissing";
import { AddConsumedFeedDailog } from "../Components/StockComponents/addConsumedFeed";

export const Stock = () => {
  const { menuMaster } = useGetMenuMaster();
  const stockDetails = useAppSelector(selectStock);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const selectSales = useAppSelector(selectSalesDetails);

  const [isMortalityDialogOpen, setIsMortalityDialogOpen] = useState(false);

  const [isConsumedFeedOpen, setIsConsumedFeedOpen] = useState(false);

  const [mortalityOrMissingBatchName, setMortalityOrMissingBatchName] =
    useState("");

  const [selectedBatchNameForFeed, setSelectedBatchNameForFeed] = useState("");

  useEffect(() => {
    dispatch(getStock());
    dispatch(getPartnerDetails());
    dispatch(getAllFeed());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getStock());
  }, [selectSales]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Header
        drawerOpen={menuMaster?.isDashboardDrawerOpened ?? false}
        onDrawerToggle={() =>
          handlerDrawerOpen(!menuMaster?.isDashboardDrawerOpened)
        }
      />

      <Drawer />

      <Box
        component="main"
        sx={{ width: "calc(100% - 260px)", flexGrow: 1, p: { xs: 2, sm: 3 } }}
      >
        <Toolbar sx={{ mt: "inherit" }} />
        <Box
          sx={{
            ...{ px: { xs: 0, sm: 2 } },
            position: "relative",
            minHeight: "calc(100vh - 110px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container spacing={2} marginBottom={2}>
            <Grid offset={10} size={2}>
              <Button
                startIcon={<AddOutlined />}
                variant="contained"
                fullWidth
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add Stock
              </Button>
            </Grid>
          </Grid>

          <GFTable
            columns={[
              { id: "id", name: "Sl No" },
              { id: "partner", name: "Partner" },
              { id: "batchName", name: "Batch Name" },
              { id: "dateOfBirth", name: "Date of Birth" },
              { id: "dateOfPurchase", name: "Date of Purchase" },
              { id: "quantity", name: "Quantity" },
              { id: "price", name: "Price" },

              {
                id: "addMortality",
                name: "Add Mortality",
                type: "action",
                actions: [
                  {
                    actionType: "ADD",
                    handler: async (data) => {
                      const { batchName } = data;
                      setMortalityOrMissingBatchName(batchName);
                      setIsMortalityDialogOpen(true);
                    },
                  },
                ],
              },
              { id: "currentQuantity", name: "Current Quantity" },
              {
                id: "addFeed",
                name: "Add Feed",
                type: "action",
                actions: [
                  {
                    actionType: "ADD",
                    handler: async (data) => {
                      const { batchName } = data;
                      setSelectedBatchNameForFeed(batchName);
                      setIsConsumedFeedOpen(true);
                    },
                  },
                ],
              },
              { id: "status", name: "Status" },
            ]}
            data={stockDetails}
          />
          <Outlet />
        </Box>
      </Box>

      <StockDetails open={open} setOpen={setOpen} />
      <MortalityAndMissing
        isMortalityDialogOpen={isMortalityDialogOpen}
        setIsMortalityDialogOpen={setIsMortalityDialogOpen}
        selectedBatchName={mortalityOrMissingBatchName}
      />
      <AddConsumedFeedDailog
        isConsumedFeedOpen={isConsumedFeedOpen}
        selectedBatchNameForFeed={selectedBatchNameForFeed}
        setIsConsumedFeedOpen={setIsConsumedFeedOpen}
      />
    </Box>
  );
};

export default Stock;
