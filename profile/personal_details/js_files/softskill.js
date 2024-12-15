document
  .getElementById("submitSoftSkillsForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("userID"); // Get userId from localStorage
    if (!userId) {
      alert("User ID not found in localStorage. Please log in.");
      return;
    }

    const communication = document.querySelector(
      'input[name="communication"]:checked'
    )?.value;
    const teamwork = document.querySelector(
      'input[name="teamwork"]:checked'
    )?.value;
    const leadership = document.querySelector(
      'input[name="leadership"]:checked'
    )?.value;

    if (!communication || !teamwork || !leadership) {
      alert("Please select a rating for all skills.");
      return;
    }

    const payload = {
      userId,
      communication,
      teamwork,
      leadership,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/softskill/submit-soft-skills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(`Failed to submit soft skills: ${error.message}`);
    }
  });
