import mongoose, { Schema } from "mongoose";

export interface IConsumedFeedToStock {
  feedBatch: string;
  batchName: string;
  date: Date;
  preStarterCount: number;
  starterCount: number;
  layerCount: number;
}

export interface IFeed {
  feedBatch: string;
  date: Date;
  starterCount: number;
  preStarterCount: number;
  layerCount: number;
  starterPrice: number;
  preStarterPrice: number;
  layerPrice: number;
  currentStarter: number;
  currentPreStarter: number;
  currentLayer: number;
  transportationAndOthers: number;
  totalPrice: number;
  status: number;
  feed: IConsumedFeedToStock[];
}

const consumedFeedSchema = new Schema({
  feedBatch: {
    type: String,
    required: true,
  },
  batchName: {
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
});

const feedSchema = new Schema({
  feedBatch: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  starterCount: {
    type: Number,
    min: [0, "stater count cannot be negative"],
    default: 0,
  },
  preStarterCount: {
    type: Number,
    default: 0,
    min: [0, "pre stater count cannot be negative"],
  },
  layerCount: {
    type: Number,
    default: 0,
    min: [0, "layer count cannot be negative"],
  },
  starterPrice: {
    type: Number,
    default: 0,
    min: [0, "stater price cannot be negative"],
  },
  preStarterPrice: {
    type: Number,
    default: 0,
    min: [0, "pre stater price cannot be negative"],
  },
  layerPrice: {
    type: Number,
    default: 0,
    min: [0, "layer price cannot be negative"],
  },
  currentStarter: {
    type: Number,
    default: 0,
    min: [0, "current stater cannot be negative"],
  },
  currentPreStarter: {
    type: Number,
    required: true,
    min: [0, "current pre stater cannot be negative"],
  },
  currentLayer: {
    type: Number,
    required: true,
    min: [0, "current layer cannot be negative"],
  },
  transportationAndOthers: {
    type: Number,
    required: true,
    min: [0, "transportation cannot be negative"],
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, "total price cannot be negative"],
  },
  feed: {
    type: [consumedFeedSchema],
    default: [],
  },
  status: { type: Number, required: true },
});

export const Feed = mongoose.model<IFeed>("Feed", feedSchema);
