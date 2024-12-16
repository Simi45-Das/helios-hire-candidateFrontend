// Function to get userID from localStorage
function getUserIDFromLocalStorage() {
  return localStorage.getItem("userID"); // Adjust the key as needed
}

// Function to fetch user name based on userID
async function fetchUserName(userID) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/auth/get-names-by-userid?userID=${userID}`
    );
    const data = await response.json();

    if (response.ok) {
      return data.data.name; // Return the user's name
    } else {
      console.error("Error fetching user name:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Network error:", error);
    return null;
  }
}

// Update the DOM with the user's name
async function updateProfileName() {
  const userID = getUserIDFromLocalStorage();

  if (userID) {
    const userName = await fetchUserName(userID);
    if (userName) {
      document.querySelector("h1.text-4xl").textContent = userName;
    } else {
      console.error("Failed to update profile name");
    }
  } else {
    console.error("User ID not found in localStorage");
  }
}

// Execute the function to update the profile name on page load
document.addEventListener("DOMContentLoaded", updateProfileName);
