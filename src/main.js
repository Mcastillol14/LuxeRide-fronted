import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Crear la instancia de Pinia
const pinia = createPinia();
pinia.use(piniaPersist); // ✅ Aplicar el plugin de persistencia a Pinia

// Crear la instancia de la aplicación Vue
const app = createApp(App);

// Usar los plugins
app.use(pinia); // ✅ Ahora la app usa la instancia de Pinia con persistencia
app.use(router);

// Inicializar AOS después de montar la aplicación
app.mount('#app');

// Inicializar AOS
AOS.init();
