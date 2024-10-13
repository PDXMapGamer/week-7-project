import { useEffect, useState } from "react";
import "./GamesTable.css";
export default function GamesTable() {
  const [dbEntries, setDbEntries] = useState([]);
  useEffect(() => {
    try {
      async function fetchTable() {
        // Due to complexity of each query to get table, it is necessary to seperate them into 3 end points.
        const fetchedData = await fetch(`https://week-7-project-server-npv2.onrender.com/get-games`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        const parsedData = await fetchedData.json();
        setDbEntries([parsedData]);
      }
      fetchTable();
    } catch (error) {
      console.log("There has been an error getting the table", error);
    }
  }, []);
  return (
    <section>
      <div className="two-columns">
        <h2>Game Name:</h2>
        <h2>Game Acronym:</h2>
      </div>
      {dbEntries.map((element) =>
        element.map((entry) => (
          <div className="two-columns" key={entry.game_name}>
            <h2>{entry.game_name}</h2>
            <h2>{entry.game_acronym}</h2>
          </div>
        ))
      )}
    </section>
  );
}
