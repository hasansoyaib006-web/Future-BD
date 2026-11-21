
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { Pool } = require("pg");

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || false
}));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/", (req, res) => {
  res.json({
    name: "Future BD",
    status: "Backend running",
    version: "1.0.0"
  });
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "Database connected" });
  } catch (error) {
    res.status(500).json({
      error: "Database connection failed"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Future BD running on port ${PORT}`);
});
