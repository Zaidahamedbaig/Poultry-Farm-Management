import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IPartner extends Document {
  id: number;
  name: string;
  address: string;
  phone: number;
}

const PartnerSchema: Schema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
});

export const Partner = mongoose.model<IPartner>("Partner", PartnerSchema);
