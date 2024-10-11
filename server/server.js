import express, { response } from "express";
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

app.get("/get-usernames", async (request, response) => {
  try {
    const query = await db.query(`SELECT user_name FROM users`);
    response.status(200).json(query.rows);
  } catch {
    console.error("There has been an error in /get-usernames.", error);
    response.status(500).json({ success: false });
  }
});
// TODO get, post, put, delete endpoints.
