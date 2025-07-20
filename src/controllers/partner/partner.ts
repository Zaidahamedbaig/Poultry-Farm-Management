import { Partner } from "../../models/partner/partner";
import { Request, Response } from "express";

export const addPartner = async (req: Request, res: Response) => {
  try {
    const { name, address, phone } = req.body;

    const newPartner = new Partner({ name, address, phone });
    const saved = await newPartner.save();

    res.status(201).json({ message: "Partner saved", data: saved });
  } catch (error) {
    res.status(500).json({ message: "Error saving partner", error });
  }
};

export const getAllPartners = async (req: Request, res: Response) => {
  try {
    const partners = await Partner.find();
    res.status(200).json({ data: partners });
  } catch (error) {
    res.status(500).json({ message: "Error fetching partners", error });
  }
};
