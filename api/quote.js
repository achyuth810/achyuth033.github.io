export default async function handler(req, res) {
  // 1. Safety Check: Ensure the API Key exists
  const API_KEY = process.env.GEMINI_API_KEY;
  
  if (!API_KEY) {
    console.error("CRITICAL: GEMINI_API_KEY is missing from Environment Variables.");
    return res.status(500).json({ error: "Server configuration error." });
  }

  // 2. Use the stable v1 endpoint and the specific model name
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: "Write ONE short poetic romantic sentence about the moon and love." }]
        }],
        // Optional: Adding generationConfig makes the AI more consistent
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 100,
        }
      })
    });

    // 3. Check for HTTP errors (404, 429, 500) before parsing JSON
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to reach Gemini");
    }

    const data = await response.json();

    // 4. Robust Data Extraction
    // We check every level of the object so it doesn't crash if Gemini sends an empty response
    const quote = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!quote) {
      throw new Error("Empty response from AI");
    }

    // 5. Success Response
    res.status(200).json({ quote });

  } catch (err) {
    // 6. Detailed Logging for you, but a clean "Fallback" for the user
    console.error("Request failed:", err.message);

    res.status(200).json({ 
      quote: "The moon whispers secrets only the heart can hear.", // A nice fallback
      isFallback: true 
    });
  }
}