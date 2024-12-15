// Automatically fetch and display soft skills when the page loads
document.addEventListener("DOMContentLoaded", fetchSoftSkills);

// Function to fetch and display soft skills from the backend
async function fetchSoftSkills() {
  // Get userId from localStorage
  const userId = localStorage.getItem("userID");

  // Check if userId exists in localStorage
  if (!userId) {
    alert("User ID not found in localStorage. Please log in.");
    return;
  }

  try {
    // Send a GET request to the backend with the userId
    const response = await fetch(
      `http://localhost:5000/api/softskill/get-soft-skills?userId=${userId}`
    );

    // Parse the JSON response
    const data = await response.json();

    if (response.ok) {
      // Update the HTML to display the fetched data
      document.getElementById("displaySoftSkills").innerHTML = `
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">Your Soft Skills:</h2>
          <p class="text-gray-800"><strong>Communication:</strong> ${data.communication}</p>
          <p class="text-gray-800"><strong>Teamwork:</strong> ${data.teamwork}</p>
          <p class="text-gray-800"><strong>Leadership:</strong> ${data.leadership}</p>
        </div>
      `;
    } else {
      // Handle errors returned from the server
      document.getElementById("displaySoftSkills").innerHTML = `
        <div class="bg-red-100 text-red-600 p-4 rounded-lg">
          <p>Error: ${data.error}</p>
        </div>
      `;
    }
  } catch (error) {
    // Handle client-side or network errors
    document.getElementById("displaySoftSkills").innerHTML = `
      <div class="bg-red-100 text-red-600 p-4 rounded-lg">
        <p>Failed to fetch soft skills: ${error.message}</p>
      </div>
    `;
  }
}
