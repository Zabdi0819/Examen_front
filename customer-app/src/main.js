import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Asegúrate de que esta importación sea correcta
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

// Configuración de Toast
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

// Configuración del Router
app.use(router);

app.mount('#app'); // Asegúrate de que esto esté al final
