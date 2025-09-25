import { Response, Request } from "express";
import { getMonthShortName } from "../../utils/date";
import { Feed } from "../../models/feed/feed";

export const addFeedStock = async (req: Request, res: Response) => {
  try {
    const {
      date,
      starterCount,
      preStarterCount,
      layerCount,
      starterPrice,
      preStarterPrice,
      layerPrice,
      transportationAndOthers,
    } = req.body;

    const purchaseDate = new Date(date);
    const year = purchaseDate.getFullYear();
    const monthShortName = getMonthShortName(purchaseDate);

    const feedBatchPrefix = `${"FB"}${year}${monthShortName}`; // e.g., "2025JUL"

    const regex = new RegExp(`^${feedBatchPrefix}(\\d{3})$`);
    const existingBatches = await Feed.find({ feedBatch: { $regex: regex } });

    const FeedbatchCount = (existingBatches.length + 1)
      .toString()
      .padStart(3, "0"); // 001, 002...
    const feedBatch = `${feedBatchPrefix}${FeedbatchCount}`; // Final batch name

    const transportationPerBag =
      transportationAndOthers / (starterCount + preStarterCount + layerCount);

    const netStarterPrice = starterPrice + transportationPerBag;
    const netPreStarterPrice = preStarterPrice + transportationPerBag;
    const netLayerPrice = layerPrice + transportationPerBag;

    const totalStarterPrice = netStarterPrice * starterCount;
    const totalPreStarterPrice = netPreStarterPrice * preStarterCount;
    const totalLayerPrice = netLayerPrice * layerCount;

    const totalPrice = Math.round(
      totalStarterPrice + totalPreStarterPrice + totalLayerPrice
    );

    const newFeedStock = new Feed({
      feedBatch,
      date,
      starterCount,
      preStarterCount,
      layerCount,
      starterPrice,
      preStarterPrice,
      layerPrice,
      transportationAndOthers,
      totalPrice,
      currentStarter: starterCount,
      currentPreStarter: preStarterCount,
      currentLayer: layerCount,
      status: 1,
    });

    const savedFeedStock = await newFeedStock.save();

    res.status(201).json({
      message: "Quail feed stock added successfully",
      data: savedFeedStock,
    });
  } catch (error) {
    console.error("Error adding quail stock:", error);
    res.status(500).json({ error: "Server error while adding quail feed" });
  }
};

export const getAllFeedStock = async (req: Request, res: Response) => {
  try {
    const feedStock = await Feed.find({ status: 1 });
    res.status(200).json({ data: feedStock });
  } catch (error) {
    res.status(500).json({ message: "Error fetching feed stock", error });
  }
};
