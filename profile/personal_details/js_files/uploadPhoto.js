document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("photos");
  const chooseButton = document.getElementById("choose-button");
  const photoPreviewContainer = document.getElementById("photo-preview");
  const uploadButton = document.getElementById("upload-button");

  let selectedFile = null; // Store the single selected file

  const updatePhotoPreview = () => {
    photoPreviewContainer.innerHTML = ""; // Clear previous previews
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement("img");
        img.src = event.target.result;
        img.alt = selectedFile.name;
        img.classList.add(
          "w-32",
          "h-32",
          "object-cover",
          "rounded-lg",
          "border",
          "shadow",
          "m-2"
        );

        const wrapper = document.createElement("div");
        wrapper.classList.add("relative", "inline-block");

        const removeButton = document.createElement("button");
        removeButton.innerHTML = "×";
        removeButton.classList.add(
          "absolute",
          "top-1",
          "right-1",
          "bg-red-500",
          "text-white",
          "rounded-full",
          "w-6",
          "h-6",
          "flex",
          "items-center",
          "justify-center",
          "cursor-pointer"
        );
        removeButton.addEventListener("click", () => removeFile());

        wrapper.appendChild(img);
        wrapper.appendChild(removeButton);
        photoPreviewContainer.appendChild(wrapper);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeFile = () => {
    selectedFile = null; // Remove the file
    updatePhotoPreview(); // Update preview
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return payload.userID;
  };

  chooseButton.addEventListener("click", () => {
    fileInput.click(); // Trigger file input
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      selectedFile = fileInput.files[0]; // Store only the first selected file
      updatePhotoPreview(); // Update preview
    }
    fileInput.value = ""; // Clear input for new selection
  });

  uploadButton.addEventListener("click", async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authenticated. Please log in again.");
      return;
    }


    const formData = new FormData();
    formData.append("photos", selectedFile);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/upload/uploadImages",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Photo uploaded successfully!");
        selectedFile = null;
        updatePhotoPreview();
      } else {
        alert(`Failed to upload photo: ${result.message}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading the photo.");
    }
  });
});
