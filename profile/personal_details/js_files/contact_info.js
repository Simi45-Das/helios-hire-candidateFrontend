document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const userId = localStorage.getItem("userID");

  if (!userId) {
    alert("User not logged in. Please log in to proceed.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const address = document.getElementById("address").value;

    const data = {
      userId,
      email,
      phone,
      whatsapp,
      address,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/contactInfo/postInfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Contact information saved successfully");
        console.log(result);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Error submitting the form:", err);
    }
  });
});
