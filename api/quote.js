export default async function handler(req, res) {

  const API_KEY = process.env.GEMINI_API_KEY;

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: "Write ONE short poetic romantic sentence about moon and love."
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    console.log("Gemini response:", data);

    const quote =
      data?.candidates?.[0]?.content?.parts?.[0]?.text
      ?? "Moonlight carries silent love between hearts.";

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ quote });

  } catch (error) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      quote: "Moonlight carries silent love between hearts."
    });

  }
}