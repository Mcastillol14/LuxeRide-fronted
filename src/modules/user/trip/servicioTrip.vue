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
                @change="seleccionarServicio">
        <template #option="slotProps">
          <div>
            <div>{{ slotProps.option.tipo }}</div>
            <small>{{ slotProps.option.descripcion }} - {{ getPrecioMostrar(slotProps.option) }}€/km</small>
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

// Función para obtener el precio a mostrar (precioPorKm o precioBase)
const getPrecioMostrar = (servicio) => {
  return servicio.precioPorKm || servicio.precioBase;
};

onMounted(async () => {
  if (servicios.value.length === 0) {
    await serviciosStore.obtenerTodosServicios();
  }

  // Verificar si hay un servicio guardado en localStorage
  const servicioGuardado = localStorage.getItem('servicioSeleccionado');
  if (servicioGuardado) {
    try {
      const servicio = JSON.parse(servicioGuardado);
      // Buscar el servicio en la lista por ID
      const servicioEncontrado = servicios.value.find(s => s.id === servicio.id);
      if (servicioEncontrado) {
        servicioSeleccionado.value = servicioEncontrado;
        emit('servicio-seleccionado', servicioEncontrado);
      }
    } catch (error) {
      console.error("Error al recuperar servicio del localStorage:", error);
    }
  }
});

const seleccionarServicio = () => {
  if (servicioSeleccionado.value) {
    // Determinar el precio base a usar (precioPorKm o precioBase)
    const precioBase = servicioSeleccionado.value.precioPorKm || servicioSeleccionado.value.precioBase;

    // Guardar en localStorage el id y precio del servicio
    localStorage.setItem('servicioSeleccionado', JSON.stringify({
      id: servicioSeleccionado.value.id,
      precioBase: precioBase
    }));

    emit('servicio-seleccionado', servicioSeleccionado.value);
  }
};
</script>
