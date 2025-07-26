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

export const deletePartner = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const deletedPartner = await Partner.findByIdAndDelete(req.params.id);
    if (!deletedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    res.status(200).json({
      message: "Partner deleted Sucessfully",
      partner: deletedPartner,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting partner", error });
  }
};

export const editPartnerDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(id, data);
    const updatedPartnerDetails = await Partner.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedPartnerDetails) {
      return res.status(404).json({ message: "Partner not found" });
    }
    res.status(200).json({
      message: "Partner Updated Sucessfully",
      updatedPartnerDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Error Updating partner", error });
  }
};
