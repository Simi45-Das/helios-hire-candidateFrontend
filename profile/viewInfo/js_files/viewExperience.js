document.getElementById("fetchData").addEventListener("click", async () => {
  const userId = localStorage.getItem("userID"); // Retrieve userId from localStorage
  const experienceDataContainer = document.getElementById("experienceData");

  if (!userId) {
    alert("No User ID found in localStorage. Please log in.");
    return;
  }

  experienceDataContainer.innerHTML = "<p>Loading...</p>"; // Show loading message

  try {
    // Send GET request to your updated API endpoint
    const response = await fetch(
      `http://localhost:5000/api/experience/viewExperience?userId=${userId}`
    );
    const data = await response.json();

    if (response.ok) {
      experienceDataContainer.innerHTML = ""; // Clear loading message
      if (data.length > 0) {
        data.forEach((exp) => {
          const experienceElement = document.createElement("div");
          experienceElement.classList.add(
            "bg-white",
            "p-4",
            "rounded-md",
            "shadow-lg",
            "mb-4"
          );

          experienceElement.innerHTML = `
            <h2 class="text-xl font-semibold">Experience</h2>
            <p><strong>Experience:</strong> ${exp.experience}</p>
          `;
          experienceDataContainer.appendChild(experienceElement);
        });
      } else {
        experienceDataContainer.innerHTML =
          "<p>No experience data found for this user.</p>";
      }
    } else {
      experienceDataContainer.innerHTML = `<p>Error: ${
        data.error || "Failed to fetch experience."
      }</p>`;
    }
  } catch (error) {
    experienceDataContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});
