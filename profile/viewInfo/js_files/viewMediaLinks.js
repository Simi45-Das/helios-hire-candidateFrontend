document.addEventListener("DOMContentLoaded", function () {
  const socialLinksContainer = document.getElementById("socialLinks");

  // Fetch userId from localStorage
  const userId = localStorage.getItem("userID");

  // Function to fetch social media links from the backend
  async function fetchLinks() {
    if (!userId) {
      alert("User ID is required");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/mediaLinks/get-links?userId=${userId}`
      );
      const result = await response.json();

      if (response.ok) {
        // Clear any loading message
        socialLinksContainer.innerHTML = "";

        // Display links
        if (result.linkedIn) {
          socialLinksContainer.innerHTML += `
            <div class="flex items-center space-x-2">
              <span class="text-blue-600">LinkedIn:</span>
              <a href="${result.linkedIn}" target="_blank" class="text-blue-500 hover:underline">${result.linkedIn}</a>
            </div>`;
        }

        if (result.github) {
          socialLinksContainer.innerHTML += `
            <div class="flex items-center space-x-2">
              <span class="text-gray-800">GitHub:</span>
              <a href="${result.github}" target="_blank" class="text-gray-600 hover:underline">${result.github}</a>
            </div>`;
        }

        if (result.youtube) {
          socialLinksContainer.innerHTML += `
            <div class="flex items-center space-x-2">
              <span class="text-red-600">YouTube:</span>
              <a href="${result.youtube}" target="_blank" class="text-red-500 hover:underline">${result.youtube}</a>
            </div>`;
        }

        if (result.instagram) {
          socialLinksContainer.innerHTML += `
            <div class="flex items-center space-x-2">
              <span class="text-pink-600">Instagram:</span>
              <a href="${result.instagram}" target="_blank" class="text-pink-500 hover:underline">${result.instagram}</a>
            </div>`;
        }

        if (result.facebook) {
          socialLinksContainer.innerHTML += `
            <div class="flex items-center space-x-2">
              <span class="text-blue-800">Facebook:</span>
              <a href="${result.facebook}" target="_blank" class="text-blue-600 hover:underline">${result.facebook}</a>
            </div>`;
        }

        if (result.otherPlatform) {
          socialLinksContainer.innerHTML += `
            <div class="flex items-center space-x-2">
              <span class="text-gray-600">Other Platform:</span>
              <a href="${result.otherPlatform}" target="_blank" class="text-gray-500 hover:underline">${result.otherPlatform}</a>
            </div>`;
        }
      } else {
        socialLinksContainer.innerHTML = `<p class="text-red-500">${result.message}</p>`;
      }
    } catch (error) {
      console.error(error);
      socialLinksContainer.innerHTML = `<p class="text-red-500">An error occurred while fetching the data.</p>`;
    }
  }

  // Fetch the social media links on page load
  fetchLinks();
});
