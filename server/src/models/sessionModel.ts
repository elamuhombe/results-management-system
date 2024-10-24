//src/models/sessiomModel.ts
import mongoose, { model, Schema, Types } from "mongoose";
import { ISession } from "../types/types";


// Session schema
const sessionSchema = new Schema<ISession>({
 user: {
    userId:{type: String, require: true}
  
},
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    sessionId: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    isActive: { type: Boolean, required: true },
  },{timestamps: true});

// export the model
export const SessionModel = model<ISession>("sessionModel", sessionSchema)