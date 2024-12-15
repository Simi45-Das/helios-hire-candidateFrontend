// Get userId from localStorage
const userId = localStorage.getItem("userID");
if (!userId) {
  console.error("No userId found in localStorage!");
}

// Submit experience
async function submitExperience() {
  const experience = document.getElementById("experience").value;
  if (!experience.trim()) {
    alert("Experience cannot be empty!");
    return;
  }

  const data = { userId, experience };

  try {
    const response = await fetch("http://localhost:5000/api/experience/postexperience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message); // Success message
      document.getElementById("experience").value = ""; // Clear input field
    } else {
      alert(result.error || "Something went wrong!"); // Error message
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to submit experience!");
  }
}

// Event listener for form submission
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload
  submitExperience();
});
