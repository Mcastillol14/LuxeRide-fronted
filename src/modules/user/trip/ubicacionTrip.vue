<template>
  <div class="ubicacion-input">
    <h3>{{ titulo }}</h3>
    <div class="mb-3">
      <label for="calle" class="form-label">Calle</label>
      <InputText id="calle" v-model="ubicacion.calle" class="w-100" @input="emitirUbicacion" />
    </div>
    <div class="mb-3">
      <label for="ciudad" class="form-label">Ciudad</label>
      <InputText id="ciudad" v-model="ubicacion.ciudad" class="w-100" @input="emitirUbicacion" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import InputText from 'primevue/inputtext';

const props = defineProps({
  titulo: String
});

const emit = defineEmits(['ubicacion-seleccionada']);

const ubicacion = ref({ calle: '', ciudad: '' });

const emitirUbicacion = () => {
  emit('ubicacion-seleccionada', ubicacion.value);
};

watch(ubicacion, emitirUbicacion, { deep: true });
</script>
