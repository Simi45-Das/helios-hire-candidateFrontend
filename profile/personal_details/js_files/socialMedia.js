document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = document.querySelector("button[type='submit']");

    // Fetch userId from localStorage
    const userId = localStorage.getItem("userID");

    // Handle form submission
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Collect form data
        const linkedIn = document.getElementById("linkedIn").value;
        const github = document.getElementById("github").value;
        const youtube = document.getElementById("youtube").value;
        const instagram = document.getElementById("instagram").value;
        const facebook = document.getElementById("facebook").value;
        const otherPlatform = document.getElementById("otherPlatform").value;

        // Prepare data for the POST request
        const data = {
            userId,
            linkedIn,
            github,
            youtube,
            instagram,
            facebook,
            otherPlatform,
        };

        try {
            const response = await fetch(
              "http://localhost:5000/api/mediaLinks/save-links",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while saving the data.");
        }
    });

});