import express from "express";
import cors from "cors";
import events from "./routes/record.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", events);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});