import { useState } from "react";
export default function HomePage() {
  // TODO we need state to save the form values
  const [userName, setUserName] = useState("");
  // TODO we need to track the changes in the form input
  //! we do not need useEffect
  // TODO submit handler
  function handleSubmit(event) {
    event.preventDefault();
    setUserName(event.target.value);
    //TODO fetch POST endpoint
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
            placeholder="Enter your username"
            required
            value={userName}
            onChange={handleInputChange}
            maxLength={20}
          />
          <button type="submit">Log In</button>
        </form>
      </section>
    </>
  );
}
