"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//src/models/userModel.ts
const mongoose_1 = require("mongoose");
// User schema definition
const userSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, required: true, auto: true },
    name: { type: String, required: true },
    userId: { type: String, required: true }, // name of the user                     
    studentId: { type: String, required: function () { return this.userRole === 'student'; } }, // Required for 'student' role
    email: { type: String, required: true, unique: true }, // The email address of the user
    password: { type: String, required: true }, // The password for user authentication
    userRole: { type: String, enum: ['admin', 'student'], required: true } // The role of the user
}, {
    timestamps: true, // Automatically create `createdAt` and `updatedAt` fields
});
// Export the User model
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
