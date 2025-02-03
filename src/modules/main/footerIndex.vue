<template>
  <footer class="bg-dark text-white py-5">
    <div class="container">
      <div class="row mb-4">
        <div class="col-md-3">
          <h5 class="text-uppercase">Enlaces rápidos</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white">Inicio</a></li>
            <li><a href="#servicios" class="text-white">Servicios</a></li>
            <li><a href="#ventajas" class="text-white">Ventajas</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5 class="text-uppercase">Sobre nosotros</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white">Quiénes somos</a></li>
            <li><a href="#" class="text-white">Misión</a></li>
            <li><a href="#" class="text-white">Visión</a></li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-12 text-center">
          <p>&copy; {{ currentYear }} LuxeRide. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentYear = ref('');

onMounted(() => {
  currentYear.value = new Date().getFullYear();
});
</script>

<style scoped>
footer {
  background-color: #343a40;
}

footer a:hover {
  text-decoration: underline;
}

footer .bi {
  font-size: 1.5rem;
}
</style>
