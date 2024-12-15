document.addEventListener("DOMContentLoaded", async function () {
  // Extract companyId from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const companyId = urlParams.get("companyId");

  if (!companyId) {
    alert("No company ID found in the URL.");
    return;
  }

  try {
    // Fetch the job posts for the given company ID
    const response = await fetch(
      `http://localhost:5001/api/v1/job-posts/get-job-posts-by-company-id?companyId=${companyId}`,
      {
        method: "GET",
        headers: {
          "Authorization-Type": "candidate",
        },
      }
    );

    if (response.ok) {
      const jobPosts = await response.json();

      if (jobPosts.length === 0) {
        alert("No job posts found for this company.");
      }

      // Display the job posts
      const jobPostsContainer = document.getElementById("jobPostsContainer");
      jobPostsContainer.innerHTML = ""; // Clear existing posts

      jobPosts.forEach((jobPost) => {
        const jobPostElement = document.createElement("div");
        jobPostElement.classList.add(
          "bg-white",
          "p-6",
          "rounded-lg",
          "shadow-lg",
          "hover:shadow-2xl",
          "transition",
          "duration-300",
          "ease-in-out",
          "cursor-pointer",
          "border",
          "border-gray-200"
        );

        jobPostElement.innerHTML = `
          <h3 class="text-2xl font-semibold text-gray-800 mb-2">${
            jobPost.title
          }</h3>
          <div class="text-gray-600 text-sm mb-4">
            <span class="font-medium">Company:</span> ${jobPost.company}
          </div>
          
          <div class="text-gray-600 text-sm mb-4">
            <span class="font-medium">Location:</span> ${jobPost.location}
          </div>
          
          <div class="text-gray-600 text-sm mb-4">
            <span class="font-medium">Employment Type:</span> ${
              jobPost.employmentType
            }
          </div>
          
          <p class="text-gray-600 mb-4"><strong>Application Deadline:</strong> ${new Date(
            jobPost.applicationDeadline
          ).toLocaleDateString()}</p>

          <div class="flex justify-between items-center mb-4">
            <p class="text-lg font-semibold text-green-600">
              Salary: $${jobPost.salary.min} - $${jobPost.salary.max}
            </p>
            <p class="text-sm ${
              jobPost.remote ? "text-green-500" : "text-red-500"
            }">
              <strong>Remote:</strong> ${jobPost.remote ? "Yes" : "No"}
            </p>
          </div>

          <p class="text-gray-700 mb-6"><strong>Description:</strong> ${
            jobPost.description
          }</p>

          <button class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            Apply Now
          </button>
        `;

        jobPostsContainer.appendChild(jobPostElement);
      });
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching the job posts.");
  }
});
