//src/server.ts
import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import errorHandler from "./middleware/errorHandler";
import { assessmentRoutes, attendanceRoutes, authRoute, linkedinRoutes, projectReviewRoutes, projectSubmissionRoutes, userRoutes } from "./routes";




// Load environment variables
configDotenv();

// Create an instance of express
const app = express();

const port = 5300;
const uri = process.env.MONGODB_URL;

// Middleware to parse JSON request bodies
app.use(express.json());

// Health Check Route
app.get('/test', (req: Request, res: Response) => {
    res.send('Server is up and running!');
});

// Use the auth route
app.use('/api/v1/auth', authRoute);

// Use the user routes
app.use('/api/v1/users', userRoutes);

// Use the assessment routes
app.use('/api/v1/assessments', assessmentRoutes);

// Use the attendance routes
app.use('/api/v1/attendances',attendanceRoutes);

// Use the project submission routes
app.use('/api/v1/project-submission',projectSubmissionRoutes);

// Use the project review routes
app.use('/api/v1/project-review',projectReviewRoutes);

// Use the linkedin post routes
app.use('/api/v1/linkedin',linkedinRoutes);


// // Error handling middleware
// app.use(errorHandler);



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


