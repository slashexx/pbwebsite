import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Pbhustle interface extending Document for Mongoose
export interface Pbhustle extends Document {
  updatedAt?: Date;
  lastContestCode?: string;
  rankings?: {
    rank: number;
    name: string;
    score: number;
    consistency: number;
  }[];
}

// Define the schema for Pbhustle
const pbhustleSchema = new Schema<Pbhustle>(
  {
    updatedAt: {
      type: Date,
    },
    lastContestCode: {
      type: String,
    },
    rankings: [
      {
        rank: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
      },
    ],
  },
);

// Create or retrieve the Pbhustle model
const PbhustleModel: Model<Pbhustle> = mongoose.models.hustles || mongoose.model<Pbhustle>("hustles", pbhustleSchema);

export default PbhustleModel;
