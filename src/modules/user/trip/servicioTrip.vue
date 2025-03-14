<template>
  <div class="servicio-select">
    <h3>Seleccionar Servicio</h3>
    <div v-if="serviciosStore.cargando">Cargando servicios...</div>
    <div v-else-if="serviciosStore.error">Error: {{ serviciosStore.error }}</div>
    <div v-else>
      <Dropdown v-if="servicios.length > 0"
                v-model="servicioSeleccionado"
                :options="servicios"
                optionLabel="tipo"
                placeholder="Seleccione un servicio"
                class="w-100"
                @change="emitirServicio">
        <template #option="slotProps">
          <div>
            <div>{{ slotProps.option.tipo }}</div>
            <small>{{ slotProps.option.descripcion }} - {{ slotProps.option.precioPorKm }}€/km</small>
          </div>
        </template>
      </Dropdown>
      <p v-else>No hay servicios disponibles en este momento.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Dropdown from 'primevue/dropdown';
import { useServiciosUserStore } from '@/stores/Usuario/serviciosUser';

const emit = defineEmits(['servicio-seleccionado']);

const serviciosStore = useServiciosUserStore();
const servicioSeleccionado = ref(null);

const servicios = computed(() => serviciosStore.getServicios);

onMounted(async () => {
  if (servicios.value.length === 0) {
    await serviciosStore.obtenerTodosServicios();
  }
});

const emitirServicio = () => {
  if (servicioSeleccionado.value) {
    emit('servicio-seleccionado', servicioSeleccionado.value);
  }
};
</script>
