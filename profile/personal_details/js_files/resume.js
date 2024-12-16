document.getElementById("upload-button").addEventListener("click", function () {
  const fileInput = document.getElementById("resumeUpload");
  const token = localStorage.getItem("token"); // Get userId from localStorage
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  
  const formData = new FormData();
  formData.append("file", file);

  // Upload the file to Google Drive using fetch
  fetch("http://localhost:5000/api/resume/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => response.json()) // Parse JSON response
    .then((data) => {
      // const fileLink = data.fileLink;
      // document.getElementById(
      //   "resume-file-name"
      // ).textContent = `File uploaded: ${fileLink}`;
      // document
      //   .getElementById("resume-file-name")
      //   .classList.remove("text-red-500");
      // document
      //   .getElementById("resume-file-name")
      //   .classList.add("text-green-600");

      alert("File uploaded successfully");

      // Enable the submit button once the file is uploaded
      // document.querySelector('button[type="submit"]').disabled = false;
    })
    .catch((error) => {
      console.error("Error uploading file: ", error);
      alert("Failed to upload the file.");
    });
});

// document.querySelector("form").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const token = localStorage.getItem("token");
//   console.log(token)
//   const fileLink = document
//     .getElementById("resume-file-name")
//     .textContent.replace("File uploaded: ", "");

//   // Submit the file link and user ID to the backend using fetch
//   fetch("http://localhost:5000/api/resume/submitResume", {
//     method: "POST",
//     headers: {
//        Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ fileLink }), // Sending data as JSON
//   })
//     .then((response) => response.json()) // Parse JSON response
//     .then((data) => {
//       alert("Resume submitted successfully.");
//     })
//     .catch((error) => {
//       console.error("Error submitting resume: ", error);
//       alert("Failed to submit resume.");
//     });
// });
