import mongoose, { Document, Schema } from "mongoose";

export interface Event extends Document {
    id: string;
    eventName: string;
    description: string;
    eventDate: string;
    lastDateOfRegistration: string;
    dateCreated: string;
    dateModified: string;
    imageURL: string; 
    registrationLink: string;
}

const Eventschema: Schema<Event> = new Schema({
   id:{
    type:String,
    required:true,
   },
   eventName:{
    type:String,
    required:true,
   },
   description:{
    type:String,
    required:true,
   },
   eventDate:{
    type:String,
    required:true,
   },
   lastDateOfRegistration:{
    type:String,
    required:true,
   },
   dateCreated:{
    type:String,
    required:true,
   },
   dateModified:{
    type:String,
    required:true,
   },
   imageURL:{
    type:String,
    required:true,
   },
   registrationLink:{
    type:String,
    required:true,
   },
});

// Use `mongoose.models` to avoid overwriting the model
const Eventmodel = mongoose.models.events || mongoose.model<Event>("events", Eventschema);
export default Eventmodel;
