import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import mammoth from "mammoth";

export const extractText = async (file) => {
  let text = "";

  // With memory storage, file.buffer contains the file data
  if (!file.buffer) {
    throw new Error("No file buffer found");
  }

  if (file.mimetype === "application/pdf") {
    // Convert Buffer to Uint8Array for pdfjs-dist
    const uint8Array = new Uint8Array(file.buffer);
    
    // Extract text from PDF using pdfjs-dist
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdfDocument = await loadingTask.promise;
    
    const textParts = [];
    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      textParts.push(pageText);
    }
    text = textParts.join('\n');
  } else if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    text = result.value;
  } else if (file.mimetype === "text/plain") {
    text = file.buffer.toString("utf-8");
  } else {
    throw new Error("Unsupported file type: " + file.mimetype);
  }

  return text;
};
