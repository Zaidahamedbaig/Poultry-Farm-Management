import mongoose, { Document, Schema } from "mongoose";

export interface IMortality {
  date: Date;
  quantity: number;
  reason: string;
}

export interface IMissing {
  date: Date;
  quantity: number;
  reason: string;
}

export interface IConsumedFeed {
  feedBatchName: string;
  date: Date;
  preStarterCount: number;
  preStarterPrice: number;
  starterCount: number;
  starterPrice: number;
  layerCount: number;
  layerPrice: number;
}

export interface IStock extends Document {
  batchName: string;
  partner: string;
  quantity: number;
  price: number;
  mortality: IMortality[];
  dateOfBirth: Date;
  dateOfPurchase: Date;
  currentQuantity: number;
  status: number;
  missing: IMissing[];
  consumedFeed: IConsumedFeed[];
}

const missingSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Missing quantity cannot be negative"],
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const mortalitySchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Mortality quantity cannot be negative"],
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const consumedFeedSchema = new Schema({
  feedBatchName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  preStarterCount: {
    type: Number,
    default: 0,
    min: [0, "pre stater count cannot be negative"],
  },
  starterCount: {
    type: Number,
    default: 0,
    min: [0, "stater count cannot be negative"],
  },
  layerCount: {
    type: Number,
    default: 0,
    min: [0, "layer count cannot be negative"],
  },
  starterPrice: {
    type: Number,
    required: true,
    min: [0, "starter price cannot be negative"],
  },
  preStarterPrice: {
    type: Number,
    required: true,
    min: [0, "pre starter price cannot be negative"],
  },
  layerPrice: {
    type: Number,
    required: true,
    min: [0, "layer price cannot be negative"],
  },
});

const stockSchema = new Schema({
  batchName: {
    type: String,
    required: true,
    unique: true,
  },
  partner: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity cannot be negative"],
  },
  currentQuantity: {
    type: Number,
    required: true,
    min: [0, "Current quantity cannot be negative"],
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"],
  },
  mortality: {
    type: [mortalitySchema],
    default: [],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  dateOfPurchase: {
    type: Date,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  missing: {
    type: [missingSchema],
    default: [],
  },
  consumedFeed: {
    type: [consumedFeedSchema],
    default: [],
  },
});

export const Stock = mongoose.model<IStock>("Stock", stockSchema);
