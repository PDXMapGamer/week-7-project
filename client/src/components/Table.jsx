import GamesTable from "./GamesTable";
import CharactersTable from "./CharactersTable";
export default function Table(props) {
  switch (props.formValue) {
    case "games":
      return <GamesTable />;
    case "characters":
      //todo characters page
      return <CharactersTable />;
    default:
      return null;
  }
}
