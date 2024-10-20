//src/server.ts
import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

// Load environment variables
configDotenv();

// Create an instance of express
const app = express();

const port = 5300;
const uri = process.env.MONGODB_URL;

// Database connection
mongoose.connect(uri as string)
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

