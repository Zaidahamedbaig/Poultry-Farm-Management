import { Container, TextField, MenuItem } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { IFeed } from "../../models/feed";
import { GFDialog } from "../Dialog/Dialog";
import { IConsumedFeed } from "../../models/stock";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectFeedStock } from "../../store/slices/feed/feedSlice";
import { addConsumedFeed } from "../../store/thunk/stock/addConsumedFeed";

interface addConsumedFeedProps {
  isConsumedFeedOpen: boolean;
  setIsConsumedFeedOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBatchNameForFeed: string;
}

const initialConsumedFeed: IConsumedFeed = {
  feedBatchName: "",
  batchName: "",
  date: "",
  starterCount: -1,
  starterPrice: -1,
  preStarterCount: -1,
  preStarterPrice: -1,
  layerCount: -1,
  layerPrice: -1,
};

const initialConsumedFeedError = {
  feedBatchName: false,
  messageForFeedBatchName: "Please select feed batch",
  date: false,
  messageForDate: "Select a valid date",
  starterCount: false,
  messageForStarterCount:
    "Starter count can't be negative or exceed available Starter count; enter 0 if none.",
  preStarterCount: false,
  messageForPreStarterCount:
    "Pre Starter count can't be negative or exceed available Pre Starter count; enter 0 if none.",
  layerCount: false,
  messageForLayerCount:
    "Layer count can't be negative or exceed available Layer count; enter 0 if none.",
};

