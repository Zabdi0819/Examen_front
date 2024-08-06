import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import CustomerForm from '../components/CustomerForm.vue';
import CustomerList from '../components/CustomerList.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: CustomerList,
    meta: { requiresAuth: true } // Protección de ruta
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin
  },
  {
    path: '/customer-form',
    name: 'CustomerForm',
    component: CustomerForm,
    meta: { requiresAuth: true } // Protección de ruta
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Añadir navegación global para protección de rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
