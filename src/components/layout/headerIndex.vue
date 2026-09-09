<template>
  <header>
    <nav>
      <div class="logo">
        <h2>LuxeRide</h2>

      </div>
      <div class="menu">
        <a href="#servicios">Servicios</a>
        <a href="#ventajas">Ventajas</a>
        <a href="#testimonios">Testimonios</a>
      </div>
      <div class="oculto">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
header {
  background-color: var(--white);
  box-shadow: var(--shadow);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  max-height: 50px;
  width: auto;
  margin-left: 10px;
}

.menu a {
  color: var(--secondary-color);
  text-decoration: none;
  margin-left: 2rem;
  transition: color 0.3s ease;
}

.menu a:hover {
  color: var(--primary-color);
}

.oculto {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.oculto span {
  width: 25px;
  height: 3px;
  background-color: var(--secondary-color);
  margin: 2px 0;
  transition: 0.3s;
}
</style>
