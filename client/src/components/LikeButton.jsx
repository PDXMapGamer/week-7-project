export default function LikeButton(props) {
  function handleClick() {
    try {
      fetch(`https://week-7-project-server-npv2.onrender.com/update-likes/${props.postId}`, {
        method: "PUT",
      });
    } catch (error) {
      console.error("Error updating likes", error);
    }
    console.log(`Like button clicked for post ${props.postId}`);
  }
  return <button onClick={handleClick}>Like</button>;
}
