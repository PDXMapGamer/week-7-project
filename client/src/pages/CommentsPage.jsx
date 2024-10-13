import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import "./CommentsPage.css";
import ViewCommentsHeader from "../components/ViewCommentsHeader";

export default function CommentsPage() {
  const { username } = useParams();
  const [dbEntries, setDbEntries] = useState([]);
  useEffect(() => {
    try {
      async function fetchTable() {
        // Due to complexity of each query to get table, it is necessary to seperate them into 3 end points.
        const fetchedData = await fetch(`https://week-7-project-server-npv2.onrender.com/get-comments`, {
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
    <section className="seven-columns">
      <ViewCommentsHeader />
      {dbEntries.map((element) =>
        element.map((entry) => (
          <Fragment key={entry.id}>
            <h2>{entry.user_name}</h2>
            <h2>{entry.character_name}</h2>
            <h2>{entry.game_acronym}</h2>
            <h2>{entry.comment}</h2>
            <h2>{entry.rating}</h2>
            <h2>{entry.likes}</h2>
            {username == entry.user_name ? (
              <>
                <DeleteButton postId={entry.id} />
              </>
            ) : (
              <LikeButton postId={entry.id} />
            )}
          </Fragment>
        ))
      )}
    </section>
  );
}
