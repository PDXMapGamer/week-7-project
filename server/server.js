import express, { query } from "express";
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
app.get("/get-characters", async (request, response) => {
  try {
    const query = await db.query(`SELECT character_name, ARRAY_AGG(games.game_acronym) as games
FROM characters
JOIN character_game ON characters.id = character_game.character_id
JOIN games ON character_game.game_id = games.id
GROUP BY characters.id;`);
    response.status(200).json(query.rows);
  } catch (error) {
    console.error("Error getting games table", error);
  }
});

app.get("/get-comments", async (request, response) => {
  try {
    const query =
      await db.query(`SELECT posts.id, user_name, character_name, game_acronym, comment, rating, likes FROM posts
JOIN users ON posts.user_id = users.id
JOIN character_game ON posts.character_id = character_game.character_id AND posts.game_id = character_game.game_id
JOIN games ON character_game.game_id = games.id
JOIN characters on character_game.character_id = characters.id`);
    response.status(200).json(query.rows);
  } catch (error) {
    console.error("There has been an error getting comments", error);
  }
});

app.get("/get-character-game-lists", async (request, response) => {
  // Used to only use one get fetch request instead of 2 when user wants to post comment
  try {
    const charList = await db.query(`SELECT character_name FROM characters;`);
    const gameList = await db.query(`SELECT game_acronym FROM games;`);
    response.status(200).json({ charlist: charList.rows, gamelist: gameList.rows });
  } catch (error) {
    console.error("There was an error accessing the database", error);
    response.status(500).json({ success: false });
  }
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

app.post("/post-comment", async (request, response) => {
  try {
    const username = request.body.formValues.username;
    const userID = await db.query(`SELECT id FROM users WHERE user_name = $1;`, [username]);
    //Need to parse the fetched data into a usable form
    const UserIDObj = await userID.rows;
    const parsedUserID = UserIDObj[0].id;
    const game = request.body.formValues.game;
    const gameID = await db.query(`SELECT id FROM games WHERE game_acronym = $1;`, [game]);
    const gameIDObj = await gameID.rows;
    const parsedgameID = gameIDObj[0].id;
    const character = request.body.formValues.character;
    const characterID = await db.query(`SELECT id FROM characters WHERE character_name = $1;`, [character]);
    const characterIDObj = await characterID.rows;
    const parsedcharacterID = characterIDObj[0].id;
    const comment = request.body.formValues.comment;
    const rating = request.body.formValues.rating;
    db.query(`INSERT INTO posts(user_id, character_id, game_id, comment, rating) VALUES($1, $2, $3, $4, $5);`, [
      parsedUserID,
      parsedcharacterID,
      parsedgameID,
      comment,
      rating,
    ]);
    response.status(200).json({
      message: "Added comment to the database.",
    });
  } catch (error) {
    console.error("Error in post-comment endpoint", error);
  }
});
// TODO get, post, put, delete endpoints.
app.put("/update-likes/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const likes = await db.query(`SELECT likes FROM posts WHERE id = $1;`, [id]);
    const newLikes = parseInt(likes.rows[0].likes) + 1;
    db.query(`UPDATE posts SET likes = $1 WHERE id = $2`, [newLikes, id]);
    response.status(200).json({ message: "placeholder" });
  } catch (error) {
    console.error("Error updating likes", error);
    response.status(500).json({ success: false });
  }
});

app.delete("/delete-post/:id", async (request, respones) => {
  try {
    const { id } = request.params;
    await db.query(`DELETE FROM posts WHERE id = $1`, [id]);
    respones.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post", error);
    respones.status(500).json({ success: false });
  }
});
