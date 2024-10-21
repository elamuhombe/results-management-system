import { model, Schema } from "mongoose";
import { ISession } from "../types/types";

const sessionSchema = new Schema<ISession>({
    userId:{type: Schema.Types.ObjectId, required: true},
    expiresAt:{type: Date},
    ipAddress: {type: String, required: true},
    userAgent:{type: String, required: true},
    isActive:{type: Boolean,required: true},

},{timestamps: true})

// export the model
const SessionModel = model<ISession>("sessionModel", sessionSchema)