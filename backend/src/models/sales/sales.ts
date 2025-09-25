import mongoose, { Schema } from "mongoose";

interface ISales extends Document {
  batchName: string;
  quantity: number;
  price: number;
  date: Date;
  customerName: string;
  phone: number;
  modeOfPayment: string
}

const SalesSchema = new Schema({
  batchName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "price cannot be negative"],
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price cannot be negative"],
  },
  date: {
    type: Date,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
    default: "Unknown",
  },
  phone: { type: Number },
  modeOfPayment: {
    type: String,
    required: true,
  },
});

export const Sales = mongoose.model<ISales>("Sales", SalesSchema);
