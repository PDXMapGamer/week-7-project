import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
// TODO set up packages
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const dbConnectionString = process.env.DATABASE_URL;
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App listening at PORT ${PORT}`);
});

app.get("/", (request, response) => {
  response.json({ message: "You are currently at the root route" });
});

// TODO get, post, put, delete endpoints.
