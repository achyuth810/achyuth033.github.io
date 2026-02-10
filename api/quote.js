export default async function handler(req, res) {
    // This pulls your key from Vercel's secret settings
    const API_KEY = process.env.GEMINI_API_KEY; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: "Write a unique, short, poetic one-sentence quote about the moon and love. Do not use hashtags." }] 
          }]
        })
      });
      
      const data = await response.json();
      // Path to the text in Gemini's response
      const quote = data.candidates[0].content.parts[0].text;
      
      res.status(200).json({ quote });
    } catch (error) {
      res.status(500).json({ quote: "The moon remains a silent witness to our thoughts." });
    }
  }