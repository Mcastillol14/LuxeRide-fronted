<template>
 <footer>
    <div class="contenido-footer">
        <p>&copy; {{ yearActual }} <strong>LuxeRide</strong> · Todos los derechos reservados.</p>
    </div>
</footer>

</template>

<script setup>
const yearActual = new Date().getFullYear();
</script>

<style scoped>
footer {
  background-color: var(--secondary-color);
  color: var(--white);
  padding: 3rem 5%;
}
.contenido-footer{
  max-width: 1200px;
  margin: 0 auto;
}
.contenido-footer p{
  margin: 0;
  font-size: 0.9rem;
  text-align: center;
}
</style>
