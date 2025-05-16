// === SIGN-UP FORM ===
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("signupMessage");

    // ✅ All fields are required
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
      message.textContent = "All fields are required.";
      message.style.color = "red";
      return;
    }

    // ✅ Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.textContent = "Invalid email format.";
      message.style.color = "red";
      return;
    }

    // ✅ Password must contain special character
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
      message.textContent = "Password must contain at least one special character.";
      message.style.color = "red";
      return;
    }

    // ✅ Passwords must match
    if (password !== confirmPassword) {
      message.textContent = "Passwords do not match.";
      message.style.color = "red";
      return;
    }

    // ✅ Store in localStorage
    const userData = {
      firstName,
      lastName,
      email,
      username,
      password
    };

    localStorage.setItem(username, JSON.stringify(userData));
    message.textContent = "Sign-up successful! You can now log in.";
    message.style.color = "green";
    signupForm.reset();
  });
}

// === LOGIN FORM ===
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    const storedUser = localStorage.getItem(username);
    if (!storedUser) {
      message.textContent = "User not found!";
      message.style.color = "red";
      return;
    }

    const userData = JSON.parse(storedUser);
    if (userData.password !== password) {
      message.textContent = "Incorrect password!";
      message.style.color = "red";
      return;
    }

    message.textContent = `Welcome, ${userData.firstName}!`;
    message.style.color = "green";
    loginForm.reset();
  });
}

