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
      <div>
        <router-link to="/s01e01">0101</router-link> |
        <router-link to="/s01e02">0102</router-link> |
        <router-link to="/s01e03">0103</router-link> |
        <router-link to="/s01e04">0104</router-link> |
        <router-link to="/s01e05">0105</router-link>
      </div>
      <div>
        <router-link to="/s02e01">0201</router-link> |
        <router-link to="/s02e02">0202</router-link> |
        <router-link to="/s02e03">0203</router-link> |
        <router-link to="/s02e04">0204</router-link> |
        <router-link to="/s02e05">0205</router-link>
      </div>
    </nav>
    <br />
    <router-view />
  </div>
</template>

<style>
.main {
  display: flex;
  flex-direction: column;
}
</style>
