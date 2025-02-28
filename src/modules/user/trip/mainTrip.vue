<template>
  <div class="book-taxi-container">
    <h1 class="text-center mb-4">Pide tu taxi</h1>
    <div class="card p-4 shadow-sn">
      <form @submit.prevent="pedirTaxi">
        <LocalizacionTrip label="Origen" v-model="origen" :errors="errors.origen"/>
        <localizacionTrip label="Destino" v-model="destino" :errors="errors.origen"/>
        <servicioTrip v-model="selectedServices" :errors="errors.services"/>
        <taxistaTrip v-model="selectedDriver" :errors="errors.driver"/>
        <Button type="submit" label="Reservar Taxi" class="w-100 p-button-success mt-3" :loading="isSubmitting"/>
      </form>
    </div>
    <Message v-if="bookingMessage" :severity="bookingMessage.severity" class="mt-3">{{ bookingMessage.content }}</Message>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import servicioTrip from './servicioTrip.vue'
import localizacionTrip from './localizacionTrip.vue'
import taxistaTrip from './taxistaTrip.vue'
import Button from 'primevue/button'
import Message from 'primevue/message'

const origen =ref('')
const destino = ref('')
const selectedServices = ref([])
const selectedDriver = ref(null)
const errors = ref({})
const isSubmitting = ref(false)
const bookingMessage = ref(null)


const pedirTaxi= ()=>{
  errors.value = {}
  isSubmitting.value = true

  if (!origin.value) errors.value.origin = 'El origen es requerido';
  if (!destino.value) errors.value.destino = 'El destino es requerido';
  if (selectedServices.value.length === 0) errors.value.services = 'Selecciona un servicio';
  if (!selectedDriver.value) errors.value.driver = 'Selecciona un conductor';

  if (Object.keys(errors.value).length===0){

  }

}


</script>

<style scoped>
.book-taxi-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background-color: #fff;
  border-radius: 8px;
}
</style>
