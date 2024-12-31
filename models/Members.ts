import mongoose, { Document, Schema } from "mongoose";

// Define the Achievement interface
export interface Members extends Document {
    company: string;
    linkedInUrl: string;
    name: string;
    role: string;
    year: string;
    imageUrl: string; 
}

const memberSchema = new mongoose.Schema({
    company: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    linkedInUrl: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true 
    }
  });
  
const Membersmodel = mongoose.models.pbmembers || mongoose.model<Members>("pbmembers", memberSchema);

export default Membersmodel;
