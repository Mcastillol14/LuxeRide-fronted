<template>
  <div class="admin-panel d-flex">
    <nav id="sidebar" :class="{ 'active': !sidebarAbierta }">
      <div class="sidebar-header">
        <h3>Admin Panel</h3>
        <button @click="desplegarSideBar" class="btn btn-link d-md-none">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <ul class="list-unstyled components">
        <li v-for="item in menu" :key="item.id">
          <a
            href="#"
            @click.prevent="opcionDefault = item.id"
            :class="{ 'active': opcionDefault === item.id }"
          >
            <i :class="getIcon(item.id)"></i>
            <span>{{ item.nombre }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <div id="content" class="d-flex flex-column">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid d-flex justify-content-center">
          <button @click="desplegarSideBar" class="btn btn-dark d-md-none me-auto">
            <i class="bi bi-list"></i>
          </button>
          <h1 class="navbar-brand mb-0 mx-auto text-center">{{ currentPageTitle }}</h1>
        </div>
      </nav>


      <main class="flex-grow-1 p-4">
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
const sidebarAbierta = ref(true);

const menu = [
  { id: "usuario", nombre: "Usuarios", componente: usuarioDashboard },
  { id: "licencias", nombre: "Licencias", componente: licenciasDashboard },
  { id: "servicios", nombre: "Servicios", componente: serviciosDashboard },
];

const componenteActual = computed(() => {
  return menu.find(item => item.id === opcionDefault.value)?.componente || usuarioDashboard;
});

const currentPageTitle = computed(() => {
  return menu.find(item => item.id === opcionDefault.value)?.nombre || "Dashboard";
});

const getIcon = (id) => {
  const icons = {
    usuario: "bi bi-people",
    licencias: "bi bi-card-text",
    servicios: "bi bi-gear",
  };
  return icons[id] || "bi bi-question-circle";
};

const desplegarSideBar = () => {
  sidebarAbierta.value = !sidebarAbierta.value;
};
</script>

<style scoped>
.admin-panel {
  min-height: 100vh;
  background-color: #f4f7fa;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #1a1a2e;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #16213e;
}

#sidebar ul.components {
  padding: 20px 0;
}

#sidebar ul li a {
  padding: 10px 20px;
  font-size: 1.1em;
  display: block;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s;
}

#sidebar ul li a:hover,
#sidebar ul li a.active {
  background: #0f3460;
}

#sidebar ul li a i {
  margin-right: 10px;
}

#content {
  width: 100%;
  min-height: 100vh;
  transition: all 0.3s;
}

.navbar {
  background: #16213e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  color: #fff;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
    position: fixed;
    height: 100%;
    z-index: 999;
  }

  #sidebar.active {
    margin-left: 0;
  }
}
</style>
