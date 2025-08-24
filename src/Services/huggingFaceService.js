import fetch from "node-fetch";

export const analyzeWithHF = async (text) => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/dslim/bert-base-NER",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    }
  );

  if (!response.ok) {
    throw new Error("Hugging Face API error");
  }

  return response.json();
};
