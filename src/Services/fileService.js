import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const extractText = async (file) => {
  let text = "";

  if (file.mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(file.path);
    const data = await pdfParse(dataBuffer);
    text = data.text;
  } else if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ path: file.path });
    text = result.value;
  } else if (file.mimetype === "text/plain") {
    text = fs.readFileSync(file.path, "utf-8");
  } else {
    throw new Error("Unsupported file type: " + file.mimetype);
  }

  return text;
};
