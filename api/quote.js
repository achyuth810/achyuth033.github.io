export default async function handler(req, res) {
  console.log("API KEY START:", process.env.GEMINI_API_KEY?.slice(0,5));

  const API_KEY = process.env.GEMINI_API_KEY;

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

  try {

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
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

    console.log(data);

    const quote =
      data?.candidates?.[0]?.content?.parts?.[0]?.text
      || "Fallback quote";

    res.status(200).json({ quote });

  } catch (err) {

    console.error(err);

    res.status(200).json({ quote: "Fallback quote" });

  }
}