import express from "express";
import cors from "cors";
import resumeParserRoute from "./Routes/resumeRoute.js";

const app = express();

// Middleware
app.use(cors({origin:'*'}));
app.use(express.json());

// Routes
app.use("/api", resumeParserRoute);
//http://localhost:3000/api

export {app}