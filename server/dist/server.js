"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src/server.ts
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const assessmentMarksRoute_1 = __importDefault(require("./routes/assessmentMarksRoute"));
// Load environment variables
(0, dotenv_1.configDotenv)();
// Create an instance of express
const app = (0, express_1.default)();
const port = 5300;
const uri = process.env.MONGODB_URL;
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
// Database connection
mongoose_1.default.connect(uri)
    .then(() => {
    console.log("Database connection successful");
    // Start the server once database connection is successful
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed: ", error);
});
app.use("/api/v1/assessments", assessmentMarksRoute_1.default);
