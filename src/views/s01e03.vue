<script setup lang="ts">
import { ref } from "vue";
import { useOpenAI } from "./useOpenAI";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { useSendReport } from "@/computables/useSendReport";

type TestData = {
  question: string;
  answer: number;
  test?: {
    q: string;
    a: string | number;
  };
};

type Data = {
  apikey: string;
  description: string;
  copyright: string;
  "test-data": TestData[];
};

const KEY = import.meta.env.VITE_PERSONAL_API_KEY;
const flag = ref<string>("");
const { callOpenAI } = useOpenAI();
const { sendReport } = useSendReport();

const constructPrompt = (question: string): ChatCompletionMessageParam[] => {
  return [
    {
      role: "system",
      content: `Answer in 1 word`,
    },
    { role: "user", content: question },
  ];
};

const addStringsAsNumbers = (item: TestData) => {
  const numbers = item.question.split(" ");
  const num1 = parseInt(numbers[0]);
  const num2 = parseInt(numbers[2]);
  item.answer = num1 + num2;
};

const start = async () => {
  try {
    const response = await fetch(`/api/centrala/data/${KEY}/json.txt`, {
      method: "GET",
    });

    const file: Data = await response.json();
    const processedData: Data = {
      ...file,
      apikey: KEY,
      "test-data": await Promise.all(
        file["test-data"].map(async (item: TestData) => {
          addStringsAsNumbers(item);
          if (item.test) {
            const answer = await callOpenAI(
              constructPrompt(item.test.q),
              "gpt-4"
            );
            item.test.a = answer;
          }
          return item;
        })
      ),
    };

    const { message } = await sendReport("JSON", processedData);
    flag.value = message;
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>

<template>
  <div>
    <button @click="start">start3</button>
    <div>{{ flag }}</div>
  </div>
</template>
