import { useState } from "react";
import { Link } from "react-router-dom";
export default function HomePage() {
  // TODO we need state to save the form values
  const [userName, setUserName] = useState("");
  // TODO we need to track the changes in the form input
  //! we do not need useEffect
  // TODO submit handler
  async function handleSubmit(event) {
    event.preventDefault();
    //TODO fetch POST endpoint
    try {
      const response = await fetch("http://localhost:8080/usernames_submitted", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
        }),
      });
      console.log(await response.json());
    } catch (error) {
      console.error("Error sending data to the database", error);
    }
    //TODO fetch: send method, body to the endpoint, and headers ("Content-Type": "application/json")
  }
  function handleInputChange(event) {
    setUserName(event.target.value);
  }
  return (
    <>
      {/* Stretch goal: Refactor to use components with passing the states seemlessly between them */}

      <section id="form-section">
        <h1>Form</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your username (max 20 characters)"
            required
            value={userName}
            onChange={handleInputChange}
            maxLength={20}
          />
          <button type="submit">Send to Database</button>
        </form>
        <Link to={`/users/${userName}`}>Link to {userName}&apos;s profile</Link>
        <p>(Note: make sure to submit to database)</p>
      </section>
    </>
  );
}
