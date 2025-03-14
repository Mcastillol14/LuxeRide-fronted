<template>
  <Card>
    <template #title>Estado de Servicio</template>
    <template #content>
      <div v-if="enServicio" class="mb-3">
        <Message severity="success">En servicio con el coche: {{ cocheSeleccionado?.matricula }}</Message>
      </div>
      <div v-else class="mb-3">
        <Message severity="info">Fuera de servicio</Message>
      </div>
      <div v-if="!enServicio" class="mb-3">
        <Button label="Buscar Coche" icon="pi pi-search" @click="buscarCoche" />
      </div>
      <div v-if="cochesDisponibles.length > 0 && !enServicio" class="mb-3">
        <Dropdown v-model="cocheElegido" :options="cochesDisponibles" optionLabel="matricula" placeholder="Selecciona un coche" class="w-100" />
      </div>
      <div v-if="!enServicio && cocheElegido" class="mb-3">
        <Button label="Seleccionar Coche" icon="pi pi-check" @click="seleccionar" class="p-button-success" />
      </div>
      <div v-if="enServicio" class="mb-3">
        <Button label="Dejar Coche" icon="pi pi-times" @click="liberar" class="p-button-danger" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Message from 'primevue/message';
import { useCocheStore } from '@/stores/Taxista/cochesDriver.js';

const props = defineProps({
  enServicio: Boolean,
  cocheSeleccionado: Object
});

const emit = defineEmits(['buscar-coche', 'seleccionar-coche', 'liberar-coche']);

const cocheStore = useCocheStore();
const cocheElegido = ref(null);

watch(() => cocheStore.cochesDisponibles, (newValue) => {
  if (newValue.length > 0 && !cocheElegido.value) {
    cocheElegido.value = newValue[0];
  }
});

const buscarCoche = () => {
  emit('buscar-coche');
};

const seleccionar = () => {
  if (cocheElegido.value) {
    emit('seleccionar-coche', cocheElegido.value);
  }
};

const liberar = () => {
  emit('liberar-coche');
};

const cochesDisponibles = computed(() => cocheStore.cochesDisponibles);
</script>
