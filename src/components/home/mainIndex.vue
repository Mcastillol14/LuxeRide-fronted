<template>
  <main>
    <section id="inicio" class="hero">
      <div class="contenido-hero">
        <h1>Viaja con estilo y responsabilidad</h1>
        <p>Servicio de transporte premium, diseñado para tu comodidad y comprometido con un futuro más sostenible. Viaja seguro mientras cuidamos el planeta juntos.</p>
        <button class="acceder-boton" @click="abrirModal">Acceder</button>
      </div>
      <div class="imagen-hero">
        <svg width="500" height="300" viewBox="0 0 500 300">
          <g transform="translate(50, 50)">
            <rect x="50" y="80" width="40" height="120" fill="#2C3E50" />
            <rect x="100" y="40" width="50" height="160" fill="#34495E" />
            <rect x="160" y="100" width="45" height="100" fill="#2C3E50" />
            <rect x="215" y="60" width="55" height="140" fill="#34495E" />
            <rect x="280" y="90" width="40" height="110" fill="#2C3E50" />
            <circle cx="70" cy="70" r="15" fill="#27AE60" />
            <circle cx="180" cy="90" r="20" fill="#27AE60" />
            <circle cx="300" cy="80" r="18" fill="#27AE60" />
            <rect x="120" y="35" width="30" height="5" fill="#27AE60" />
            <rect x="235" y="55" width="25" height="5" fill="#27AE60" />
            <path d="M50 150 Q170 100 300 150" stroke="#27AE60" stroke-width="2" fill="none" />
            <path d="M50 160 Q170 110 300 160" stroke="#27AE60" stroke-width="2" fill="none" />
            <rect x="80" y="170" width="30" height="15" rx="5" fill="#27AE60" />
            <rect x="200" y="180" width="30" height="15" rx="5" fill="#27AE60" />
            <path d="M260 70 Q270 60 280 70 T300 70" fill="none" stroke="#27AE60" stroke-width="2" />
            <path d="M265 75 Q275 65 285 75 T305 75" fill="none" stroke="#27AE60" stroke-width="2" />
          </g>
        </svg>
      </div>
    </section>
    <section class="servicios" id="servicios">
      <h2>Nuestras caracteristicas</h2>
      <div class="servicios-grid">
        <div class="tarjeta-servicio" data-aos="fade-right">
          <svg class="service-icon" width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="#27AE60" />
            <path d="M15 20 L23 30 L35 15" stroke="white" stroke-width="3" fill="none" />
          </svg>
          <h3>Puntualidad</h3>
          <p>Compromiso con el tiempo y horarios de nuestros clientes</p>
        </div>
        <div class="tarjeta-servicio" data-aos="fade-up">
          <svg class="service-icon" width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="#27AE60" />
            <path d="M25 15 L25 35 M15 25 L35 25" stroke="white" stroke-width="3" />
          </svg>
          <h3>Atención Personalizada</h3>
          <p>Servicio adaptado a las necesidades específicas de cada cliente</p>
        </div>
        <div class="tarjeta-servicio" data-aos="fade-up">
          <svg class="service-icon" width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="#27AE60" />
            <path d="M17 25 C20 15, 30 15, 33 25" stroke="white" stroke-width="3" fill="none" />
            <circle cx="25" cy="22" r="3" fill="white" />
          </svg>
          <h3>Confort Superior</h3>
          <p>Flota de vehículos de alta gama para máxima comodidad</p>
        </div>
        <div class="tarjeta-servicio" data-aos="fade-left">
          <svg class="service-icon" width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="#27AE60" />
            <path d="M20 15 L30 25 L20 35" stroke="white" stroke-width="3" fill="none" />
          </svg>
          <h3>Innovación Constante</h3>
          <p>Tecnología de vanguardia en todos nuestros servicios</p>
        </div>
      </div>

    </section>
    <section id="ventajas" class="ventajas">
      <h2>¿Por qué elegirnos?</h2>
      <div class="ventajas-grid">
        <div class="tarjeta-ventajas" data-aos="fade-zoom-in">
          <h3>Sostenibilidad</h3>
          <p>Reducimos la huella de carbono con nuestra flota eléctrica</p>
        </div>
        <div class="tarjeta-ventajas" data-aos="fade-zoom-in">
          <h3>Confort Premium</h3>
          <p>Vehículos de alta gama para tu comodidad</p>
        </div>
        <div class="tarjeta-ventajas" data-aos="fade-zoom-in">
          <h3>Conductores Profesionales</h3>
          <p>Personal capacitado y con experiencia</p>
        </div>
        <div class="tarjeta-ventajas" data-aos="fade-zoom-in">
          <h3>Atención 24/7</h3>
          <p>Disponibilidad total para cuando nos necesites</p>
        </div>
      </div>
    </section>
    <section id="testimonios" class="testimonios">
      <h2>Lo que dicen nuestros clientes</h2>
      <div class="carousel-testimonios">
        <div class="tarjetas-container" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="(testimonio, index) in testimonios" :key="index" class="tarjeta-testimonio">
            <svg class="foto-testimonio" width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="25" fill="#27AE60" />
              <circle cx="30" cy="20" r="10" fill="#2C3E50" />
              <path d="M20 45 Q30 55 40 45" fill="#2C3E50" />
              <path :d="testimonio.foto" fill="#2C3E50" />
            </svg>
            <h3>{{ testimonio.nombre }}</h3>
            <p>"{{ testimonio.opinion }}"</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div :class="['modal', { 'active': modalAbierto }]" @click.self="cerrarModal">
    <div class="contenido-modal">
      <button @click="cerrarModal" class="cerrar-modal">&times;</button>
      <div class="tabs">
        <button
          class="tab-button"
          :class="{ active: opcion === 'iniciar' }"
          @click="cambiarOpcion('iniciar')"
        >
          Iniciar sesión
        </button>
        <button
          class="tab-button"
          :class="{ active: opcion === 'registro' }"
          @click="cambiarOpcion('registro')"
        >
          Registro
        </button>
      </div>
      <div v-if="opcion === 'iniciar'" class="form-container">
        <loginUser />
      </div>
      <div v-if="opcion === 'registro'" class="form-container">
        <registerUser />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import loginUser from '../auth/loginUser.vue';
