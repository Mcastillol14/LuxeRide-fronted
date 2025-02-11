<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3">
    <div class="container d-flex align-items-center">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <span class="fs-4">LuxeRide</span>
        <img src="../../assets/img/LuxeRide.svg" alt="LuxeRide Logo" width="75px">
      </a>
      <button
        class="navbar-toggler ms-auto"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav ms-4">
          <li class="nav-item">
            <a class="nav-link fs-5" href="#experiencia" aria-label="Experiencia">Experiencia</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fs-5" href="#ventajas" aria-label="Ventajas">Ventajas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fs-5" href="#testimonios" aria-label="Testimonios">Testimonios</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar-brand img {
  margin-left: 10px;
}

.nav-link {
  transition: color 0.3s;
}

.nav-link:hover {
  color: #f8f9fa;
}
</style>
