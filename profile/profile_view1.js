function getUserIDFromLocalStorage() {
  return localStorage.getItem("userID"); // Adjust the key as needed
}

async function fettagline(userID) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/taglines/getagline-by-userid?userID=${userID}`
    );
    const data = await response.json();

    console.log("API Response:", data);

    if (response.ok && Array.isArray(data) && data.length > 0) {
      return data[0].tagline; // Return the first tagline from the array
    } else {
      console.error(
        "Error fetching user tagline: Data structure not as expected or no taglines found"
      );
      return null;
    }
  } catch (error) {
    console.error("Network error:", error);
    return null;
  }
}

async function updatetagline() {
  const userID = getUserIDFromLocalStorage();

  if (userID) {
    const userTagline = await fettagline(userID);
    if (userTagline) {
      document.querySelector("#para1").textContent = userTagline;
    } else {
      console.error("Failed to update tagline");
    }
  } else {
    console.error("User ID not found in localStorage");
  }
}

// Execute the function to update the tagline on page load
document.addEventListener("DOMContentLoaded", updatetagline);
