import axios from "axios";
import { AIRequest } from "@/api-lib/ai.types";

export const ai = async ({
  messages,
  model,
  anthropicOptions = { apiKey: "", version: "" },
}: AIRequest) => {
  console.log("System prompt: ", anthropicOptions.systemPrompt);
  try {
    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        system: anthropicOptions.systemPrompt,
        model: model,
        max_tokens: 1024,
        messages,
      },
      {
        headers: {
          "x-api-key": anthropicOptions.apiKey,
          "anthropic-version": anthropicOptions.version,
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (e) {
    console.error("Error calling OpenAI API:", e);
    throw e;
  }
};
