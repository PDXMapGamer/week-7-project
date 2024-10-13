import { useParams, Outlet, Link } from "react-router-dom";

export default function UsersPage() {
  let { username } = useParams();
  return (
    <section>
      <h2>User: {username}</h2>
      <Link to={`/users/${username}/comments`}>View Comments</Link>
      <Link to={`/users/${username}/post-comment`}>Post Comment</Link>
      <Link to={`/users/${username}/likes`}>View your likes</Link>
      <Outlet />
    </section>
  );
}
