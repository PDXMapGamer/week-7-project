import { useEffect, useState } from "react";
import "./PostCommentsPage.css";
export default function PostCommentPage() {
  const [charList, setCharList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [formValues, setFormValues] = useState({
    character: "",
    game: "",
    rating: "",
    comment: "",
  });

  function handleInputChange(event) {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }
  useEffect(() => {
    try {
      async function fetchTable() {
        // Due to complexity of each query to get table, it is necessary to seperate them into 3 end points.
        const fetchedData = await fetch(`http://localhost:8080/get-character-game-lists`, {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "https://week-4-project-cxss.onrender.com",
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
  function handleSubmit(event) {
    event.preventDefault();
    console.log(formValues);
    const valid = formValidation();
    if (valid) {
      // todo code for if valid
    } else {
      //todo tell user that something is invalid
    }
  }
  function formValidation() {
    // TODO form validation logic (too complex for html) here
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
