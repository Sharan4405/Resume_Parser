import axios from "axios";

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || "http://localhost:11434";

/**
 * Sends extracted resume text to the Ollama model and gets structured JSON response.
 * @param {string} resumeText - The extracted text from the resume
 * @returns {Object} - Structured resume data (name, education, skills, experience, contact)
 */
export const parseResumeWithOllama = async (resumeText) => {
  try {
    const prompt = `Extract the following information from this resume and return ONLY a valid JSON object with no extra text:

Resume Text:
${resumeText}

Return JSON in this exact structure:
{
  "name": "full name",
  "email": "email address",
  "phone": "phone number",
  "education": [
    {
      "qualification": "degree name",
      "institution": "school/university name",
      "year": "graduation year or duration"
    }
  ],
  "skills": ["skill1", "skill2", "skill3"],
  "experience": [
    {
      "title": "job title or role",
      "company": "company/organization name",
      "duration": "time period",
      "description": "brief description"
    }
  ]
}`;

    // Using gpt-oss:120b-cloud model from your local Ollama installation
    const response = await axios.post(`${OLLAMA_API_URL}/api/generate`, {
      model: "gpt-oss:120b-cloud", // Your installed model
      prompt: prompt,
      stream: false,
      format: "json"
    });

    // Parse the response
    const generatedText = response.data.response?.trim();

    // Attempt JSON parsing
    let parsedData;
    try {
      parsedData = JSON.parse(generatedText);
    } catch {
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) parsedData = JSON.parse(jsonMatch[0]);
      else throw new Error("No valid JSON found in Ollama output");
    }

    return parsedData;

  } catch (error) {
    console.error("🛑 Ollama API Error:", error.response?.data || error.message);
    throw new Error(`Ollama parsing failed: ${error.message}`);
  }
};

/**
 * Check if Ollama is running and accessible
 * @returns {boolean} - True if Ollama is accessible
 */
export const checkOllamaHealth = async () => {
  try {
    const response = await axios.get(`${OLLAMA_API_URL}/api/tags`);
    return response.status === 200;
  } catch (error) {
    console.error("⚠️ Ollama health check failed:", error.message);
    return false;
  }
};
