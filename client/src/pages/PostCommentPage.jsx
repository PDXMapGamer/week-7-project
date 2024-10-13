import { useEffect, useState } from "react";
import "./PostCommentsPage.css";
import { useParams } from "react-router-dom";
export default function PostCommentPage() {
  const { username } = useParams();
  const [charList, setCharList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [formValues, setFormValues] = useState({
    character: "",
    game: "",
    rating: "",
    comment: "",
    username: username,
  });

  function handleInputChange(event) {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }
  useEffect(() => {
    try {
      async function fetchTable() {
        // Due to complexity of each query to get table, it is necessary to seperate them into 3 end points.
        const fetchedData = await fetch(`https://week-7-project-server-npv2.onrender.com/get-character-game-lists`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        const parsedData = await fetchedData.json();
        setCharList([parsedData.charlist]);
        setGameList([parsedData.gamelist]);
      }
      fetchTable();
    } catch (error) {
      console.log("There has been an error getting the table", error);
    }
  }, []);
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formValues);
    const valid = formValidation();
    if (valid) {
      try {
        const response = await fetch("https://week-7-project-server-npv2.onrender.com/post-comment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formValues,
          }),
        });
        console.log(await response.json());
      } catch (error) {
        console.error("Error sending data to the database", error);
      }
      //TODO fetch: send method, body to the endpoint, and headers ("Content-Type": "application/json")
    } else {
      //todo tell user that something is invalid
    }
  }
  function formValidation() {
    // TODO stretch goal form validation logic (too complex for html) here. AKA make sure users can ONLY submit characters/game combinations that are acceptable.
    // TODO Can use the characters + acronym query to check over all games a character is in
    return true;
  }

  return (
    <section>
      <h1>Post Comment form:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="character">Character:</label>
        <select name="character" value={formValues.character} onChange={handleInputChange} required>
          <option value="">--</option>
          {charList.map((element) =>
            element.map((entry) => (
              <option key={entry.character_name} value={entry.character_name}>
                {entry.character_name}
              </option>
            ))
          )}
        </select>
        <label htmlFor="game">Game:</label>
        <select name="game" value={formValues.game} onChange={handleInputChange} required>
          <option value="">--</option>
          {gameList.map((element) =>
            element.map((entry) => (
              <option key={entry.game_acronym} value={entry.game_acronym}>
                {entry.game_acronym}
              </option>
            ))
          )}
        </select>
        <label htmlFor="rating">Star Rating</label>
        <select name="rating" value={formValues.rating} onChange={handleInputChange} required>
          <option value="">--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit" id="comment-submit-button">
          Submit
        </button>
        <br />
        <label htmlFor="comment">Comment</label>
        <textarea name="comment" id="comment-box" value={formValues.comment} onChange={handleInputChange} required />
      </form>
    </section>
  );
}
