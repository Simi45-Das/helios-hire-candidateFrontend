document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Fetch userId from localStorage
    const userId = localStorage.getItem("userID");
    if (!userId) {
      alert("User ID not found in localStorage. Please log in.");
      return;
    }

    // Initialize graduation and postGraduation arrays
    const graduation = [];
    const postGraduation = [];

    // Parse Graduation Qualifications
    document
      .querySelectorAll("#gradContainer .form-section")
      .forEach((section) => {
        const degree = section.querySelector('input[name$="[degree]"]').value;
        const institution = section.querySelector(
          'input[name$="[institution]"]'
        ).value;
        const year = section.querySelector('input[name$="[year]"]').value;

        if (degree && institution && year) {
          graduation.push({ degree, institution, year });
        }
      });

    // Parse Post-Graduation Qualifications
    document
      .querySelectorAll("#postGradContainer .form-section")
      .forEach((section) => {
        const degree = section.querySelector('input[name$="[degree]"]').value;
        const institution = section.querySelector(
          'input[name$="[institution]"]'
        ).value;
        const year = section.querySelector('input[name$="[year]"]').value;

        if (degree && institution && year) {
          postGraduation.push({ degree, institution, year });
        }
      });

    // Check if at least one qualification is added
    if (graduation.length === 0 && postGraduation.length === 0) {
      alert("Please provide at least one qualification.");
      return;
    }

    try {
      // Sending data to the server
      const response = await fetch(
        "http://localhost:5000/api/qualification/postqualifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, graduation, postGraduation }), // Send graduation and postGraduation separately
        }
      );

      // Handle server response
      const result = await response.json();
      if (response.ok) {
        alert("Qualifications submitted successfully!");
        console.log("Server Response:", result);
        form.reset(); // Reset the form after successful submission
      } else {
        alert(`Error: ${result.message || "Failed to submit qualifications"}`);
        console.error("Server Error:", result);
      }
    } catch (error) {
      alert("An error occurred while submitting the qualifications.");
      console.error("Network Error:", error);
    }
  });
});
