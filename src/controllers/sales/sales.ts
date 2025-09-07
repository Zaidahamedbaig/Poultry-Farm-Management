import { Sales } from "../../models/sales/sales";
import { Request, Response } from "express";
import { Stock } from "../../models/stock/stock";

export const addSale = async (req: Request, res: Response) => {
  try {
    const {
      batchName,
      quantity,
      price,
      date,
      customerName,
      phone,
      modeOfPayment,
    } = req.body;

    if (quantity <= 0 || price < 0) {
      return res
        .status(400)
        .json({ error: "Quantity and price must be non-negative" });
    }

    const stock = await Stock.findOne({ batchName });

    if (!stock) {
      res.status(400).json({
        message: `Stock with the batch name ${batchName} doesn't exist`,
      });
      return;
    }

    if (stock.currentQuantity - quantity < 0) {
      res.status(400).json({
        message: `Added Sales quantity surpasses current quantity`,
      });
      return;
    }

    stock.currentQuantity -= quantity;
    stock.status = stock.currentQuantity > 0 ? 1 : 0;

    await stock.save();

    if (stock.currentQuantity > 0) {
      stock.status = 1;
    } else {
      stock.status = 0;
    }

    const newSales = new Sales({
      batchName,
      quantity,
      price,
      date,
      customerName,
      phone,
      modeOfPayment,
    });
    const saved = await newSales.save();

    res.status(201).json({ message: "Sold 🎉 🎉 🎉 ", data: saved });
  } catch (error) {
    res.status(500).json({ message: "Error Selling stock", error });
  }
};

export const getAllSales = async (req: Request, res: Response) => {
  try {
    const {batchName} = req.query;
    const sales = await Sales.find({ batchName });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales", error });
  }
};
