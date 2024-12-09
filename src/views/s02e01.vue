<script setup lang="ts">
import { ref } from "vue";
import OpenAI from "openai";
import { useSendReport } from "@/composables/useSendReport";
import createPrompt from "@/prompts/s02e01";
import { useOpenAI } from "@/composables/useOpenAI";

const audioFiles = ref<File[]>([]);
const transcriptionText = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const progress = ref({ current: 0, total: 0 });
const result = ref("");
const flag = ref("");

const { sendReport } = useSendReport();
const { callOpenAI } = useOpenAI();

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    audioFiles.value = Array.from(target.files);
    errorMessage.value = "";
  }
};

const transcribeAudio = async () => {
  if (!audioFiles.value.length) {
    errorMessage.value = "Please select audio files first";
    return;
  }

  try {
    isLoading.value = true;
    errorMessage.value = "";
    transcriptionText.value = "";
    progress.value = { current: 0, total: audioFiles.value.length };

    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const allTranscriptions: string[] = [];

    for (const file of audioFiles.value) {
      progress.value.current++;

      const transcription = await openai.audio.transcriptions.create({
        file: file,
        model: "whisper-1",
      });

      allTranscriptions.push(`File: ${file.name}\n${transcription.text}\n\n`);
    }

    transcriptionText.value = allTranscriptions.join("---\n");

    // Save to file
    const blob = new Blob([transcriptionText.value], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transcription-${Date.now()}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "An error occurred during transcription";
  } finally {
    isLoading.value = false;
    progress.value = { current: 0, total: 0 };
  }
};

const sendAnswer = async () => {
  result.value = await callOpenAI(
    [{ role: "user", content: createPrompt(transcriptionText.value) }],
    "gpt-4o"
  );

  const data = await sendReport("mp3", result.value);
  flag.value = data.message;
};
</script>

<template>
  <div class="container">
    <h1>Audio Transcription</h1>

    <div class="upload-section">
      <input
        type="file"
        accept="audio/*"
        @change="handleFileUpload"
        class="file-input"
        multiple
      />
      <div class="file-list" v-if="audioFiles.length">
        <h3>Selected Files:</h3>
        <ul>
          <li v-for="file in audioFiles" :key="file.name">
            {{ file.name }}
          </li>
        </ul>
      </div>
      <button
        @click="transcribeAudio"
        :disabled="!audioFiles.length || isLoading"
        class="transcribe-btn"
      >
        <span v-if="isLoading">
          Transcribing... ({{ progress.current }}/{{ progress.total }})
        </span>
        <span v-else>
          Transcribe {{ audioFiles.length }} Audio File{{
            audioFiles.length !== 1 ? "s" : ""
          }}
        </span>
      </button>
      <button @click="sendAnswer">Send Answer</button>
    </div>

    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>

    <div v-if="transcriptionText" class="transcription">
      <h2>Transcription Result:</h2>
      <p style="white-space: pre-line">{{ transcriptionText }}</p>
    </div>

    <p>{{ flag }}</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.upload-section {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.file-input {
  margin-bottom: 10px;
}

.transcribe-btn {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.transcribe-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error {
  color: red;
  margin: 10px 0;
}

.transcription {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.file-list {
  margin: 10px 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.file-list ul {
  list-style: none;
  padding: 0;
  margin: 5px 0;
}

.file-list li {
  padding: 3px 0;
}
</style>
