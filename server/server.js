import express, { request, response } from "express";
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

app.get("/get-", (request, response) => {
  console.log("Get- NOTHING!!!!");
  response.json({ message: "placeholder null" });
});

app.get("/get-games", async (request, response) => {
  try {
    const query = await db.query(`SELECT game_name, game_acronym FROM games`);
    response.status(200).json(query.rows);
  } catch (error) {
    console.error("Error getting games table", error);
  }
});

app.get("/get-characters", (request, response) => {
  console.log("Get-characters");
  response.json({ message: "placeholder char" });
});

app.get("/get-comments", (request, response) => {
  console.log("Get-comments");
  response.json({ message: "placeholder comm" });
});

app.post("/usernames_submitted", async (request, response) => {
  try {
    let inDB = false;
    const userInput = request.body.username;
    const query = await db.query(`SELECT user_name FROM users`);
    query.rows.forEach((element) => {
      if (userInput == element.user_name) {
        inDB = true;
      }
    });
    if (inDB) {
      response.status(200).json({ message: `Welcome back ${userInput}` });
    } else {
      db.query(`INSERT INTO users(user_name) VALUES ($1)`, [userInput]);
      response.status(200).json({ message: `Welcome to our site ${userInput}` });
    }
  } catch (error) {
    console.error("There has been an error in /get-usernames.", error);
    response.status(500).json({ success: false });
  }
});
// TODO get, post, put, delete endpoints.
