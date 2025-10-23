export const fetchImageFromOpenRouter = async (placeName) => {
  const prompt = `Give me a single **direct image URL** (no HTML, no markdown) that best represents "${placeName}" tourist location. 
  Prefer realistic images, not logos or maps.`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // or any other open model
        messages: [
          { role: "system", content: "You are a helpful image search assistant." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    const result = data?.choices?.[0]?.message?.content?.trim();

    // validate if it’s a URL
    if (result && result.startsWith("http")) return result;

    // fallback if invalid
    return "https://via.placeholder.com/800x400?text=No+Image";
  } catch (error) {
    console.error("Error fetching image from OpenRouter:", error);
    return "https://via.placeholder.com/800x400?text=Error+Loading+Image";
  }
};
