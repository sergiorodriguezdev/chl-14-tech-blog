const newCommentBtn = document.getElementById("new-comment");
const closeBtn = document.querySelector(".btn-close");

const newCommentBtnHandler = (event) => {
  event.preventDefault();

  const containers = document.querySelectorAll(".container");
  containers.forEach((container) => {
    container.classList.toggle("visually-hidden");
  });
};

newCommentBtn.addEventListener("click", newCommentBtnHandler);
closeBtn.addEventListener("click", newCommentBtnHandler);

const formComment = document.getElementById("form-comment");

formComment.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const content = document.getElementById("text-comment").value.trim();
    const postId = parseInt(formComment.getAttribute("data-post-id"));
    const userId = parseInt(formComment.getAttribute("data-user-id"));

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
      document.location.reload();
    } else {
      alert("Failed to post comment");
    }
  } catch (error) {
    console.log(error);
    alert("Error posting comment");
  }
});
