<template>
  <div class="taxista-select">
    <h3>Seleccionar Coche y Taxista</h3>
    <div v-if="cochesStore.cargando">Cargando coches...</div>
    <div v-else-if="cochesStore.error">Error: {{ cochesStore.error }}</div>
    <div v-else>
      <Dropdown v-if="cochesEnServicio.length > 0"
                v-model="cocheSeleccionado"
                :options="cochesEnServicio"
                optionLabel="descripcion"
                placeholder="Seleccione un coche"
                class="w-100"
                @change="emitirSeleccion" />
      <p v-else>No hay coches disponibles en este momento.</p>
    </div>
    <div v-if="cocheSeleccionado" class="mt-3">
      <h4>Taxista asignado:</h4>
      <div v-if="taxistaAsignado" class="taxista-info">
        <p> {{ taxistaAsignado.nombre }} {{ taxistaAsignado.apellidos }}</p>
      </div>
      <div v-else-if="cocheSeleccionado.taxista" class="taxista-info">
        <p><strong>Nombre:</strong> {{ cocheSeleccionado.taxista.nombre }} {{ cocheSeleccionado.taxista.apellidos }}</p>
        <p v-if="cocheSeleccionado.taxista.id"><strong>ID:</strong> {{ cocheSeleccionado.taxista.id }}</p>
      </div>
      <p v-else>No hay taxista asignado a este coche.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import Dropdown from 'primevue/dropdown';
import { useCochesUser } from '@/stores/Usuario/cochesUser.js';
import { useCocheStore } from '@/stores/Taxista/cochesDriver.js';

const emit = defineEmits(['taxista-seleccionado']);

const cochesStore = useCochesUser();
const cocheDriverStore = useCocheStore();
const cochesEnServicio = ref([]);
const cocheSeleccionado = ref(null);

onMounted(async () => {
  await cochesStore.obtenerCochesUser();
  cocheDriverStore.cargarTaxistasEnServicio();
  actualizarCochesEnServicio();
});

watch(() => cochesStore.cochesEnServicio, actualizarCochesEnServicio);

function actualizarCochesEnServicio() {
  cochesEnServicio.value = cochesStore.cochesEnServicio;
}

const taxistaAsignado = computed(() => {
  if (!cocheSeleccionado.value) return null;

  return cocheDriverStore.obtenerTaxistaPorCoche(cocheSeleccionado.value.id);
});

const emitirSeleccion = () => {
  if (cocheSeleccionado.value) {
    const taxista = taxistaAsignado.value || cocheSeleccionado.value.taxista;

    emit('taxista-seleccionado', {
      coche: cocheSeleccionado.value,
      taxista: taxista
    });
  }
};
</script>

