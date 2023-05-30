const userId = parseInt(
  document
    .querySelector(".container[data-user-id]")
    .getAttribute("data-user-id")
);
const newPostBtn = document.getElementById("new-post");
const closeBtn = document.querySelector(".btn-close");
const posts = document.querySelectorAll("#dashboard-posts > .card");
const createPostBtn = document.getElementById("create-post");
const updatePostBtn = document.getElementById("update-post");
const deletePostBtn = document.getElementById("delete-post");

const newPostBtnHandler = (event) => {
  event.preventDefault();

  newPostBtn.classList.toggle("visually-hidden");
  document
    .getElementById("dashboard-posts")
    .classList.toggle("visually-hidden");
  document.getElementById("form-post").classList.toggle("visually-hidden");

  document.querySelector("#form-post .card-title").textContent =
    "Create New Post";

  document.getElementById("form-post").setAttribute("data-post-id", "");

  document.getElementById("post-title").value = "";
  document.getElementById("post-content").value = "";

  createPostBtn.classList.remove("visually-hidden");
  updatePostBtn.classList.add("visually-hidden");
  deletePostBtn.classList.add("visually-hidden");
};

newPostBtn.addEventListener("click", newPostBtnHandler);
closeBtn.addEventListener("click", newPostBtnHandler);

posts.forEach((post) => {
  post.addEventListener("click", (event) => {
    newPostBtn.classList.toggle("visually-hidden");
    document
      .getElementById("dashboard-posts")
      .classList.toggle("visually-hidden");

    document.getElementById("form-post").classList.toggle("visually-hidden");

    const postObject = JSON.parse(
      event.currentTarget.getAttribute("data-post")
    );

    document
      .getElementById("form-post")
      .setAttribute("data-post-id", postObject.id);

    document.querySelector("#form-post .card-title").textContent = "Edit Post";

    document.getElementById("post-title").value = postObject.title;
    document.getElementById("post-content").value = postObject.content;

    createPostBtn.classList.add("visually-hidden");
    updatePostBtn.classList.remove("visually-hidden");
    deletePostBtn.classList.remove("visually-hidden");
  });
});

createPostBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();

  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        userId,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create post");
    }
  } catch (error) {
    console.log(error);
    alert("Error creating post");
  }
});

updatePostBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const postId = parseInt(
    document.getElementById("form-post").getAttribute("data-post-id")
  );

  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();

  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to delete post");
    }
  } catch (error) {
    console.log(error);
    alert("Error deleting post");
  }
});

deletePostBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const postId = parseInt(
    document.getElementById("form-post").getAttribute("data-post-id")
  );

  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to delete post");
    }
  } catch (error) {
    console.log(error);
    alert("Error deleting post");
  }
});
