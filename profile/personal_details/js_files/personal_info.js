document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("userID");
    if (!userId) {
      alert("User ID not found in localStorage!");
      return;
    }

    const formData = {
      userId,
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      dob: document.getElementById("dob").value,
      gender: document.getElementById("gender").value,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/personalInfo/saveUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  });
});
