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
      path: '/admin',
      // name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      children: [
        {
          path: 'productsmanage',
          name: 'ProductsManage',
          component: () => import('@/views/Admin/ProductsManage.vue'),
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
          path: 'productslist',
          name: 'ProductsList',
          component: () => import('@/views/Front/ProductsList.vue'),
        },
        {
          path: 'productslist/:productId',
          name: 'Product',
          component: () => import('@/views/Front/Product.vue'),
        },
        {
          path: 'createorder',
          name: 'CreateOrder',
          component: () => import('@/views/Front/CreateOrder.vue'),
        },
      ],
    },
  ],
});
