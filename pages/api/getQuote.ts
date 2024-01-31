const OpenAI = require("openai");

const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

export default async function getQuote(req, res) {
  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  try {
    const data = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a motivational speaker assistant.",
        },
        {
          role: "user",
          content:
            "Give me a random, short, one sentence motivational or inspirational quote from a famous figure without telling me who said it. No punctuations at beginning or end",
        },
      ],
      model: "gpt-3.5-turbo",
    });
    res.status(200).json({ result: data.choices[0].message });
  } catch (error) {
    if (error instanceof OpenAIError) {
      console.error(`OpenAI API Error: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your OpenAI API request.",
        },
      });
    } else if (typeof error === "string") {
      console.error(`Unhandled Error: ${error}`);
      res
        .status(500)
        .json({ error: { message: "An unexpected error occurred." } });
    } else {
      console.error("Unhandled error", error);
      res
        .status(500)
        .json({ error: { message: "An unexpected error occurred." } });
    }
  }
}

class OpenAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenAIError";
  }
}
