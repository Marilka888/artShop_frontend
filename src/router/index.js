import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
    },
    {
      path: '/admin',
      // name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      children: [
        {
          path: 'favoursmanage',
          name: 'FavoursManage',
          component: () => import('@/views/Admin/FavoursManage.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'ordersmanage',
          name: 'OrdersManage',
          component: () => import('@/views/Admin/OrdersManage.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/',
      // name: 'Layout',
      component: () => import('@/views/Layout.vue'),
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/views/Front/Home.vue'),
        },
        {
          path: 'favourslist',
          name: 'FavoursList',
          component: () => import('@/views/Front/FavoursList.vue'),
        },
        {
          path: 'favourslist/:favourId',
          name: 'Favour',
          component: () => import('@/views/Front/Favour.vue'),
        },
        {
          path: 'createorder/:id',
          name: 'CreateOrder',
          component: () => import('@/views/Front/CreateOrder.vue'),
        },
      ],
    },
  ],
});
