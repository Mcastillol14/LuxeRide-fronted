<template>
  <main class="main-content">
    <section class="hero bg-image text-white py-8 py-md-10 py-lg-12">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8 mx-auto text-center" data-aos="fade-up">
            <h1 class="display-3 fw-bold mb-4">Bienvenido a LuxeRide</h1>
            <p class="lead mb-5 fs-4">
              LuxeRide revoluciona el transporte urbano combinando lujo, sostenibilidad y tecnología de vanguardia.
              Nuestra línea de taxis eléctricos de alta gama ofrece una experiencia de viaje inigualable,
              reduciendo la huella de carbono sin comprometer el confort y la elegancia.
            </p>
            <button @click="abrirModal('login')" class="btn btn-success btn-lg mb-3">Acceder</button>
          </div>
        </div>
      </div>
    </section>
    <section id="experiencia" class="experiencia py-5">
      <div class="container">
        <h2 class="text-center mb-5 fw-bold" data-aos="fade-up">La Experiencia LuxeRide</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
            <div class="feature-card text-center">
              <i class="bi bi-lightning-charge display-4 text-success mb-3"></i>
              <h3 class="h5 mb-3">Viajes Eléctricos</h3>
              <p>Disfruta de un viaje silencioso y ecológico en nuestra línea 100% eléctrica.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <div class="feature-card text-center">
              <i class="bi bi-star display-4 text-success mb-3"></i>
              <h3 class="h5 mb-3">Lujo Personalizado</h3>
              <p>Experimenta un servicio a medida que se adapta a tus preferencias personales.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
            <div class="feature-card text-center">
              <i class="bi bi-shield-check display-4 text-success mb-3"></i>
              <h3 class="h5 mb-3">Seguridad Primero</h3>
              <p>Viaja con tranquilidad gracias a nuestros rigurosos protocolos de seguridad.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
            <div class="feature-card text-center">
              <i class="bi bi-clock-history display-4 text-success mb-3"></i>
              <h3 class="h5 mb-3">Puntualidad Garantizada</h3>
              <p>Optimizamos cada ruta para asegurar que llegues a tiempo a tu destino.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="ventajas" class="advantages py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5 fw-bold" data-aos="fade-up">Nuestras Ventajas</h2>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
            <div class="card h-100 border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
                class="card-img-top" alt="línea 100% Eléctrica">
              <div class="card-body">
                <h3 class="card-title h5 mb-3">Línea 100% Eléctrica</h3>
                <p class="card-text">Viaja con estilo y responsabilidad ambiental.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <div class="card h-100 border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                class="card-img-top" alt="Conductores Profesionales">
              <div class="card-body">
                <h3 class="card-title h5 mb-3">Conductores Profesionales</h3>
                <p class="card-text">Expertos en servicio al cliente y conducción segura.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
            <div class="card h-100 border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="card-img-top" alt="Tecnología de Vanguardia">
              <div class="card-body">
                <h3 class="card-title h5 mb-3">Tecnología de Vanguardia</h3>
                <p class="card-text">Vehículos equipados con lo último en tecnología.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
            <div class="card h-100 border-0 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1584907797015-7554cd315667?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  "
                class="card-img-top" alt="Confort Premium">
              <div class="card-body">
                <h3 class="card-title h5 mb-3">Confort Premium</h3>
                <p class="card-text">Interiores de lujo para una experiencia superior.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="testimonios" class="testimonials py-5">
      <div class="container">
        <h2 class="text-center mb-5 fw-bold" data-aos="fade-up">Lo que dicen nuestros clientes</h2>
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <carousel :items-to-show="1" :wrap-around="true" :autoplay="5000" class="testimonial-carousel">
              <slide v-for="testimonial in testimonials" :key="testimonial.id">
                <div class="testimonial-item text-center p-4">
                  <i :class="testimonial.icon + ' display-1 mb-3 text-success'"></i>
                  <p class="testimonial-text mb-3">"{{ testimonial.text }}"</p>
                  <h4 class="testimonial-name h6 mb-1">{{ testimonial.name }}</h4>
                  <p class="testimonial-position text-muted small">{{ testimonial.position }}</p>
                </div>
              </slide>
            </carousel>
          </div>
        </div>
      </div>
    </section>
    <section class="slogan bg-success text-white py-5">
      <div class="container text-center">
        <h2 class="mb-4 fw-bold" data-aos="fade-up">No viajes. Teletranspórtate con estilo.</h2>
        <p class="lead mb-4" data-aos="fade-up" data-aos-delay="100">LuxeRide: Donde el futuro del transporte se
          encuentra con el presente del lujo.</p>
        <button @click="abrirModal('register')" class="btn btn-light btn-lg" data-aos="fade-up"
          data-aos-delay="200">Únete a la revolución del transporte</button>
      </div>
    </section>
    <Transition name="modal">
      <div v-if="mostrarModal" class="modal-backdrop" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h5 class="modal-title">{{ estaLogin ? 'Iniciar sesión' : 'Registrarse' }}</h5>
          </div>
          <div class="modal-body">
            <loginUser v-if="estaLogin" />
            <registerUser v-else />
          </div>
          <div class="modal-footer">
            <button @click="loginMode" class="btn btn-link">
              {{ estaLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import loginUser from './loginUser.vue';
import registerUser from './registerUser.vue';

const mostrarModal = ref(false);
const estaLogin = ref(true);

const abrirModal = (mode) => {
  estaLogin.value = mode === 'login';
  mostrarModal.value = true;
};

const closeModal = () => {
  mostrarModal.value = false;
};

const loginMode = () => {
  estaLogin.value = !estaLogin.value;
};

const testimonials = ref([
  { id: 1, name: 'Ana García', position: 'Ejecutiva de Marketing', text: 'LuxeRide ha elevado mis expectativas sobre el transporte de lujo. Impecable en cada detalle.', icon: 'bi bi-person-circle' },
  { id: 2, name: 'Carlos Rodríguez', position: 'Empresario', text: 'La combinación perfecta de lujo y responsabilidad ambiental. LuxeRide es el futuro del transporte VIP.', icon: 'bi bi-person-circle' },
  { id: 3, name: 'Laura Martínez', position: 'Influencer de Viajes', text: 'Viajar con LuxeRide es una experiencia en sí misma. Comodidad, estilo y servicio excepcional.', icon: 'bi bi-person-circle' },
  { id: 4, name: 'Javier López', position: 'Director Financiero', text: 'La eficiencia y profesionalidad de LuxeRide hacen que sea mi primera opción para traslados al aeropuerto.', icon: 'bi bi-person-circle' },
  { id: 5, name: 'María Sánchez', position: 'Organizadora de Eventos', text: 'LuxeRide elevó el nivel de nuestros eventos corporativos. Un servicio impecable.', icon: 'bi bi-person-circle' },
  { id: 6, name: 'Pedro Alonso', position: 'Arquitecto', text: 'Viajar en los vehículos de LuxeRide es como moverse en una obra de arte sobre ruedas.', icon: 'bi bi-person-circle' },
  { id: 7, name: 'Isabel Navarro', position: 'Abogada', text: 'La discreción y el lujo de LuxeRide son perfectos para mis necesidades profesionales.', icon: 'bi bi-person-circle' },
  { id: 8, name: 'Roberto Fernández', position: 'Chef Reconocido', text: 'LuxeRide entiende el verdadero significado del servicio premium. Una experiencia culinaria sobre ruedas.', icon: 'bi bi-person-circle' },
  { id: 9, name: 'Elena Gómez', position: 'Gerente de Sostenibilidad', text: 'Como profesional en sostenibilidad, aprecio enormemente el enfoque eco-friendly de LuxeRide.', icon: 'bi bi-person-circle' },
  { id: 10, name: 'Diego Herrera', position: 'Atleta Profesional', text: 'LuxeRide combina perfectamente el confort que necesito antes de mis competiciones con la responsabilidad ambiental.', icon: 'bi bi-person-circle' },
]);

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });
});
</script>

<style scoped>
.main-content {
  background-color: #ffffff;
}

.bg-image {
  background-image: url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-position: center;
  position: relative;
}

.bg-image::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}

.hero .container {
  position: relative;
  z-index: 1;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.testimonial-carousel {
  max-width: 700px;
  margin: 0 auto;
}

.testimonial-item {
  background-color: #f8f9fa;
  border-radius: 8px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px; /* Aumentamos el ancho */
  max-height: 100vh;  /* Limitamos la altura */
  overflow-y: auto;  /* Habilitamos el scroll si es necesario */
}


.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 3rem;
  }

  .hero .lead {
    font-size: 1.25rem;
  }
}

.feature-card {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.línea .card img {
  height: 200px;
  object-fit: cover;
}
</style>
