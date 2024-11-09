<script setup lang="ts">
import FirecrawlApp from "@mendable/firecrawl-js";
import OpenAI from "openai";
import { ref } from "vue";

const url = `https://xyz.ag3nts.org/`;
const apiKey = import.meta.env.VITE_FIRECRAWL_API_KEY || "";
const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || "";

const firecrawlApp = new FirecrawlApp({ apiKey });
const question = ref<string>("");
const answer = ref<string>("");

const openai = new OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true,
});

const scrapePromises = async () => {
  try {
    const response = await firecrawlApp.scrapeUrl(url, {
      formats: ["rawHtml"],
    });

    if ("rawHtml" in response) {
      const parser = new DOMParser();
      const element = parser
        .parseFromString(response.rawHtml || "", "text/html")
        .getElementById("human-question");
      question.value =
        element?.textContent?.replace("Question:", "").trim() || "";
    }
  } catch (error) {
    console.error(error);
  }
};

const sendMessageToOpenAI = async (): Promise<void> => {
  const formData = new URLSearchParams();
  formData.append("username", "tester");
  formData.append("password", "574e112a");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. You will be asked a question. Give only numeric answer. Only year or no answers are allowed.",
        },
        { role: "user", content: question.value },
      ],
      max_tokens: 25,
    });
    console.log(response.choices[0].message.content);
    answer.value = response.choices[0].message.content || "";
    formData.append("answer", response.choices[0].message.content || "");
    console.log("Formularz:", formData);
    console.log("Formularz:", formData.toString());

    const submitResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });
    if (!submitResponse.ok) {
      throw new Error("Błąd podczas wysyłania formularza");
    }

    const submitResult = await submitResponse.text();
    console.log("Wynik wysłania formularza:", submitResult);
  } catch (error) {
    console.error(error);
  }
};

const logToPortal = async () => {
  const formData = new URLSearchParams();
  formData.append("username", "tester");
  formData.append("password", "574e112a");
  formData.append("answer", "1234");

  try {
    const response = await fetch("https://xyz.ag3nts.org/", {
      method: "POST",
      body: formData,
      mode: "no-cors", // Add this line
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(response);
  } catch (error) {
    console.error("Error posting form data:", error);
  }
};
</script>

<template>
  <div>
    <h1>s01e01</h1>
    <button @click="scrapePromises">scrape</button>
    <button @click="sendMessageToOpenAI">llm</button>
    <button @click="logToPortal">login</button>
    <div v-if="question">{{ question }}</div>
    <div v-if="answer">{{ answer }}</div>
  </div>
</template>
