<script setup lang="ts">
import FirecrawlApp from "@mendable/firecrawl-js";
import { ref } from "vue";

const url = `https://xyz.ag3nts.org/`;
const apiKey = import.meta.env.VITE_FIRECRAWL_API_KEY || "";
console.log("apiKey:", apiKey);

const firecrawlApp = new FirecrawlApp({ apiKey });

const scrapeResult = ref<string>("");
const elementId = "human-question";

const scrapePromises = async () => {
  try {
    const result = await firecrawlApp.scrapeUrl(url, {
      formats: ["rawHtml"],
    });

    if (result && "rawHtml" in result && result.rawHtml) {
      console.log("scrapeResult:", result);
      const parser = new DOMParser();
      const doc = parser.parseFromString(result.rawHtml, "text/html");
      const element = doc.getElementById(elementId);
      if (element) {
        scrapeResult.value = element.textContent || "";
        console.log("Extracted text:", scrapeResult.value);
      } else {
        console.warn(`Element with ID ${elementId} not found`);
      }
    } else {
      console.warn(`No rawHtml content found for URL: ${url}`);
    }
  } catch (error) {
    console.error(`Error scraping URL ${url}:`, error);
  }
};
</script>

<template>
  <div>
    <h1>s01e01</h1>
    <button @click="scrapePromises">scrape</button>
    <div v-if="scrapeResult">{{ scrapeResult }}</div>
  </div>
</template>

<style scoped>
/* Your styles here */
</style>
