import express from "express";
import cors from "cors";
import resumeParserRoute from "./Routes/resumeRoute.js";
import ratelimit from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";

const app = express();

// Middleware
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(helmet());
app.use(compression());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Rate Limiting
const limiter = ratelimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again later"
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Routes
app.use("/api", resumeParserRoute);

export {app}