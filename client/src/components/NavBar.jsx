import { Link } from "react-router-dom";
import "./NavBar.css";
export default function NavBar() {
  return (
    <header>
      <nav>
        <Link to="/">Homepage</Link>
        <Link to="/tables">View Tables</Link>
        <Link to="/comments">View Comments</Link>
        <Link to="/post-comment">Post Comment</Link>
      </nav>
    </header>
  );
}
