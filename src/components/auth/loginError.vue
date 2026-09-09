<template>
  <span v-if="mostrarMensajeError" class="error">{{ mostrarMensajeError }}</span>
</template>

<script setup>
import { computed } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

const { errorMessage } = useField(props.name);

// vacio por ahora, no hay overrides en login todavia. si se agrega uno la key
// tiene que ser el texto exacto que devuelve vee-validate (no el nombre del campo,
// a diferencia de registerError.vue)
const mensajeErrorPersonalizado = {

};

const mostrarMensajeError = computed(() => {
  if (!errorMessage.value) {
    return '';
  }
  return mensajeErrorPersonalizado[errorMessage.value] || errorMessage.value;
});

</script>

<style scoped></style>
