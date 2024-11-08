// src/router.ts
import { createRouter, createWebHistory } from "vue-router";
import s01e01 from "./views/s01e01.vue";
import s01e02 from "./views/s01e02.vue";
import s01e03 from "./views/s01e03.vue";
import s01e04 from "./views/s01e04.vue";

const routes = [
  { path: "/s01e01", component: s01e01 },
  { path: "/s01e02", component: s01e02 },
  { path: "/s01e03", component: s01e03 },
  { path: "/s01e04", component: s01e04 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
