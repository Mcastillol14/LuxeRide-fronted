<template>
  <footer class="bg-dark text-white py-5">
    <div class="container">
      <div class="row mb-4">
        <div class="col-md-3">
          <h5 class="text-uppercase">Enlaces rápidos</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white" aria-label="Inicio">Inicio</a></li>
            <li><a href="#experiencia" class="text-white" aria-label="Experiencia">Experiencia</a></li>
            <li><a href="#ventajas" class="text-white" aria-label="Ventajas">Ventajas</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5 class="text-uppercase">Sobre nosotros</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white" aria-label="Quiénes somos">Quiénes somos</a></li>
            <li><a href="#" class="text-white" aria-label="Misión">Misión</a></li>
            <li><a href="#" class="text-white" aria-label="Visión">Visión</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5 class="text-uppercase">Síguenos</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white" aria-label="Facebook"><i class="fab fa-facebook-f"></i> Facebook</a></li>
            <li><a href="#" class="text-white" aria-label="Twitter"><i class="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="#" class="text-white" aria-label="Instagram"><i class="fab fa-instagram"></i> Instagram</a></li>
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
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.footer a {
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
