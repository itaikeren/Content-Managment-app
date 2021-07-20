const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to DB
connectDB();

// Init middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use("/pages", require("./routes/pages"));
app.use("/tr", require("./routes/textResources"));

app.use((error, req, res, next) => {
  return res.status(500).json({ errors: [{ msg: error.toString() }] });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is online on port ${PORT}`);
});
