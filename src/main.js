import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import App from './App.vue';
import router from './router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);

// Usar los plugins
app.use(pinia);
app.use((PrimeVue))
app.use(router);


app.mount('#app');

AOS.init();
