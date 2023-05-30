const newCommentBtn = document.getElementById("new-comment");
const closeBtn = document.querySelector(".btn-close");

// New Comment button handler
const newCommentBtnHandler = (event) => {
  event.preventDefault();

  const containers = document.querySelectorAll(".container");
  // Hide/Unhide containers
  containers.forEach((container) => {
    container.classList.toggle("visually-hidden");
  });
};

newCommentBtn.addEventListener("click", newCommentBtnHandler);
closeBtn.addEventListener("click", newCommentBtnHandler);

const formComment = document.getElementById("form-comment");

// New Comment form submit handler
formComment.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const content = document.getElementById("text-comment").value.trim();
    const postId = parseInt(formComment.getAttribute("data-post-id"));
    const userId = parseInt(formComment.getAttribute("data-user-id"));

    // POST request to comments controller
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        content,
        postId,
        userId,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload(); // If comment added successfully, reload post's page to render all comments including the new one
    } else {
      alert("Failed to post comment");
    }
  } catch (error) {
    console.log(error);
    alert("Error posting comment");
  }
});
