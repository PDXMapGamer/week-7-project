import { useEffect, useState } from "react";
export default function TablePage() {
  const [formValue, setFormValue] = useState("");
  const [dbEntries, setDbEntries] = useState([]);
  useEffect(() => {
    try {
      async function fetchTable() {
        // Due to complexity of each query to get table, it is necessary to seperate them into 3 end points.
        const fetchedData = await fetch(`http://localhost:8080/get-${formValue}`, {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "https://week-4-project-cxss.onrender.com",
            "Content-type": "application/json",
          },
        });
        const parsedData = await fetchedData.json();
        const wrangledData = parsedData.rows;
        setDbEntries([wrangledData]);
      }
      fetchTable();
    } catch (error) {
      console.log("There has been an error getting the table", error);
    }
  }, [formValue]);
  function handleSubmit(event) {
    event.preventDefault();
  }
  function handleFormValueChange(event) {
    setFormValue(event.target.value);
  }
  return (
    <>
      <form id="table-form" onSubmit={handleSubmit}>
        <label htmlFor="table">Select table to view: </label>
        <select name="table-list" id="table" value={formValue} onChange={handleFormValueChange}>
          <option value="">Select Table</option>
          <option value="games">Games</option>
          <option value="characters">Characters</option>
          <option value="comments">Comments</option>
        </select>
        <button type="submit">View Table</button>
      </form>
      {dbEntries.map((wrangledData) => {
        wrangledData;
        //!TODO finish later
      })}
    </>
  );
}