export const AddConsumedFeedDailog: React.FC<addConsumedFeedProps> = ({
  isConsumedFeedOpen,
  setIsConsumedFeedOpen,
  selectedBatchNameForFeed,
}) => {
  const [addFeedData, setAddFeedData] = useState(initialConsumedFeed);
  const [addFeedDataError, setAddFeedDataError] = useState(
    initialConsumedFeedError
  );
  const [dateOfAddingFeed, setDateOfAddingFeed] = useState<Date | null>(null);
  const dispatch = useAppDispatch();
  const feedDetails = useAppSelector(selectFeedStock);
  const [feedBatchNames, setFeedBatchNames] = useState<string[]>([]);

  useEffect(() => {
    if (feedDetails.length > 0) {
      const feedBatches = feedDetails.map((batch: IFeed) => {
        return batch.feedBatch as string;
      });
      setFeedBatchNames(feedBatches);
    }
  }, [feedDetails]);
  useEffect(() => {
    setAddFeedData((pre) => ({
      ...pre,
      batchName: selectedBatchNameForFeed,
    }));
  }, [selectedBatchNameForFeed]);

  const handleOnAddFeedDataChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddFeedDataError({
      ...addFeedDataError,
      [event.target.name]: false,
    });

    setAddFeedData((pre) => ({
      ...pre,
      [event.target.name]: event.target.value,
    }));
  };

  const onAddConsumedFeedClose = () => {
    setAddFeedData(initialConsumedFeed);
    setDateOfAddingFeed(null);
    setIsConsumedFeedOpen(false);
  };

  const onAddConsumedFeedConfirm = async () => {
    const { date, feedBatchName, layerCount, preStarterCount, starterCount } =
      addFeedData;

    const selectedFeedBatch = feedDetails.filter(
      (feedStock: IFeed) => feedStock.feedBatch === feedBatchName
    );
    const {
      starterCount: currentStarterCount,
      preStarterCount: currentPreStarterCount,
      layerCount: currentLayerCount,
    } = selectedFeedBatch[0];

    if (feedBatchName === "") {
      setAddFeedDataError({
        ...addFeedDataError,
        feedBatchName: true,
      });
    } else if (date === "") {
      setAddFeedDataError({
        ...addFeedDataError,
        date: true,
      });
    } else if (
      starterCount === null ||
      starterCount < 0 ||
      (currentStarterCount !== null && currentStarterCount < starterCount)
    ) {
      setAddFeedDataError({
        ...addFeedDataError,
        starterCount: true,
      });
    } else if (
      preStarterCount === null ||
      preStarterCount < 0 ||
      (currentPreStarterCount !== null &&
        currentPreStarterCount < preStarterCount)
    ) {
      setAddFeedDataError({
        ...addFeedDataError,
        preStarterCount: true,
      });
    } else if (
      layerCount === null ||
      layerCount < 0 ||
      (currentLayerCount !== null && currentLayerCount < layerCount)
    ) {
      setAddFeedDataError({
        ...addFeedDataError,
        layerCount: true,
      });
    } else {
      await dispatch(addConsumedFeed(addFeedData));
      onAddConsumedFeedClose();
    }
  };

  return (
    <GFDialog
      title={"Add Consumed Feed"}
      open={isConsumedFeedOpen}
      onClose={onAddConsumedFeedClose}
      onConfirm={onAddConsumedFeedConfirm}
    >
      <Container maxWidth="xs">
        <TextField
          select
          label="Select Feed Batch"
          name="feedBatchName"
          value={addFeedData.feedBatchName ?? ""}
          error={addFeedDataError.feedBatchName}
          helperText={
            addFeedDataError.feedBatchName &&
            addFeedDataError.messageForFeedBatchName
          }
          onChange={(e) => {
            const selectedFeedBatchName = e.target.value;

            setAddFeedData((pre) => ({
              ...pre,
              feedBatchName: selectedFeedBatchName,
            }));
            if (selectedFeedBatchName !== "") {
              const selectedFeedBatch = feedDetails.find(
                (feedStock: IFeed) =>
                  feedStock.feedBatch === selectedFeedBatchName
              );

              if (selectedFeedBatch) {
                setAddFeedData((pre: any) => ({
                  ...pre,
                  starterPrice: selectedFeedBatch.starterPrice,
                  preStarterPrice: selectedFeedBatch.preStarterPrice,
                  layerPrice: selectedFeedBatch.layerPrice,
                }));
              }
            }
          }}
          fullWidth
          margin="normal"
        >
          <MenuItem value=""> Select Feed Batch </MenuItem>
          {feedBatchNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            sx={{ width: "100%", marginBottom: "10px" }}
            label="Select Date of Adding Feed"
            name="date"
            slotProps={{
              textField: {
                error: addFeedDataError.date,
                helperText: addFeedDataError.date
                  ? addFeedDataError.messageForDate
                  : "",
              },
            }}
            format="yyyy-MM-dd"
            value={dateOfAddingFeed}
            onChange={(newDateOfAddingFeed) => {
              if (newDateOfAddingFeed) {
                const formattedDate = format(newDateOfAddingFeed, "yyyy-MM-dd");
                setAddFeedData((prev: any) => ({
                  ...prev,
                  date: formattedDate,
                }));
              } else {
                setAddFeedData((prev: any) => ({
                  ...prev,
                  date: "",
                }));
              }
              setDateOfAddingFeed(newDateOfAddingFeed);
            }}
          />
        </LocalizationProvider>

        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Starter Count"
          value={
            addFeedData.starterCount === -1 ? null : addFeedData.starterCount
          }
          name="starterCount"
          required
          onChange={handleOnAddFeedDataChange}
          type="number"
          error={addFeedDataError.starterCount}
          helperText={
            addFeedDataError.starterCount &&
            addFeedDataError.messageForStarterCount
          }
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Starter Price"
          value={
            addFeedData.starterPrice === -1 ? null : addFeedData.starterPrice
          }
          name="starterPrice"
          type="number"
          slotProps={{
            input: { readOnly: true },
            inputLabel: { shrink: addFeedData.starterPrice !== -1 },
          }}
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Pre Starter Count"
          value={
            addFeedData.preStarterCount === -1
              ? null
              : addFeedData.preStarterCount
          }
          name="preStarterCount"
          required
          onChange={handleOnAddFeedDataChange}
          type="number"
          error={addFeedDataError.preStarterCount}
          helperText={
            addFeedDataError.preStarterCount &&
            addFeedDataError.messageForPreStarterCount
          }
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Pre Starter Price"
          value={
            addFeedData.preStarterPrice === -1
              ? null
              : addFeedData.preStarterPrice
          }
          name="preStarterPrice"
          type="number"
          slotProps={{
            input: { readOnly: true },
            inputLabel: { shrink: addFeedData.preStarterPrice !== -1 },
          }}
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Layer Count"
          value={addFeedData.layerCount === -1 ? null : addFeedData.layerCount}
          name="layerCount"
          required
          onChange={handleOnAddFeedDataChange}
          type="number"
          error={addFeedDataError.layerCount}
          helperText={
            addFeedDataError.layerCount && addFeedDataError.messageForLayerCount
          }
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          label="Layer Price"
          value={addFeedData.layerPrice === -1 ? null : addFeedData.layerPrice}
          name="layerPrice"
          type="number"
          slotProps={{
            input: { readOnly: true },
            inputLabel: { shrink: addFeedData.layerPrice !== -1 },
          }}
        />
      </Container>
    </GFDialog>
  );
};

export default addConsumedFeed;
