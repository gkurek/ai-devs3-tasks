import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export function useOpenAI() {
  const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || "";
  const openai = new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true,
  });

  const callOpenAI = async (
    messages: ChatCompletionMessageParam[],
    model = "gpt-3.5-turbo"
  ) => {
    const response = await openai.chat.completions.create({
      model,
      messages,
      max_tokens: 50,
    });

    console.log(response);
    return response.choices[0].message.content || "";
  };

  return {
    callOpenAI,
  };
}
