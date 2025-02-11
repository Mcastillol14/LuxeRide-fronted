<template>
  <div class="d-flex flex-column vh-100">
    <!-- Header -->
    <header class="py-4 bg-primary text-white">
      <div class="container-fluid">
        <h1 class="display-5 fw-bold text-white mb-0">Panel de administrador</h1>
      </div>
    </header>
    <div class="container-fluid flex-grow-1 d-flex">
      <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" id="navbarNav">
        <div class="position-sticky pt-4">
          <ul class="nav flex-column">
            <li class="nav-item mb-3" v-for="item in menu" :key="item.id">
              <a
                class="nav-link d-flex align-items-center"
                :class="{ active: opcionDefault === item.id }"
                href="#"
                @click.prevent="opcionDefault = item.id"
              >
                <i :class="getIcon(item.id)" class="me-3"></i>
                <span class="fs-5">{{ item.nombre }}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
        <component :is="componenteActual" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import usuarioDashboard from './usuarioDashboard.vue';
import licenciasDashboard from './licenciasDashboard.vue';
import serviciosDashboard from './serviciosDashboard.vue';

const opcionDefault = ref("usuario");

const menu = [
  { id: "usuario", nombre: "Usuarios", componente: usuarioDashboard },
  { id: "licencias", nombre: "Licencias", componente: licenciasDashboard },
  { id: "servicios", nombre: "Servicios", componente: serviciosDashboard },
];

const componenteActual = computed(() => {
  return menu.find(item => item.id === opcionDefault.value)?.componente || usuarioDashboard;
});

const getIcon = (id) => {
  const icons = {
    usuario: "bi bi-people",
    licencias: "bi bi-card-text",
    servicios: "bi bi-gear",
  };
  return icons[id] || "bi bi-question-circle";
};
</script>

<style scoped>
.sidebar {
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);

}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
  padding: 1rem 1.5rem;
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
}

.sidebar .nav-link.active {
  color: #007bff;
  background-color: rgba(0, 123, 255, 0.1);
  border-left-color: #007bff;
}

.sidebar .nav-link:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.sidebar .nav-link i {
  font-size: 1.25rem;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}
</style>
