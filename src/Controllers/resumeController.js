import fs from "fs";
import { extractText } from "../services/fileService.js";
import { analyzeWithHF } from "../services/hfService.js";

export const parseResume = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Step 1: Extract text
    const extractedText = await extractText(file);

    // Step 2: Hugging Face NER
    const hfResult = await analyzeWithHF(extractedText);

    // Step 3: Delete file after processing
    fs.unlinkSync(file.path);

    // Step 4: Respond (raw output for now)
    res.json({
      text: extractedText.slice(0, 500),
      ner: hfResult
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
