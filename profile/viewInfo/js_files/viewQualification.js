document.addEventListener("DOMContentLoaded", () => {
  // Fetch userId from localStorage
  const userId = localStorage.getItem("userID");
  if (!userId) {
    alert("User ID not found in localStorage. Please log in.");
    return;
  }

  // Fetch qualifications from the server
  async function fetchQualifications() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/qualification/viewqualifications?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        displayQualifications(result);
      } else {
        document.getElementById(
          "qualificationDetails"
        ).innerHTML = `<p class="text-red-500">${
          result.message || "Failed to load qualifications"
        }</p>`;
      }
    } catch (error) {
      console.error("Error fetching qualifications:", error);
      document.getElementById(
        "qualificationDetails"
      ).innerHTML = `<p class="text-red-500">An error occurred while fetching qualifications.</p>`;
    }
  }

  // Function to display qualifications
  function displayQualifications(data) {
    const qualificationContainer = document.getElementById(
      "qualificationDetails"
    );

    if (!data.graduation && !data.postGraduation) {
      qualificationContainer.innerHTML =
        "<p class='text-gray-700'>No qualifications found for this user.</p>";
      return;
    }

    let qualificationsHTML =
      "<h2 class='text-2xl font-medium text-gray-700 mb-4'>Graduation</h2>";
    if (data.graduation && data.graduation.length > 0) {
      data.graduation.forEach((grad) => {
        qualificationsHTML += `
          <div class="mb-4">
            <p class="font-semibold text-gray-700">Degree: ${grad.degree}</p>
            <p class="text-gray-600">Institution: ${grad.institution}</p>
            <p class="text-gray-600">Year: ${grad.year}</p>
          </div>
        `;
      });
    }

    qualificationsHTML +=
      "<h2 class='text-2xl font-medium text-gray-700 mb-4'>Post-Graduation</h2>";
    if (data.postGraduation && data.postGraduation.length > 0) {
      data.postGraduation.forEach((postGrad) => {
        qualificationsHTML += `
          <div class="mb-4">
            <p class="font-semibold text-gray-700">Degree: ${postGrad.degree}</p>
            <p class="text-gray-600">Institution: ${postGrad.institution}</p>
            <p class="text-gray-600">Year: ${postGrad.year}</p>
          </div>
        `;
      });
    }

    qualificationContainer.innerHTML = qualificationsHTML;
  }

  // Fetch qualifications on page load
  fetchQualifications();
});
