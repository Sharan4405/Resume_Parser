import { extractText } from "../Services/fileService.js";
import { parseResumeWithOllama } from "../Services/ollamaService.js";

export const parseResume = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Step 1: Extract text from uploaded file (from memory buffer)
    const extractedText = await extractText(file);

    // Step 2: Send text to Ollama and get structured JSON
    const resumeJson = await parseResumeWithOllama(extractedText);

    // Step 3: Respond with structured resume JSON
    // No need to delete file - it's in memory and will be garbage collected
    res.json(resumeJson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
