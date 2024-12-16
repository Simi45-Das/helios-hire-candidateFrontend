const fetchImages = async () => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  if (!token) {
    console.error("JWT token is not available in localStorage.");
    document.getElementById("resume-content").innerHTML =
      '<p class="error-message">You are not authorized. Please log in.</p>';
    return;
  }

  try {
    // Fetch image URLs from backend
    const response = await fetch(`http://localhost:5000/api/resume/getpdfs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data);

    // Assuming the API response contains a key `urls` with the PDF link
    if (data.urls) {
      const pdfUrl = data.urls; // Extract the PDF URL from response
      console.log("PDF URL:", pdfUrl);

      // Update the button's click behavior dynamically
      const button = document.getElementById("resume-button");
      button.addEventListener("click", function () {
        window.location.href = pdfUrl; // Redirect to the received PDF URL
      });
    } else {
      throw new Error("No URLs found in the response.");
    }
  } catch (error) {
    console.error("Error fetching the PDF URLs:", error);
    const container = document.getElementById("resume-content");
    container.innerHTML = `<p class="error-message">Error: ${error.message}</p>`;
  }
};

// Utility function to parse JWT token
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return null;
  }
}

// Call the fetchImages function on page load
document.addEventListener("DOMContentLoaded", fetchImages);
