import { Response, Request } from "express";
import {
  IConsumedFeed,
  IMissing,
  IMortality,
  IStock,
  Stock,
} from "../../models/stock/stock";
import { getMonthShortName } from "../../utils/date";
import { Feed, IConsumedFeedToStock, IFeed } from "../../models/feed/feed";

export const addStock = async (req: Request, res: Response) => {
  try {
    const { partner, quantity, price, dateOfBirth, dateOfPurchase } = req.body;

    if (quantity <= 0 || price < 0) {
      return res
        .status(400)
        .json({ error: "Quantity and price must be non-negative" });
    }

    const purchaseDate = new Date(dateOfPurchase);
    const year = purchaseDate.getFullYear();
    const monthShortName = getMonthShortName(purchaseDate);

    const batchPrefix = `${year}${monthShortName}`; // e.g., "2025JUL"

    const regex = new RegExp(`^${batchPrefix}(\\d{3})$`);
    const existingBatches = await Stock.find({ batchName: { $regex: regex } });

    const batchCount = (existingBatches.length + 1).toString().padStart(3, "0"); // 001, 002...
    const batchName = `${batchPrefix}${batchCount}`; // Final batch name
    const newStock = new Stock({
      batchName,
      partner,
      dateOfBirth,
      dateOfPurchase,
      quantity,
      price,
      currentQuantity: quantity,
      status: 1,
    });

    const savedStock = await newStock.save();
    res
      .status(201)
      .json({ message: "Quail stock added successfully", data: savedStock });
  } catch (err) {
    console.error("Error adding quail stock:", err);
    res.status(500).json({ error: "Server error while adding quail stock" });
  }
};

export const addMoratlity = async (req: Request, res: Response) => {
  try {
    const { quantity, reason, date, batchName } = req.body;

    if (quantity < 0) {
      return res.status(400).json({ error: "Quantity must be non-negative" });
    }

    const stock = await Stock.findOne({
      batchName: batchName,
    });

    if (!stock) {
      res.status(400).json({
        message: `Stock with the batch name ${batchName} doesn't exist`,
      });
      return;
    }

    const mortality: IMortality = {
      quantity,
      reason,
      date,
    };
    if (stock.currentQuantity - quantity < 0) {
      res.status(400).json({
        message: `Added Mortality quantity surpasses current quantity`,
      });
      return;
    }

    stock.currentQuantity -= quantity;
    if (stock.currentQuantity > 0) {
      stock.status = 1;
    } else {
      stock.status = 0;
    }
    console.log(mortality);
    
    stock.mortality.push(mortality);

    const savedStock = await stock.save();
    res.status(201).json({
      message: "Mortality record added successfully",
      data: savedStock,
    });
  } catch (err) {
    console.error("Error adding quail Mortality:", err);
    res
      .status(500)
      .json({ error: "Server error while adding quail mortality" });
  }
};

export const getAllStock = async (req: Request, res: Response) => {
  try {
    const stock = await Stock.find();
    res.status(200).json({ data: stock });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Stock", error });
  }
};

export const addMissing = async (req: Request, res: Response) => {
  try {
    const { date, quantity, reason, batchName } = req.body;

    if (quantity < 0) {
      return res.status(400).json({ error: "Quantity must be non-negative" });
    }

    const stock = await Stock.findOne({
      batchName: batchName,
    });

    if (!stock) {
      res.status(400).json({
        message: `Stock with the batch name ${batchName} doesn't exist`,
      });
      return;
    }

    const missing: IMissing = {
      date,
      quantity,
      reason,
    };
    if (stock.currentQuantity - quantity < 0) {
      res.status(400).json({
        message: `Added Missing quantity surpasses current quantity`,
      });
      return;
    }

    stock.currentQuantity -= quantity;
    if (stock.currentQuantity > 0) {
      stock.status = 1;
    } else {
      stock.status = 0;
    }
    stock.missing.push(missing);

    const savedStock = await stock.save();
    res.status(201).json({
      message: "Missing record added successfully",
      data: savedStock,
    });
  } catch (err) {
    console.error("Error adding quail Missing Quantity:", err);
    res
      .status(500)
      .json({ error: "Server error while adding quail mortality" });
  }
};

export const addConsumedFeed = async (req: Request, res: Response) => {
  try {
    const {
      feedBatchName,
      batchName,
      date,
      preStarterCount,
      preStarterPrice,
      starterCount,
      starterPrice,
      layerCount,
      layerPrice,
    } = req.body;

    if (preStarterPrice < 0) {
      return res
        .status(400)
        .json({ error: "pre stater price must be non-negative" });
    }

    if (starterPrice < 0) {
      return res
        .status(400)
        .json({ error: "stater price must be non-negative" });
    }

    if (layerPrice < 0) {
      return res
        .status(400)
        .json({ error: "layer price must be non-negative" });
    }

    if (preStarterCount < 0) {
      return res
        .status(400)
        .json({ error: "pre stater quantity must be non-negative" });
    }
    if (starterCount < 0) {
      return res
        .status(400)
        .json({ error: "stater quantity must be non-negative" });
    }
    if (layerCount < 0) {
      return res
        .status(400)
        .json({ error: "layer quantity must be non-negative" });
    }

    const feedStock = await Feed.findOne({
      feedBatch: feedBatchName,
    });

    if (!feedStock) {
      res.status(400).json({
        message: `Feed batch with the batch name ${feedBatchName} doesn't exist`,
      });
      return;
    }

    if (preStarterCount > feedStock.currentPreStarter) {
      res.status(400).json({
        message: `Added pre stater quantity surpasses current pre stater quantity`,
      });
      return;
    }

    feedStock.currentPreStarter -= preStarterCount;

    if (starterCount > feedStock.currentStarter) {
      res.status(400).json({
        message: `Added stater quantity surpasses current stater quantity`,
      });
      return;
    }
    feedStock.currentStarter -= starterCount;

    if (layerCount > feedStock.currentLayer) {
      res.status(400).json({
        message: `Added layer quantity surpasses current layer quantity`,
      });
      return;
    }
    feedStock.currentLayer -= layerCount;

    const consumedFeed: IConsumedFeedToStock = {
      feedBatch: feedBatchName,
      batchName,
      date,
      preStarterCount,
      starterCount,
      layerCount,
    };

    const consumedFeedByBatch: IConsumedFeed = {
      feedBatchName,
      date,
      preStarterCount,
      starterCount,
      layerCount,
      starterPrice,
      preStarterPrice,
      layerPrice,
    };

    const totalCurrentQuantity =
      feedStock.currentPreStarter +
      feedStock.currentStarter +
      feedStock.currentLayer;

    if (totalCurrentQuantity > 0) {
      feedStock.status = 1;
    } else if (totalCurrentQuantity === 0) {
      feedStock.status = 0;
    }

    feedStock.feed.push(consumedFeed);

    const stock = await Stock.findOne({ batchName: batchName, status: 1 });

    if (!stock) {
      return res.status(400).json({
        error: `Batch with batch name ${batchName} you are trying to find is inactive or doesnt'exist`,
      });
    }

    stock.consumedFeed.push(consumedFeedByBatch);
    const savedStock = await stock.save();
    const savedStockFeed = await feedStock.save();

    res.status(201).json({
      message: "consumed feed record added successfully",
      data: savedStock,
    });
  } catch (error) {
    console.error("Error adding consumed feed:", error);
    res.status(500).json({ error: "Server error while adding consumed feed" });
  }
};
