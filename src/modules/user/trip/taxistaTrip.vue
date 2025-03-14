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
      <p v-if="cocheSeleccionado.taxista">
        {{ cocheSeleccionado.taxista.nombre }} {{ cocheSeleccionado.taxista.apellidos }}
      </p>
      <p v-else>No hay taxista asignado a este coche.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Dropdown from 'primevue/dropdown';
import { useCochesUser } from '@/stores/Usuario/cochesUser.js';

const emit = defineEmits(['taxista-seleccionado']);

const cochesStore = useCochesUser();
const cochesEnServicio = ref([]);
const cocheSeleccionado = ref(null);

onMounted(async () => {
  await cochesStore.obtenerCochesUser();
  actualizarCochesEnServicio();
});

watch(() => cochesStore.cochesEnServicio, actualizarCochesEnServicio);

function actualizarCochesEnServicio() {
  cochesEnServicio.value = cochesStore.cochesEnServicio;
  console.log("Coches en servicio actualizados:", cochesEnServicio.value);
}

const emitirSeleccion = () => {
  if (cocheSeleccionado.value) {
    emit('taxista-seleccionado', {
      coche: cocheSeleccionado.value,
      taxista: cocheSeleccionado.value.taxista
    });
  }
};
</script>
