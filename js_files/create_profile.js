document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("profile-form");

  // Function to upload files using FormData
  async function uploadFile(url, file, fileType) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload ${fileType}: ${response.statusText}`);
      }

      const data = await response.json();
      alert(`${fileType} uploaded successfully!`);
      return data;
    } catch (error) {
      alert(`Error: ${error.message}`);
      throw error;
    }
  }

  // Handle the upload button clicks
  document.querySelectorAll(".upload-button").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const fileInputId = button.getAttribute("data-file-input");
      const fileInput = document.getElementById(fileInputId);
      const fileType = button.getAttribute("data-file-type");

      // Ensure the file input has a selected file
      const selectedFile = fileInput.files[0];
      if (!selectedFile) {
        alert(`Please select a file to upload.`);
        return;
      }

      try {
        await uploadFile(
          `/upload-${fileType}`,
          selectedFile,
          fileType.charAt(0).toUpperCase() + fileType.slice(1)
        );

        // Disable the file input after uploading
        fileInput.disabled = true;
      } catch (error) {
        console.error(error);
      }
    });
  });
});