import registerUser from '../auth/registerUser.vue';

const testimonios = [
  {
    nombre: "Juan Perez",
    opinion: "Excelente servicio, muy puntuales y atentos",
    foto: "M10 45 Q30 60 50 45"
  },
  {
    nombre: "Maria Lopez",
    opinion: "Me encanta la comodidad de sus vehículos y la atención personalizada de sus conductores",
    foto: "M10 45 Q30 60 50 45"
  },
  {
    nombre: "Pedro Ramirez",
    opinion: "Siempre que necesito un taxi, llamo a LuxeRide, son los mejores",
    foto: "M10 45 Q30 60 50 45"
  },
  {
    nombre: "Ana Martinez",
    opinion: "Me siento segura y cómoda cuando viajo con LuxeRide, son mi primera opción",
    foto: "M10 45 Q30 60 50 45"
  },
  {
    nombre: "Carlos Rodriguez",
    opinion: "Excelente servicio, muy puntuales y atentos",
    foto: "M10 45 Q30 60 50 45"
  },
  {
    nombre: "Sofia Garcia",
    opinion: "Me encanta su compromiso con le medio ambiente",
    foto: "M10 45 Q30 60 50 45"
  }
];

const opcion = ref("iniciar");
const modalAbierto = ref(false);
const abrirModal = () => {
  modalAbierto.value = true;
};
const cerrarModal = () => {
  modalAbierto.value = false;
};

const cambiarOpcion = (nuevaOpcion) => {
  opcion.value = nuevaOpcion;
};
const indiceTestimonio = ref(0);
const testimoniosPorPagina = 3;
const tiempoCambio = ref(null);

// el indice avanza de a 1 testimonio pero el carousel se mueve de a "paginas" de 3,
// por eso el floor
const currentSlide = computed(() => Math.floor(indiceTestimonio.value / testimoniosPorPagina));

const cambioTestimonio = () => {
  indiceTestimonio.value = (indiceTestimonio.value + 1) % testimonios.length;
};

const iniciarCambio = () => {
  tiempoCambio.value = setInterval(cambioTestimonio, 5000);
};

onMounted(() => {
  iniciarCambio();
});

onUnmounted(() => {
  if (tiempoCambio.value) {
    clearInterval(tiempoCambio.value);
  }
});

</script>

<style scoped src="../../assets/style/mainIndex.css">

</style>

