import "./App.css";
import NavBar from "./components/NavBar";
import CommentsPage from "./pages/CommentsPage";
import HomePage from "./pages/HomePage";
import PostCommentPage from "./pages/PostCommentPage";
import TablePage from "./pages/TablePage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tables" element={<TablePage />} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route path="/post-comment" element={<PostCommentPage />} />
      </Routes>
    </>
  );
}

export default App;
