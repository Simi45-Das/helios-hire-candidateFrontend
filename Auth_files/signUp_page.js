document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phoneNumber = document.getElementById("phnnumbr").value;
  const whatsappNumber = document.getElementById("whats_nbr").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Check if phone number is exactly 10 digits
  if (!/^\d{10}$/.test(phoneNumber)) {
    alert("Phone number must be exactly 10 digits.");
    return; // Exit the function if the phone number is invalid
  }

  // Check if WhatsApp number is exactly 10 digits
  if (!/^\d{10}$/.test(whatsappNumber)) {
    alert("WhatsApp number must be exactly 10 digits.");
    return; // Exit the function if the WhatsApp number is invalid
  }

  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      phoneNumber,
      whatsappNumber,
      email,
      password,
    }),
  });

  const data = await response.json();

  // Check if registration was successful
  if (response.ok) {
    alert("Successfully registered!"); // Alert on success

    // Clear the form fields
    document.getElementById("signup-form").reset();

    // Show success message and hide form
    document.getElementById("success-message").classList.remove("hidden");
    document.getElementById("signup-form").classList.add("hidden");

    // Optionally redirect to another page after a delay
    setTimeout(() => {
      window.location.href = "../Auth_files/loginPage.html";
    }, 3000);
  } else if (data.msg === "User already exists") {
    alert("Already registered."); // Specific alert for already registered
  } else {
    alert(data.msg || "Registration failed."); // Alert on error with general message
  }

  console.log(data);
});
