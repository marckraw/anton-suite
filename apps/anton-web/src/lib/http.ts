import axios from "axios";
import { ConversationMessages } from "@/api-lib/ai.types";

// localhost
const baseAppUrl =
  process.env.NEXT_PUBLIC_BASE_APP_URL || "https://localhost:3000";
const baseApiUrl = "api";
const baseApiRequestURL = `${baseAppUrl}/${baseApiUrl}`;

export const ai = async ({ messages }: { messages: ConversationMessages }) => {
  try {
    const url = `${baseApiRequestURL}/protected/chat`;

    console.log("Url we are making request to: ")
    console.log(url)
    const response = await axios.post(
      url,
      {
        messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_ANTON_WEB_API_KEY}`
        },
      },
    );

    return response;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};
