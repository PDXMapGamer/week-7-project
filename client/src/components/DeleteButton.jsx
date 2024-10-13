export default function DeleteButton(props) {
  function handleClick() {
    try {
      fetch(`https://week-7-project-server-npv2.onrender.com/delete-post/${props.postId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting post", error);
    }
    console.log(`Delete button clicked for post ${props.postId}`);
  }
  return <button onClick={handleClick}>Delete!</button>;
}
