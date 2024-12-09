// src/router.ts
import { createRouter, createWebHistory } from "vue-router";
import s01e01 from "./views/s01e01.vue";
import s01e02 from "./views/s01e02.vue";
import s01e03 from "./views/s01e03.vue";
import s01e04 from "./views/s01e04.vue";
import s01e05 from "./views/s01e05.vue";
import s02e01 from "./views/s02e01.vue";
import s02e02 from "./views/s02e02.vue";
import s02e03 from "./views/s02e03.vue";
import s02e04 from "./views/s02e04.vue";
import s02e05 from "./views/s02e05.vue";

const routes = [
  { path: "/s01e01", component: s01e01 },
  { path: "/s01e02", component: s01e02 },
  { path: "/s01e03", component: s01e03 },
  { path: "/s01e04", component: s01e04 },
  { path: "/s01e05", component: s01e05 },
  { path: "/s02e01", component: s02e01 },
  { path: "/s02e02", component: s02e02 },
  { path: "/s02e03", component: s02e03 },
  { path: "/s02e04", component: s02e04 },
  { path: "/s02e05", component: s02e05 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
