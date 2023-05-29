const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log out");
    }
  } catch (error) {
    console.log(error);
    alert("Error logging out");
  }
});
