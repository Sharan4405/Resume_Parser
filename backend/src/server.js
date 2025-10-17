import dotenv from "dotenv";
import {app} from "./app.js"
dotenv.config({
  path: '.env'
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
