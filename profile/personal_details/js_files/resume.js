document.getElementById("upload-button").addEventListener("click", function () {
  const fileInput = document.getElementById("resumeUpload");
  const userId = localStorage.getItem("userId"); // Get userId from localStorage
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  // Upload the file to Google Drive using fetch
  fetch("http://localhost:5000/api/resume/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json()) // Parse JSON response
    .then((data) => {
      const fileLink = data.fileLink;
      document.getElementById(
        "resume-file-name"
      ).textContent = `File uploaded: ${fileLink}`;
      document
        .getElementById("resume-file-name")
        .classList.remove("text-red-500");
      document
        .getElementById("resume-file-name")
        .classList.add("text-green-600");

      // Enable the submit button once the file is uploaded
      document.querySelector('button[type="submit"]').disabled = false;
    })
    .catch((error) => {
      console.error("Error uploading file: ", error);
      alert("Failed to upload the file.");
    });
});

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const userId = localStorage.getItem("userId");
  const fileLink = document
    .getElementById("resume-file-name")
    .textContent.replace("File uploaded: ", "");

  // Submit the file link and user ID to the backend using fetch
  fetch("http://localhost:5000/api/resume/submitResume", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, fileLink }), // Sending data as JSON
  })
    .then((response) => response.json()) // Parse JSON response
    .then((data) => {
      alert("Resume submitted successfully.");
    })
    .catch((error) => {
      console.error("Error submitting resume: ", error);
      alert("Failed to submit resume.");
    });
});
