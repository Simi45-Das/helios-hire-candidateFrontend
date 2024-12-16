document.addEventListener("DOMContentLoaded", () => {
  const loadingIndicator = document.getElementById("loading");
  const personalInfoSection = document.getElementById("personal-info");
  const errorMessage = document.getElementById("error-message");
  const errorText = document.getElementById("error-text");

  const firstNameEl = document.getElementById("firstName");
  const lastNameEl = document.getElementById("lastName");
  const dobEl = document.getElementById("dob");
  const genderEl = document.getElementById("gender");

  const authToken = localStorage.getItem("token");
  const userID = localStorage.getItem("userID");

  if (!authToken || !userID) {
    alert("Authentication token or User ID not found. Please log in again.");
    window.location.href = "login.html"; // Redirect to login page
    return;
  }

  async function fetchPersonalInfo() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/personalInfo/getUser?userId=${encodeURIComponent(
          userID
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": authToken,
          },
        }
      );
      const data = await response.json();
      console.log("Response Data:", data); // Debugging

      if (response.ok) {
        firstNameEl.textContent = data.firstName || "N/A";
        lastNameEl.textContent = data.lastName || "N/A";
        dobEl.textContent = data.dob
          ? new Date(data.dob).toLocaleDateString()
          : "N/A";
        genderEl.textContent = data.gender || "N/A";

        personalInfoSection.classList.remove("hidden");
      } else {
        errorText.textContent =
          data.message || "Failed to fetch personal information.";
        errorMessage.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Error fetching personal information:", error);
      errorText.textContent =
        "An error occurred while fetching your information. Please try again later.";
      errorMessage.classList.remove("hidden");
    } finally {
      loadingIndicator.classList.add("hidden");
    }
  }

  fetchPersonalInfo();
});
