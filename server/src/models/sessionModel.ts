//src/models/sessiomModel.ts
import mongoose, { model, Schema, Types } from "mongoose";
import { ISession } from "../types/types";


// Session schema
const sessionSchema = new Schema<ISession>({
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sessionId: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

// export the model
export const SessionModel = model<ISession>("sessionModel", sessionSchema)