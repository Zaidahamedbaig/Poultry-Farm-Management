import React, { useState } from "react";
import { GFDialog } from "../Dialog/Dialog";
import {
  Box,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { getStock } from "../../store/thunk/stock/getStockDetail";
import { useAppDispatch } from "../../store/store";
import { addMortality } from "../../store/thunk/stock/addMortality";
import { addMissing } from "../../store/thunk/stock/addMissing";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface mortalityOrMissingProps {
  isMortalityDialogOpen: boolean;
  setIsMortalityDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBatchName: string;
}

const initialMortalityOrMissingDataError = {
  quantity: false,
  messageForQuantity:
    "Quantity should not be empty and negtive and must be greater than zero",
  date: false,
  messageForDate: "Enter a valid date",
  reason: false,
  messageForReason: "Reason should not be empty",
};
const MortalityAndMissing: React.FC<mortalityOrMissingProps> = ({
  isMortalityDialogOpen,
  setIsMortalityDialogOpen,
  selectedBatchName,
}) => {
  const [mortalityOrMissingFormData, setMortalityOrMissingFormData] = useState({
    batchName: "",
    type: "Add Mortality",
    quantity: null,
    date: null,
    reason: "",
  });
  const [mortalityOrMissingDate, setMortalityOrMissingDate] =
    useState<Date | null>(null);
  const dispatch = useAppDispatch();
  const [mortalityOrMissingDataError, setMortalityOrMissingDataError] =
    useState(initialMortalityOrMissingDataError);

  const handleMortalityOrMissingData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMortalityOrMissingDataError((pre) => ({
      ...pre,
      [event.target.name]: false,
    }));

    setMortalityOrMissingFormData((pre) => ({
      ...pre,
      [event.target.name]: event.target.value,
    }));
  };
  const OnMortalityOrMissingDataClose = () => {
    setMortalityOrMissingFormData(() => ({
      batchName: "",
      type: "Add Mortality",
      quantity: null,
      date: null,
      reason: "",
    }));
    setMortalityOrMissingDate(null);
    setIsMortalityDialogOpen(false);
  };

  const onMortalityOrMissingDataConfirm = async () => {
    const { batchName, type, quantity, date, reason } =
      mortalityOrMissingFormData;

    if (quantity === null || quantity < 0) {
      setMortalityOrMissingDataError((pre) => ({
        ...pre,
        quantity: true,
      }));
    } else if (date === null) {
      setMortalityOrMissingDataError((pre) => ({
        ...pre,
        date: true,
      }));
    } else if (reason.trim() === "") {
      setMortalityOrMissingDataError((pre) => ({
        ...pre,
        reason: true,
      }));
    } else {
      console.log(mortalityOrMissingFormData);

      if (type === "Add Mortality") {
        await dispatch(
          addMortality({
            batchName: selectedBatchName,
            date: new Date(date).toISOString(),
            quantity,
            reason,
          })
        );
      } else {
        await dispatch(
          addMissing({
            batchName: selectedBatchName,
            date,
            quantity,
            reason,
          })
        );
      }

      await dispatch(getStock());
      OnMortalityOrMissingDataClose();
    }
  };
  return (
    <GFDialog
      title={mortalityOrMissingFormData.type}
      open={isMortalityDialogOpen}
      onClose={OnMortalityOrMissingDataClose}
      onConfirm={onMortalityOrMissingDataConfirm}
    >
      <Container maxWidth="xs">
        <Box>
          <RadioGroup
            row
            value={mortalityOrMissingFormData.type}
            onChange={(e) => {
              setMortalityOrMissingFormData((pre) => ({
                ...pre,
                type: e.target.value,
              }));
            }}
          >
            <FormControlLabel
              value="Add Mortality"
              control={<Radio />}
              label="Add Mortality"
            />
            <FormControlLabel
              value="Add Missing"
              control={<Radio />}
              label="Add Missing"
            />
          </RadioGroup>
        </Box>
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Quantity"
          value={mortalityOrMissingFormData.quantity}
          name="quantity"
          onChange={handleMortalityOrMissingData}
          type="number"
          error={mortalityOrMissingDataError.quantity}
          helperText={
            mortalityOrMissingDataError.quantity &&
            mortalityOrMissingDataError.messageForQuantity
          }
          required
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            sx={{ width: "100%", marginBottom: "10px" }}
            label={`Select Date of ${
              mortalityOrMissingFormData.type === "Add Mortality"
                ? "Mortality"
                : "Missing"
            }`}
            name="date"
            disableFuture
            slotProps={{
              textField: {
                error: mortalityOrMissingDataError.date,
                helperText: mortalityOrMissingDataError.date
                  ? mortalityOrMissingDataError.messageForDate
                  : "",
              },
            }}
            format="yyyy-MM-dd"
            value={mortalityOrMissingDate}
            onChange={(newDate) => {
              if (newDate) {
                const formattedDate = format(newDate, "yyyy-MM-dd");
                setMortalityOrMissingFormData((prev: any) => ({
                  ...prev,
                  date: formattedDate,
                }));
                setMortalityOrMissingDate(newDate);
              }
            }}
          />
        </LocalizationProvider>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Reason For Death"
          name="reason"
          multiline
          rows={4}
          value={mortalityOrMissingFormData.reason}
          onChange={handleMortalityOrMissingData}
          error={mortalityOrMissingDataError.reason}
          helperText={
            mortalityOrMissingDataError.reason &&
            mortalityOrMissingDataError.messageForReason
          }
        />
      </Container>
    </GFDialog>
  );
};

export default MortalityAndMissing;
