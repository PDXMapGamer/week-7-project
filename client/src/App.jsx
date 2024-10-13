import "./App.css";
import UsersPage from "./pages/UsersPage";
import NavBar from "./components/NavBar";
import CommentsPage from "./pages/CommentsPage";
import HomePage from "./pages/HomePage";
import PostCommentPage from "./pages/PostCommentPage";
import TablePage from "./pages/TablePage";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import LikesPage from "./pages/LikesPage";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tables" element={<TablePage />} />
        <Route path="/users/:username" element={<UsersPage />}>
          <Route path="comments" element={<CommentsPage />} />
          <Route path="post-comment" element={<PostCommentPage />} />
          <Route path="likes" element={<LikesPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
