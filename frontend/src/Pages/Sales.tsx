import Header from "../Components/NavBar/Header";
import Drawer from "../Components/NavBar/Drawer";
import { handlerDrawerOpen, useGetMenuMaster } from "../api/menu";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectSalesDetails } from "../store/slices/sales/salesSlice";
import GFTable from "../Components/Table/Table";
import { selectStock } from "../store/slices/stock/stockSlice";
import { useEffect, useState } from "react";
import { getStock } from "../store/thunk/stock/getStockDetail";
import { IStockDetails } from "../models/stock";
import { AddOutlined } from "@mui/icons-material";
import { Grid, Button, MenuItem, TextField } from "@mui/material";

import { getAllSales } from "../store/thunk/sales/getSales";
import AddSalesDataDailog from "../Components/SalesComponents/AddSalesDataDailog";

export const Sales = () => {
  const { menuMaster } = useGetMenuMaster();
  const dispatch = useAppDispatch();
  const stockDetails: IStockDetails[] = useAppSelector(selectStock);
  const salesDetails = useAppSelector(selectSalesDetails);
  const [batches, setBatches] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [batch, setBatch] = useState("");
  const handleChange = (event: any) => {
    setBatch(event.target.value);
  };

  useEffect(() => {
    if (stockDetails.length > 0) {
      const latestPurchase = stockDetails.reduce((latest, current) =>
        new Date(current.dateOfPurchase) >= new Date(latest.dateOfPurchase)
          ? current
          : latest
      );
      if (latestPurchase.batchName) {
        setBatch(latestPurchase.batchName);
      }
    }

    dispatch(getAllSales(batch));
  }, [stockDetails]);

  useEffect(() => {
    if (batch !== "Select Batch") {
      dispatch(getAllSales(batch));
    }
  }, [batch]);

  useEffect(() => {
    dispatch(getStock());
  }, [dispatch]);

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
          <Grid
            container
            spacing={0}
            marginBottom={2}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid>
              <TextField
                select
                label="Select Batch"
                value={batch}
                onChange={handleChange}
                sx={{ width: 200 }}
                fullWidth
                margin="normal"
              >
                <MenuItem value="" disabled>
                  Select Batch
                </MenuItem>
                {batches.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid marginTop={"30px"} size={2}>
              <Button
                startIcon={<AddOutlined />}
                variant="contained"
                fullWidth
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add Sale
              </Button>
            </Grid>
          </Grid>
          <GFTable
            columns={[
              { id: "id", name: "Sl No" },
              { id: "batchName", name: "Batch Name" },
              { id: "quantity", name: "Quantity" },
              { id: "price", name: "Price" },
              { id: "date", name: "Date" },
              { id: "customerName", name: "Customer" },
              { id: "phone", name: "Customer Phone" },
              { id: "modeOfPayment", name: "Payment Method" },
            ]}
            data={salesDetails}
          />
          <Outlet />
        </Box>
      </Box>
      <AddSalesDataDailog
        open={open}
        setOpen={setOpen}
        batches={batches}
        setBatches={setBatches}
      />
    </Box>
  );
};

export default Sales;
