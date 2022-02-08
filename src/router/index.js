import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/member',
    name: 'Member',
    component: () => import("@/views/Member.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/member",
    name: "Member",
    component: () => import("@/views/Member.vue"),
  },
  {
    path: "/product",
    name: "Product",
    component: () => import("@/views/Product.vue"),
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("@/views/Order.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const username = localStorage.getItem('username')
  if (to.name !== 'Login' && username === null) {
    // console.log('1');
    next({ name: 'Login' })
  } else {
    // console.log('2');
    next()
  }
})


export default router;

