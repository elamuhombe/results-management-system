"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
//src/models/sessiomModel.ts
const mongoose_1 = require("mongoose");
// Session schema
const sessionSchema = new mongoose_1.Schema({
    user: {
        userId: { type: String, require: true }
    },
    _id: { type: mongoose_1.Schema.Types.ObjectId, required: true, auto: true },
    sessionId: { type: String, Unique: true },
    expiresAt: { type: Date, required: true },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    isActive: { type: Boolean, required: true },
}, { timestamps: true });
// export the model
exports.SessionModel = (0, mongoose_1.model)("sessionModel", sessionSchema);
