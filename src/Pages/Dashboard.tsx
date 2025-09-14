import Header from "../Components/NavBar/Header";
import Drawer from "../Components/NavBar/Drawer";
import { handlerDrawerOpen, useGetMenuMaster } from "../api/menu";
import Toolbar from "@mui/material/Toolbar";
import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectStock } from "../store/slices/stock/stockSlice";
import { useEffect, useMemo, useState } from "react";
import { getStock } from "../store/thunk/stock/getStockDetail";
import { Outlet } from "react-router-dom";
import { IStockDetails } from "../models/stock";
import QuantityCard from "../Components/DashboardComponent/QuantityCard";
import CurrentQuantityCard from "../Components/DashboardComponent/CurrentQuantityCard";
import MortalityCard from "../Components/DashboardComponent/MortalityCard";
import QuailCurrentPriceCard from "../Components/DashboardComponent/QuailCurrentPrice";
import SalesCard from "../Components/DashboardComponent/SalesCard";

export const Dashboard = () => {
  const { menuMaster } = useGetMenuMaster();
  const stockDetails = useAppSelector(selectStock);
  const dispatch = useAppDispatch();
  const [batches, setBatches] = useState<IStockDetails[]>([]);
  const [currentStockBatch, setCurrentStockBatch] = useState<IStockDetails>({
    partner: "",
    quantity: 0,
    currentQuantity: 0,
    price: 0,
    dateOfBirth: "",
    dateOfPurchase: "",
  });

  useEffect(() => {
    if (stockDetails.length > 0) {
      const filteredBatches = stockDetails
        .filter((stock) => stock.status === 1)
        .sort((a, b) => {
          return (
            new Date(b.dateOfPurchase).valueOf() -
            new Date(a.dateOfPurchase).valueOf()
          );
        });

      setBatches(filteredBatches);
      if (filteredBatches.length) {
        setCurrentStockBatch(filteredBatches[0]);
        console.log(currentStockBatch);
      }
    }
  }, [stockDetails]);

  useEffect(() => {
    dispatch(getStock());
  }, [dispatch]);

  const { currentQuailPrice, mortalityCount } = useMemo(() => {
    if (currentStockBatch) {
      const mortalityCount =
        currentStockBatch.mortality?.reduce(
          (pre, cur) => pre + cur.quantity,
          0
        ) ?? 0;
      const totalConsumedFeed =
        currentStockBatch.consumedFeed?.reduce((pre, cur) => {
          return (
            cur.layerCount * cur.layerPrice +
            cur.preStarterCount * cur.preStarterPrice +
            cur.starterCount * cur.starterPrice +
            pre
          );
        }, 0) ?? 0;
      const totalCost =
        totalConsumedFeed +
        currentStockBatch.price * currentStockBatch.quantity;

      const currentQuailPrice =
        totalCost / (currentStockBatch.quantity - mortalityCount);

      return {
        mortalityCount,
        currentQuailPrice,
      };
    }
    return {
      mortalityCount: 0,
      currentQuailPrice: 0,
    };
  }, [currentStockBatch]);

  return (
    <Box sx={{ display: "flex", width: "100%", overflow:"hidden" }}>
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
          <Box>
            <Grid container spacing={2} marginBottom={2}>
              <Grid offset={10.2} size={2}>
                <TextField
                  select
                  label="Select Batch"
                  value={currentStockBatch.batchName ?? ""}
                  onChange={(e) => {
                    const newSelectedBatch = batches.find(
                      (batch) => batch.batchName === e.target.value
                    );
                    if (newSelectedBatch) {
                      console.log(newSelectedBatch);

                      setCurrentStockBatch(newSelectedBatch);
                    }
                  }}
                  sx={{ maxWidth: 200 }}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="" disabled>
                    Select Batch
                  </MenuItem>
                  {batches.map((batch) => (
                    <MenuItem key={batch.batchName} value={batch.batchName}>
                      {batch.batchName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "20px",
              maxWidth:"1500px"
              
            }}
          >
            <QuantityCard
              title="Quantity"
              count={currentStockBatch.quantity ?? 0}
            />
            <CurrentQuantityCard
              title="Current Quantity"
              count={currentStockBatch.currentQuantity ?? 0}
            />
            <MortalityCard title="Mortality" count={mortalityCount} />
            <QuailCurrentPriceCard
              title="Current Quail Price"
              count={currentQuailPrice}
            />
          </Box>
          <Box>
            <SalesCard
              batchName={currentStockBatch.batchName ?? ""}
              dateOfPurchase={currentStockBatch.dateOfPurchase}
            />
          </Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
