import { createRouter, createWebHashHistory } from 'vue-router';
import LoginVuew from '../views/LoginVuew.vue';

const routes = [
  { path: '/ups', name: 'home', component: LoginVuew },
  // { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

// 5. Create and mount the root instance.
// const app = Vue.createApp({})
// app.use(router)
// app.mount('#app')
