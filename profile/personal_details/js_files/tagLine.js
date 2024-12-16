


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("tagline-form");

  // Ensure only one listener is attached
  form.removeEventListener("submit", handleFormSubmit);
  form.addEventListener("submit", handleFormSubmit);
});

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission

  // Reference to the submit button
  const submitButton = event.target.querySelector('button[type="submit"]');

  // Disable submit button to prevent double submissions
  submitButton.disabled = true;

  // Get tagline from textarea
  const tagline = document.getElementById("tagline").value;

  // Get user ID from localStorage
  const userID = localStorage.getItem("userID");

  // Simple validation
  if (!tagline || !userID) {
    alert("Please provide both your tagline and user ID.");
    submitButton.disabled = false; // Re-enable the button if validation fails
    return;
  }

  // Prepare the data to send
  const data = {
    tagline: tagline,
    userID: userID,
  };

  // Send the data to the backend using fetch API
  fetch("http://localhost:5000/api/taglines/submittagline", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Tagline submitted successfully!");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    })
    .finally(() => {
      submitButton.disabled = false; // Re-enable the button after the request completes
    });
}
