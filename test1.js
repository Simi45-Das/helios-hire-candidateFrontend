async function loginUser(event) {
  event.preventDefault();

  const userID = document.getElementById("userID").value;
  const password = document.getElementById("password").value;

  if (!userID || !password) {
    alert("Please enter your User ID and password.");
    return;
  }

  const loginData = { userID, password };

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const result = await response.json();
      alert("Login successful!");

      localStorage.setItem("token", result.token);

      window.location.href = "../homePage/html_files/homePage.html";
    } else {
      const errorData = await response.json();
      alert(`Login failed: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login.Please try again");
  }
}

document.getElementById("login-form")?.addEventListener("submit", loginUser);
