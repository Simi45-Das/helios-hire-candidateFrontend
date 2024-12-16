// const url =
//   "https://drive.google.com/uc?export=download&id=16zWr6O_SfXXYGdBUTljknuLaJrH16KiK"; // Link to your PDF file


const url = "../test/Simi_ResumeN.pdf";

// Load the PDF.js library
const pdfjsLib = window["pdfjsLib"];

// Set the worker source (ensure this is set correctly)
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.17.569/pdf.worker.min.js";

// Get the canvas element and context
const canvas = document.getElementById("pdf-render");
const ctx = canvas.getContext("2d");

// Render the PDF
pdfjsLib
  .getDocument(url)
  .promise.then((pdfDoc) => {
    // Load the first page
    pdfDoc.getPage(1).then((page) => {
      const viewport = page.getViewport({ scale: 1.5 }); // Adjust the scale for zoom
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Render the page onto the canvas
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };
      page.render(renderContext);
    });
  })
  .catch((error) => {
    console.error("Error loading PDF:", error);
  });
