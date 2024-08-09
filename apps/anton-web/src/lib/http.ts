import axios from "axios";
import { ConversationMessages } from "@/api-lib/ai.types";

// localhost
const baseAppUrl =
  process.env.NEXT_PUBLIC_BASE_APP_URL || "https://localhost:3000";
const baseApiUrl = "api";
const baseApiRequestURL = `${baseAppUrl}/${baseApiUrl}`;

export const ai = async ({ messages }: { messages: ConversationMessages }) => {
  try {
    const url = `${baseApiRequestURL}/ai`;
    const response = await axios.post(
      url,
      {
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};
