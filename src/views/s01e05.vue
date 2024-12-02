<script setup lang="ts">
import OpenAI from "openai";
import createPrompt from "@/prompts/s01e05";
import { ref } from "vue";

// Configure OpenRouter API
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

const result = ref("");
const flag = ref("");
async function fetchLlamaResponse(sentence: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: createPrompt(sentence) },
      ],
    });

    const content = response.choices[0].message.content;
    if (content) {
      console.log(content);
      result.value = content;
    }
  } catch (error) {
    console.error("Error fetching Llama response:", error);
  }
}

async function fetchSentence() {
  const key = import.meta.env.VITE_PERSONAL_API_KEY;
  const response = await fetch(`api/centrala/data/${key}/cenzura.txt`);
  const text = await response.text();
  console.log(text);
  return text;
}

async function sendAnswer(answer: string) {
  const response = await fetch("/api/centrala/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: "CENZURA",
      apikey: import.meta.env.VITE_PERSONAL_API_KEY,
      answer: answer,
    }),
  });
  return response;
}

async function start() {
  const sentence = await fetchSentence();
  await fetchLlamaResponse(sentence);
  const response = await sendAnswer(result.value);
  const data = await response.json();
  flag.value = data.message;
}
</script>

<template>
  <div>
    <button @click="start">start5</button>
    <p>{{ result }}</p>
    <p>{{ flag }}</p>
  </div>
</template>
