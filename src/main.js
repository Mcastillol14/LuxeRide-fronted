import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Crear la instancia de la aplicación Vue
const app = createApp(App)

// Usar los plugins
app.use(createPinia())
app.use(router)

// Inicializar AOS después de montar la aplicación
app.mount('#app')

// Inicializar AOS
AOS.init()
