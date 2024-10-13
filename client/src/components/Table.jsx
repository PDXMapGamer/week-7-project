import GamesTable from "./GamesTable";
import CharactersTable from "./CharactersTable";
import CommentTable from "./CommentTable";
export default function Table(props) {
  switch (props.formValue) {
    case "games":
      return <GamesTable />;
    case "characters":
      //todo characters page
      return <CharactersTable />;
    case "comments":
      //todo comments page
      return <CommentTable />;
    default:
      return null;
  }
}
