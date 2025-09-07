import { Container, TextField, MenuItem } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { GFDialog } from "../Dialog/Dialog";
import React, { useEffect, useState } from "react";
import { ISales } from "../../models/sales";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addSale } from "../../store/thunk/sales/addSales";
import { IStockDetails } from "../../models/stock";
import { selectStock } from "../../store/slices/stock/stockSlice";

const initialFormData: ISales = {
  batchName: "",
  quantity: -1,
  price: -1,
  date: "",
  customerName: "",
  phone: null,
  modeOfPayment: "",
};

const initialFormDataError = {
  batchName: false,
  messageForBatchName: "Please select batch ",
  quantity: false,
  messageForQuantity: "Quantity cannot be less than zero or empty ",
  price: false,
  messageForPrice: "Price cannot be empty ",
  date: false,
  messageForDate: "Please select Date of sale",
  customerName: false,
  messageForCustomerName: "Customer name cannot be empty ",
  phone: false,
  messageForPhone: "Enter valid phone number",
  modeOfPayment: false,
  messageForModeOfPayment: "Enter mode of payment",
};

interface addSalesDataProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  batches: string[];
  setBatches: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddSalesDataDailog: React.FC<addSalesDataProps> = ({
  open,
  setOpen,
  batches,
  setBatches,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(initialFormDataError);
  const [dateOfSale, setDateOfSale] = useState<Date | null>(null);

  const dispatch = useAppDispatch();
  const stockDetails: IStockDetails[] = useAppSelector(selectStock);

  const findBatch = (batchName: string) => {
    return stockDetails.filter((stock) => stock.batchName === batchName);
  };

  useEffect(() => {
    if (stockDetails.length > 0) {
      const batchNames = stockDetails
        .filter((stock) => stock.status === 1)
        .map((item) => item.batchName as string);
      setBatches(batchNames);
    }
  }, [stockDetails]);
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.name === "quantity") {
      const selectedBatch: IStockDetails[] = findBatch(formData.batchName);
      let currentQuantity = selectedBatch[0].currentQuantity as number;
      let quantity = parseInt(event.target.value);
      if (quantity > currentQuantity) {
        setError((pre) => ({
          ...pre,
          quantity: true,
          messageForQuantity: "Quantity is greater than selected stock",
        }));
        setFormData((pre) => ({
          ...pre,
          [event.target.name]: event.target.value,
        }));
      } else {
        setError((pre) => ({
          ...pre,
          [event.target.name]: false,
        }));

        setFormData((pre) => ({
          ...pre,
          [event.target.name]: event.target.value,
        }));
      }
    } else {
      setError((pre) => ({
        ...pre,
        [event.target.name]: false,
      }));

      setFormData((pre) => ({
        ...pre,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const onClose = () => {
    setFormData(initialFormData);
    setError(initialFormDataError);
    setDateOfSale(null);
    setOpen(false);
  };

  const onConfirm = async () => {
    const {
      batchName,
      quantity,
      price,
      date,
      customerName,
      phone,
      modeOfPayment,
    } = formData;

    if (batchName === "") {
      setError((pre) => ({
        ...pre,
        batchName: true,
      }));
    } else if (quantity < 0) {
      setError((pre) => ({
        ...pre,
        quantity: true,
      }));
    } else if (price <0) {
      setError((pre) => ({
        ...pre,
        price: true,
      }));
    } else if (date === "") {
      setError((pre) => ({
        ...pre,
        date: true,
      }));
    } else if (customerName === "") {
      setError((pre) => ({
        ...pre,
        customerName: true,
      }));
    } else if (
      phone === null ||
      phone.toString().length > 10 ||
      phone.toString().length < 10
    ) {
      setError((pre) => ({
        ...pre,
        phone: true,
      }));
    } else if (modeOfPayment === "") {
      setError((pre) => ({
        ...pre,
        modeOfPayment: true,
      }));
    } else {
      await dispatch(addSale(formData));
      onClose();
    }
  };

  return (
    <GFDialog
      title={"Sale Details"}
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <Container maxWidth="xs">
        <TextField
          select
          label="Select Batch"
          name="batchName"
          value={formData.batchName}
          error={error.batchName}
          helperText={error.batchName && error.messageForBatchName}
          onChange={(e) => {
            setFormData((pre) => ({
              ...pre,
              [e.target.name]: e.target.value,
            }));
          }}
          fullWidth
          margin="normal"
        >
          <MenuItem value=""> Select Batch </MenuItem>
          {batches.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Quantity"
          value={formData.quantity === -1 ? null : formData.quantity}
          name="quantity"
          required
          onChange={handleOnChange}
          type="number"
          error={error.quantity}
          helperText={error.quantity && error.messageForQuantity}    
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Price"
          value={formData.price === -1 ? null : formData.price}
          name="price"
          required
          onChange={handleOnChange}
          type="number"
          error={error.price}
          helperText={error.price && error.messageForPrice}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            sx={{ width: "100%", marginBottom: "10px" }}
            label="Select Date of Sale"
            name="date"
            slotProps={{
              textField: {
                error: error.date,
                helperText: error.date ? error.messageForDate : "",
              },
            }}
            format="yyyy-MM-dd"
            value={dateOfSale}
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
              setDateOfSale(newDate);
            }}
          />
        </LocalizationProvider>

        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Customer Name"
          value={formData.customerName}
          name="customerName"
          required
          onChange={handleOnChange}
          type="text"
          error={error.customerName}
          helperText={error.customerName && error.messageForCustomerName}
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Customer Phone"
          value={formData.phone}
          name="phone"
          required
          onChange={handleOnChange}
          type="number"
          error={error.phone}
          helperText={error.phone && error.messageForPhone}
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Mode Of Payment"
          value={formData.modeOfPayment}
          name="modeOfPayment"
          required
          onChange={handleOnChange}
          type="text"
          error={error.modeOfPayment}
          helperText={error.modeOfPayment && error.messageForModeOfPayment}
        />
      </Container>
    </GFDialog>
  );
};

export default AddSalesDataDailog;
