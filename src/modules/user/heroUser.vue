<template>
  <section class="hero-section mb-5">
    <div class="card shadow-sm">
      <div class="card-body p-4">
        <div class="row align-items-center">
          <div class="col-md-7">
            <h2 class="section-title mb-3">Viaja con estilo y sostenibilidad</h2>
            <p class="section-description mb-4">
              Disfruta de un viaje cómodo y ecológico con nuestra flota de vehículos eléctricos de lujo.
              Nuestros conductores profesionales te llevarán a tu destino con la máxima comodidad.
            </p>
            <div class="d-flex flex-wrap gap-2">
              <Button
                label="Reservar Taxi Ahora"
                icon="pi pi-send"
                class="p-button-success p-button-lg"
                @click="bookTaxi"
              />
            </div>
          </div>
          <div class="col-md-5 mt-4 mt-md-0">
            <div class="hero-image-container">
              <img
                src="https://images.unsplash.com/photo-1556122071-e404eaedb77f?q=80&w=1734&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="taxi" class="img-fluid rounded shadow"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {defineEmits} from 'vue';
import Button from 'primevue/button'

const emit = defineEmits(['book-taxi']);

const bookTaxi = () => {
  emit('book-taxi');
};
</script>
<style scoped>
.hero-section {
  margin-top: 1rem;
}

.section-title {
  color: #1B5E20;
  font-weight: 700;
}

.section-description {
  color: #555;
  font-size: 1.1rem;
}

.hero-image-container {
  overflow: hidden;
  border-radius: 8px;
}
button{
  border-radius: 8px;
  box-shadow: none !important;
  outline: none !important;
}

@media (max-width: 768px) {
  .hero-image-container {
    margin-top: 1.5rem;
  }
}

</style>
