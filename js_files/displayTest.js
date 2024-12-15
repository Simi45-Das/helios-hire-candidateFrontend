// Function to load test content based on the test type
function loadTestContent(testType) {
  const testContent = document.getElementById("test-content");
  testContent.innerHTML = ""; // Clear existing content

  if (testType === "mcq") {
    testContent.className = "mcq-only";
    testContent.innerHTML = `
            <div class="test-item">
                <p>Question 1</p>
                <input type="radio" name="q1" value="a"> Option A<br>
                <input type="radio" name="q1" value="b"> Option B<br>
                <input type="radio" name="q1" value="c"> Option C<br>
                <input type="radio" name="q1" value="d"> Option D<br>
            </div>
        `;
  } else if (testType === "descriptive") {
    testContent.className = "descriptive-only";
    testContent.innerHTML = `
            <div class="test-item">
                <p>Describe your experience.</p>
                <textarea></textarea>
            </div>
        `;
  } else if (testType === "mixed") {
    testContent.className = "mixed";
    testContent.innerHTML = `
            <div class="test-item">
                <p>Question 1</p>
                <input type="radio" name="q1" value="a"> Option A<br>
                <input type="radio" name="q1" value="b"> Option B<br>
                <input type="radio" name="q1" value="c"> Option C<br>
                <input type="radio" name="q1" value="d"> Option D<br>
            </div>
            <div class="test-item">
                <p>Describe your experience.</p>
                <textarea></textarea>
            </div>
        `;
  }
}

// Function to access the webcam
function accessWebcam() {
  return navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      document.getElementById("webcam").srcObject = stream;
      return true; // Webcam access granted
    })
    .catch((err) => {
      console.error("Error accessing webcam:", err);
      return false; // Webcam access denied
    });
}

// Function to start the countdown timer
function startTimer(duration) {
  const timerDisplay = document.getElementById("time");
  let time = duration * 60; // Convert minutes to seconds

  function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    if (time > 0) {
      time--;
      setTimeout(updateTimer, 1000);
    } else {
      alert("Time is up!");
      // Optionally, disable test input or handle test submission here
    }
  }

  updateTimer();
}

// Initialize the test
window.onload = function () {
  // Example test type; this should be replaced with actual logic
  const testType = "mixed"; // Change this value to 'mcq', 'descriptive', or 'mixed'
  loadTestContent(testType);

  accessWebcam().then((hasAccess) => {
    if (hasAccess) {
      // Start the timer with a duration of 30 minutes (change as needed)
      startTimer(30);

      // Handle submit button click
      document
        .getElementById("submit-btn")
        .addEventListener("click", function () {
          // Handle test submission here
          alert("Test submitted!");
        });
    } else {
      // Show a message and disable test elements
      document.querySelector(".container").innerHTML = `
                <p>Webcam access is required to take the test. Please allow webcam access and reload the page.</p>
            `;
    }
  });
};
