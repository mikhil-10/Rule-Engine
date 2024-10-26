const express = require("express");
const mongoose = require("mongoose");
const ruleRoutes = require("./routes/Routes");

const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/api/rules", ruleRoutes);

mongoose
  .connect("mongodb://localhost:27017/App1")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const PORT=5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
