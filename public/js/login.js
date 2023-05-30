const signupSwitchBtn = document.getElementById("signup-switch");
const loginSwitchBtn = document.getElementById("login-switch");

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

// Handler function to switch between login and sign up forms in login page
const formSwitch = (event) => {
  event.preventDefault();
  signupForm.classList.toggle("visually-hidden");
  loginForm.classList.toggle("visually-hidden");
};

signupSwitchBtn.addEventListener("click", formSwitch);
loginSwitchBtn.addEventListener("click", formSwitch);

// Login form handler
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-pwd").value.trim();

  try {
    // POST request to login controller
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");  // If logged in succesfully, forward user to their dashboard
    } else {
      alert("Failed to log in");
    }
  } catch (error) {
    console.log(error);
    alert("Error logging in");
  }
});

// Sign up form handler
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-pwd").value.trim();

  try {
    // POST request to create user controller
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("dashboard"); // If user created successfully, forward user to their dashboard
    } else {
      alert("Failed to sign up");
    }
  } catch (error) {
    console.log(error);
    alert("Error signing up");
  }
});
