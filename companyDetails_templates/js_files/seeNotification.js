const getNotificationDetails = async () => {
  // const companyId = localStorage.getItem("companyId"); // Get companyId from localStorage
  //i need to add header and need to take companyId from url parameters
  const urlParams = new URLSearchParams(window.location.search);
  const companyId = urlParams.get("companyId");


  if (!companyId) {
    console.error("Company ID is required");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5001/api/v1/notifications/get-notification-by-company-id?companyId=${companyId}`,
      {
        method: "GET",
        headers: {
          "Authorization-Type": "candidate",
        },
      }
    );

    // Handle HTTP errors (e.g., 404, 500)
    if (!response.ok) {
      if (response.status === 404) {
        console.error("No notifications found for this company.");
      } else {
        console.error("Failed to fetch notifications");
      }
      throw new Error("Error fetching notifications");
    }

    const data = await response.json();
    console.log("Notifications:", data);

    // Find the container where notifications should be displayed
    const notificationsContainer = document.getElementById("notifications");

    if (data && data.length > 0) {
      // Clear the current loading message
      notificationsContainer.innerHTML = "";

      // Loop through the notifications and display them
      data.forEach((notification) => {
        const notificationElement = document.createElement("div");
        notificationElement.classList.add(
          "bg-gray-100",
          "shadow-sm",
          "rounded-lg",
          "p-4",
          "mb-4",
          "fade-in"
        );

        notificationElement.innerHTML = `
                    <h2 class="text-2xl font-semibold text-blue-600">${
                      notification.notificationTitle
                    }</h2>
                    <p class="text-lg text-gray-800 mt-2">${
                      notification.notificationText
                    }</p>
                    <p class="text-sm text-gray-500 mt-4">${
                      notification.notificationDate
                    } at ${notification.notificationTime}</p>
                    ${
                      notification.pdfUrl
                        ? `<a href="${notification.pdfUrl}" target="_blank" class="text-blue-500 mt-4 inline-block">View PDF</a>`
                        : ""
                    }
                `;

        // Append the notification to the container
        notificationsContainer.appendChild(notificationElement);
      });
    } else {
      // If no notifications, display a message
      notificationsContainer.innerHTML = `
                <div class="flex justify-center items-center py-10">
                    <p class="text-lg font-medium text-gray-600">No notifications found.</p>
                </div>
            `;
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    const notificationsContainer = document.getElementById("notifications");
    notificationsContainer.innerHTML = `
            <div class="flex justify-center items-center py-10">
                <p class="text-lg font-medium text-red-600">Error fetching notifications.</p>
            </div>
        `;
  }
};

// Call the function to load the notifications
getNotificationDetails();
