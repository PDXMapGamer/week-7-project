import { Link } from "react-router-dom";
import "./NavBar.css";
export default function NavBar() {
  return (
    <header>
      <nav>
        <Link to="/">Homepage</Link>
        <Link to="/tables">View Tables</Link>
      </nav>
    </header>
  );
}
