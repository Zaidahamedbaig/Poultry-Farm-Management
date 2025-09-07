import { useEffect, useState } from "react";
import { GFDialog } from "../Dialog/Dialog";
import { IStockDetails } from "../../models/stock";
import { Container, TextField, MenuItem } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addStock } from "../../store/thunk/stock/addStock";
import { getStock } from "../../store/thunk/stock/getStockDetail";
import { selectPartnerDetails } from "../../store/slices/partner/partnerSlice";
import { PartnerDetail } from "../../models/partner";
import { getPartnerDetails } from "../../store/thunk/partner/getPartnerDetails";

interface StockDetailsProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const formDataInitialState: IStockDetails = {
  partner: "",
  quantity: -1,
  currentQuantity: -1,
  price: -1,
  dateOfBirth: "",
  dateOfPurchase: "",
};
const errorInitialState = {
  partner: false,
  messageForPartner: "Please select the partner",
  quantity: false,
  messageForQuantity: "This field is required",
  price: false,
  messageForPrice: "This field is required",
  dateOfBirth: false,
  messageForDateOfBirth: "Please select the Date of Birth",
  dateOfPurchase: false,
  messageForDateOfPurchase: "Please select the Date of Purchase",
};

const StockDetails: React.FC<StockDetailsProps> = ({ open, setOpen }) => {
  const [error, setError] = useState(errorInitialState);
  const [formData, setFormData] = useState(formDataInitialState);
  const [dateOfbirth, setDateOfBirth] = useState<Date | null>(null);
  const [dateOfPurchase, setDateOfPurchase] = useState<Date | null>(null);
  const partnerDetails = useAppSelector(selectPartnerDetails);
  const dispatch = useAppDispatch();
  const [partners, setPartners] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getPartnerDetails());
  }, [dispatch]);

  useEffect(() => {
    if (partnerDetails.length > 0) {
      const setPartnerDetails = (partnerDetails: PartnerDetail[]) => {
        const partnerNames = partnerDetails.map(
          (partner: PartnerDetail) => partner.name
        );

        setPartners(partnerNames);
      };
      setPartnerDetails(partnerDetails);
    }
  }, [partnerDetails]);

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
    setDateOfBirth(null);
    setDateOfPurchase(null);
    setOpen(false);
  };

  const onConfirm = async () => {
    if (formData.partner.trim() === "") {
      setError((pre) => ({
        ...pre,
        partner: true,
      }));
    } else if (formData.dateOfBirth.trim() === "") {
      setError((pre) => ({
        ...pre,
        dateOfBirth: true,
      }));
    } else if (formData.dateOfPurchase.trim() === "") {
      setError((pre) => ({
        ...pre,
        dateOfPurchase: true,
      }));
    } else if (formData.price < 0) {
      setError((pre) => ({
        ...pre,
        price: true,
      }));
    } else if (formData.quantity < 0) {
      setError((pre) => ({
        ...pre,
        quantity: true,
      }));
    } else {
      await dispatch(addStock(formData));
      onClose();
    }

    await dispatch(getStock());
  };
  return (
    <GFDialog
      title={"Stock Details"}
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <Container maxWidth="xs">
        <TextField
          select
          label="Select Partner"
          name="partner"
          value={formData.partner}
          error={error.partner}
          helperText={error.partner && error.messageForPartner}
          onChange={(e) => {
            setFormData((pre) => ({
              ...pre,
              [e.target.name]: e.target.value,
            }));
          }}
          fullWidth
          margin="normal"
        >
          <MenuItem value=""> Select Partner </MenuItem>
          {partners.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            sx={{ width: "100%", marginBottom: "10px" }}
            label="Select Date of Birth"
            name="dateOfBirth"
            slotProps={{
              textField: {
                error: error.dateOfBirth,
                helperText: error.dateOfBirth
                  ? error.messageForDateOfBirth
                  : "",
              },
            }}
            format="yyyy-MM-dd"
            value={dateOfbirth}
            onChange={(newDateOfbirthValue) => {
              if (newDateOfbirthValue) {
                const formattedDate = format(newDateOfbirthValue, "yyyy-MM-dd");

                setFormData((prev: any) => ({
                  ...prev,
                  dateOfBirth: formattedDate,
                }));
              } else {
                setFormData((prev: any) => ({
                  ...prev,
                  dateOfBirth: "",
                }));
              }

              setDateOfBirth(newDateOfbirthValue);
            }}
          />
          <DatePicker
            sx={{ width: "100%", marginBottom: "10px" }}
            label="Select Date of Purchase"
            name="dateOfPurchase"
            format="yyyy-MM-dd"
            value={dateOfPurchase}
            slotProps={{
              textField: {
                error: error.dateOfPurchase,
                helperText: error.dateOfPurchase
                  ? error.messageForDateOfPurchase
                  : "",
              },
            }}
            onChange={(newDateOfPurchase) => {
              if (newDateOfPurchase) {
                const formattedDate = format(newDateOfPurchase, "yyyy-MM-dd");

                setFormData((prev: any) => ({
                  ...prev,
                  dateOfPurchase: formattedDate,
                }));
              } else {
                setFormData((prev: any) => ({
                  ...prev,
                  dateOfPurchase: "",
                }));
              }
              setDateOfPurchase(newDateOfPurchase);
            }}
          />
        </LocalizationProvider>

        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Purchase price in rupees"
          value={formData.price < 0 ? null : formData.price}
          name="price"
          required
          onChange={handleOnChange}
          type="number"
          error={error.price}
          helperText={error.price && error.messageForPrice}
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Quantity"
          value={formData.quantity < 0 ? null : formData.quantity}
          name="quantity"
          required
          onChange={handleOnChange}
          type="number"
          error={error.quantity}
          helperText={error.quantity && error.messageForQuantity}
        />
      </Container>
    </GFDialog>
  );
};

export default StockDetails;
