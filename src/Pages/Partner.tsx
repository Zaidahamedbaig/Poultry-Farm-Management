import Header from "../Components/NavBar/Header";
import Drawer from "../Components/NavBar/Drawer";
import { handlerDrawerOpen, useGetMenuMaster } from "../api/menu";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import GFTable from "../Components/Table/Table";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectPartnerDetails } from "../store/slices/partner/partnerSlice";
import { useEffect, useState } from "react";
import { getPartnerDetails } from "../store/thunk/partner/getPartnerDetails";
import { Button, Container, Grid, TextField } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { GFDialog } from "../Components/Dialog/Dialog";
import { savePartnerDetails } from "../store/thunk/partner/savePartnerDetails";
import { BasePartnerDetail } from "../models/partner";
import { deletePartner } from "../store/thunk/partner/deletePartner";
import { editPartnerDetails } from "../store/thunk/partner/editPartnerDetails";

const formDataInitialState: BasePartnerDetail = {
  name: "",
  phone: "",
  address: "",
 
};
const errorInitialState = {
  name: false,
  messageForName: "",
  phone: false,
  messageForPhone: "",
  address: false,
  messageForAddres: "",
};

export const Partner = () => {
  const { menuMaster } = useGetMenuMaster();
  const partnerDetails = useAppSelector(selectPartnerDetails);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPartnerDetails());
  }, []);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(errorInitialState);
  const [formData, setFormData] = useState(formDataInitialState);
  const [isActionEdit, setIsActionEdit] = useState(false);

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
    setFormData(formDataInitialState);
    setError(errorInitialState);
    setOpen(false);
    setIsActionEdit(false);
  };

  const onConfirm = async () => {
    let { name, phone, address } = formData;
    phone = `${phone}`;
    console.log(name, phone, address);
    if (name.trim() === "") {
      setError((pre) => ({
        ...pre,
        name: true,
        messageForName: "This field is required",
      }));
    } else if (phone.trim() === "") {
      setError((pre) => ({
        ...pre,
        phone: true,
        messageForPhone: "This field is required",
      }));
    } else if (address.trim() === "") {
      setError((pre) => ({
        ...pre,
        address: true,
        messageForAddres: "This field is required",
      }));
    } else if (phone.length !== 10 || isNaN(Number(phone))) {
      setError((pre) => ({
        ...pre,
        phone: true,
        messageForPhone: "Invalid Phone Number",
      }));
    } else {
      if (isActionEdit) {
        const data = formData
        await dispatch(editPartnerDetails(formData));
        console.log(formData)
      } else {
        await dispatch(savePartnerDetails(formData));
      }

      onClose();
      await dispatch(getPartnerDetails());
    }
  };
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
                Add Partner
              </Button>
            </Grid>
          </Grid>
          <GFTable
            columns={[
              { id: "id", name: "Sl No" },
              { id: "name", name: "Name" },
              { id: "phone", name: "Phone" },
              { id: "address", name: "Address" },
              {
                id: "actions",
                name: "Actions",
                type: "action",
                actions: [
                  {
                    actionType: "EDIT",
                    handler: async (data) => {
                      setIsActionEdit(true);
                      setFormData((pre) => ({ ...pre, ...data }))
                      setOpen(true);
                    },
                  },
                  {
                    actionType: "DELETE",
                    handler: async (data) => {
                      await dispatch(deletePartner(data["_id"]));
                      await dispatch(getPartnerDetails());
                      console.log(data);
                    },
                  },
                ],
              },
            ]}
            data={partnerDetails}
          />
        </Box>
      </Box>
      <GFDialog
        title={"Partner Details"}
        open={open}
        onClose={onClose}
        onConfirm={onConfirm}
        confirmText={isActionEdit ? "Edit" : "Confirm"}
      >
        <Container maxWidth="xs">
          <TextField
            margin="normal"
            required
            fullWidth
            id="partner-name"
            label="Partner name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleOnChange}
            error={error.name}
            helperText={error.name && error.messageForName}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Partner phone"
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handleOnChange}
            slotProps={{
              htmlInput: {
                min: 0,
              },
            }}
            error={error.phone}
            helperText={error.phone && error.messageForPhone}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="partner-address"
            label="Partner address"
            name="address"
            autoComplete="street-address"
            multiline
            rows={4}
            value={formData.address}
            onChange={handleOnChange}
            error={error.address}
            helperText={error.address && error.messageForAddres}
          />
        </Container>
      </GFDialog>
    </Box>
  );
};

export default Partner;
