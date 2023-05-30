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

// New Post button handler
const newPostBtnHandler = (event) => {
  event.preventDefault();

  // Hide/Unhide elements
  newPostBtn.classList.toggle("visually-hidden");
  document
    .getElementById("dashboard-posts")
    .classList.toggle("visually-hidden");
  document.getElementById("form-post").classList.toggle("visually-hidden");

  // Set title
  document.querySelector("#form-post .card-title").textContent =
    "Create New Post";

  // Clear form input fields
  document.getElementById("form-post").setAttribute("data-post-id", "");
  document.getElementById("post-title").value = "";
  document.getElementById("post-content").value = "";

  // Hide/Unhide buttons
  createPostBtn.classList.remove("visually-hidden");
  updatePostBtn.classList.add("visually-hidden");
  deletePostBtn.classList.add("visually-hidden");
};

newPostBtn.addEventListener("click", newPostBtnHandler);
closeBtn.addEventListener("click", newPostBtnHandler);

// Add click handlers to each post in dashboard page
posts.forEach((post) => {
  post.addEventListener("click", (event) => {
    // Hide/Unhide elements
    newPostBtn.classList.toggle("visually-hidden");
    document
      .getElementById("dashboard-posts")
      .classList.toggle("visually-hidden");

    document.getElementById("form-post").classList.toggle("visually-hidden");

    // Retrieve post's data as JSON object
    const postObject = JSON.parse(
      event.currentTarget.getAttribute("data-post")
    );

    // Add post's ID to data-* attribute
    document
      .getElementById("form-post")
      .setAttribute("data-post-id", postObject.id);

    // Set title
    document.querySelector("#form-post .card-title").textContent = "Edit Post";

    // Populate form input fields
    document.getElementById("post-title").value = postObject.title;
    document.getElementById("post-content").value = postObject.content;

  // Hide/Unhide buttons
    createPostBtn.classList.add("visually-hidden");
    updatePostBtn.classList.remove("visually-hidden");
    deletePostBtn.classList.remove("visually-hidden");
  });
});

// Create button handler
createPostBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  // Retrieve values from form input fields
  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();

  try {
    // POST request to create post controller
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
      document.location.reload(); // If post created successfully, reload dashboard page
    } else {
      alert("Failed to create post");
    }
  } catch (error) {
    console.log(error);
    alert("Error creating post");
  }
});

// Update Post button handler
updatePostBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  // Retrieve values from form input fields
  const postId = parseInt(
    document.getElementById("form-post").getAttribute("data-post-id")
  );

  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();

  try {
    // POST request to update post controller
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload(); // If post updated successfully, reload dashboard page
    } else {
      alert("Failed to delete post");
    }
  } catch (error) {
    console.log(error);
    alert("Error deleting post");
  }
});

// Delete Post button handler
deletePostBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  // Retrieve post ID from data-* attribute
  const postId = parseInt(
    document.getElementById("form-post").getAttribute("data-post-id")
  );

  try {
    // POST request to delete post controller
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload(); // If post deleted successfully, reload dashboard page
    } else {
      alert("Failed to delete post");
    }
  } catch (error) {
    console.log(error);
    alert("Error deleting post");
  }
});
