import Header from "../Components/NavBar/Header";
import Drawer from "../Components/NavBar/Drawer";
import { handlerDrawerOpen, useGetMenuMaster } from "../api/menu";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import GFTable from "../Components/Table/Table";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectFeedStock } from "../store/slices/feed/feedSlice";
import { IFeed } from "../models/feed";
import { useEffect, useState } from "react";
import { GFDialog } from "../Components/Dialog/Dialog";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { Button, Grid, TextField } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { addFeedStock } from "../store/thunk/feed/addFeedStock";
import { getAllFeed } from "../store/thunk/feed/getFeedStock";

const initialFeedStock: IFeed = {
  date: "",
  starterCount: 0,
  preStarterCount: 0,
  layerCount: 0,
  starterPrice: 0,
  preStarterPrice: 0,
  layerPrice: 0,
  transportationAndOthers: 0,
};

const initialFeedStockError = {
  date: false,
  messageForDate: "Please select a valid date",
  starterCount: false,
  messageForStarterCount: "Starter count cannot be less than zero or empty",
  preStarterCount: false,
  messageForPreStarterCount:
    "Pre Starter count cannot be less than zero or empty",
  layerCount: false,
  messageForLayerCount: "Layer count cannot be less than zero or empty",
  starterPrice: false,
  messageForStarterPrice: "Starter price cannot be less than zero or empty",
  preStarterPrice: false,
  messageForPreStarterPrice:
    "Pre Starter price cannot be less than zero or empty",
  layerPrice: false,
  messageForLayerPrice: "Layer price cannot be less than zero or empty",
  transportationAndOthers: false,
  messageForTransportationAndOthers:
    "This field cannot be less than zero or empty",
};

export const Feed = () => {
  const { menuMaster } = useGetMenuMaster();
  const feedStockDetails = useAppSelector(selectFeedStock);

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(initialFeedStock);
  const [error, setError] = useState(initialFeedStockError);
  const [open, setOpen] = useState(false);
  const [dateOfFeedStock, setDateOfFeedStock] = useState<Date | null>(null);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError({
      ...error,
      [event.target.name]: false,
    });

    setFormData((pre) => ({
      ...pre,
      [event.target.name]: event.target.value,
    }));
  };

  const onClose = () => {
    setFormData(initialFeedStock);
    setError(initialFeedStockError);
    setDateOfFeedStock(null);
    setOpen(false);
  };

  const onConfirm = async () => {
    if (formData.date === "") {
      setError((pre) => ({
        ...pre,
        date: true,
      }));
    } else if (formData.starterCount < 0) {
      setError((pre) => ({
        ...pre,
        staterCount: true,
      }));
    } else if (formData.starterPrice < 0) {
      setError((pre) => ({
        ...pre,
        staterPrice: true,
      }));
    } else if (formData.preStarterCount < 0) {
      setError((pre) => ({
        ...pre,
        preStaterCount: true,
      }));
    } else if (formData.preStarterPrice < 0) {
      setError((pre) => ({
        ...pre,
        preStaterPrice: true,
      }));
    } else if (formData.layerCount < 0) {
      setError((pre) => ({
        ...pre,
        layerCount: true,
      }));
    } else if (formData.layerPrice < 0) {
      setError((pre) => ({
        ...pre,
        layerPrice: true,
      }));
    } else if (formData.transportationAndOthers < 0) {
      setError((pre) => ({
        ...pre,
        transportationAndOthers: true,
      }));
    } else {
      console.log(formData);
      await dispatch(addFeedStock(formData));
      await dispatch(getAllFeed());
      onClose();
    }
  };

  useEffect(() => {
    dispatch(getAllFeed());
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
                Add Feed Stock
              </Button>
            </Grid>
          </Grid>
          <GFTable
            columns={[
              { id: "id", name: "Sl No" },
              { id: "feedBatch", name: "Feed Batch" },
              { id: "currentStarter", name: "Current Starters" },
              { id: "currentPreStarter", name: "Current Pre Starters" },
              { id: "currentLayer", name: "Current Layers" },

              {
                id: "transportationAndOthers",
                name: "Transportation and Other Expences",
              },
              { id: "totalPrice", name: "Total Price of Feed" },
            ]}
            data={feedStockDetails}
          />

          <Outlet />
        </Box>
      </Box>
      <GFDialog
        title={"Feed Stock Details"}
        open={open}
        onClose={onClose}
        onConfirm={onConfirm}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            sx={{ width: "100%", marginBottom: "10px", mt: "10px" }}
            label="Select Date of Feed Purchased"
            name="date"
            slotProps={{
              textField: {
                error: error.date,
                helperText: error.date ? error.messageForDate : "",
              },
            }}
            format="yyyy-MM-dd"
            value={dateOfFeedStock}
            onChange={(newDate) => {
              if (newDate) {
                const formattedDate = format(newDate, "yyyy-MM-dd");
                setFormData((prev: any) => ({
                  ...prev,
                  date: formattedDate,
                }));
              } else {
                setFormData((prev: any) => ({
                  ...prev,
                  date: "",
                }));
              }
              setDateOfFeedStock(newDate);
            }}
          />
        </LocalizationProvider>

        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Starter Count"
          value={formData.starterCount === 0 ? null : formData.starterCount}
          name="starterCount"
          required
          onChange={handleOnChange}
          type="number"
          error={error.starterCount}
          helperText={error.starterCount && error.messageForStarterCount}
        />

        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Starter price per bag"
          value={formData.starterPrice === 0 ? null : formData.starterPrice}
          name="starterPrice"
          required
          onChange={handleOnChange}
          type="number"
          error={error.starterPrice}
          helperText={error.starterPrice && error.messageForStarterPrice}
        />

        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Pre Starter Count"
          value={
            formData.preStarterCount === 0 ? null : formData.preStarterCount
          }
          name="preStarterCount"
          required
          onChange={handleOnChange}
          type="number"
          error={error.preStarterCount}
          helperText={error.preStarterCount && error.messageForPreStarterCount}
        />

        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Pre starter price per bag"
          value={
            formData.preStarterPrice === 0 ? null : formData.preStarterPrice
          }
          name="preStarterPrice"
          required
          onChange={handleOnChange}
          type="number"
          error={error.preStarterPrice}
          helperText={error.preStarterPrice && error.messageForPreStarterPrice}
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Layer Count"
          value={formData.layerCount === 0 ? null : formData.layerCount}
          name="layerCount"
          required
          onChange={handleOnChange}
          type="number"
          error={error.layerCount}
          helperText={error.layerCount && error.messageForLayerCount}
        />

        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Layer price per bag"
          value={formData.layerPrice === 0 ? null : formData.layerPrice}
          name="layerPrice"
          required
          onChange={handleOnChange}
          type="number"
          error={error.layerPrice}
          helperText={error.layerPrice && error.messageForLayerPrice}
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Transportation and other expenses"
          value={
            formData.transportationAndOthers === 0
              ? null
              : formData.transportationAndOthers
          }
          name="transportationAndOthers"
          required
          onChange={handleOnChange}
          type="number"
          error={error.transportationAndOthers}
          helperText={
            error.transportationAndOthers &&
            error.messageForTransportationAndOthers
          }
        />
      </GFDialog>
    </Box>
  );
};

export default Feed;
