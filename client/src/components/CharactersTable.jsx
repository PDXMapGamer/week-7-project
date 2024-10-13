import { Fragment, useEffect, useState } from "react";

export default function CharactersTable() {
  const [dbEntries, setDbEntries] = useState([]);
  useEffect(() => {
    try {
      async function fetchTable() {
        // Due to complexity of each query to get table, it is necessary to seperate them into 3 end points.
        const fetchedData = await fetch(`http://localhost:8080/get-characters`, {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "https://week-4-project-cxss.onrender.com",
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
        <h2>Character: </h2>
        <h2>Games: </h2>
      </div>
      {dbEntries.map((element) =>
        element.map((entry) => (
          <div className="two-columns" key={entry.character_name}>
            <h2>{entry.character_name}</h2>
            <h2>
              {entry.games.map((game) => (
                <Fragment key={game}>{game}, </Fragment>
              ))}
            </h2>
          </div>
        ))
      )}
    </section>
  );
}
