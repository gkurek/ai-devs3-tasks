<script setup lang="ts">
import { ref } from "vue";
import { getData, sendData } from "./api.ts";

const data = ref<string[]>([]);

const fetchData = async () => {
  const result = await getData();
  data.value = result ?? [];
  console.log(data.value);
};

const submitData = async () => {
  const result = await sendData(data.value);
  console.log(result);
};
</script>

<template>
  <div class="main">
    <nav>
      <router-link to="/s01e01">0101</router-link> |
      <router-link to="/s01e02">0102</router-link> |
      <router-link to="/s01e03">0103</router-link> |
      <router-link to="/s01e04">0104</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
.main {
  display: flex;
  flex-direction: column;
}
</style>
