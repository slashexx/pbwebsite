import mongoose, { Document, Schema } from "mongoose";

export interface Admin extends Document {
    email: string;
    role:string;
    userId:number;
}

const Adminschema: Schema<Admin> = new Schema({
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    userId: {
        type:Number,
        required: true,
    },
});

// Use `mongoose.models` to avoid overwriting the model
const Adminmodel = mongoose.models.admins || mongoose.model<Admin>("admins", Adminschema);
export default Adminmodel;
