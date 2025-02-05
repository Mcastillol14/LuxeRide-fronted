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

const mensajeErrorPersonalizado = {
  'Este campo es obligatorio': 'Por favor, complete este campo.',
  'El campo debe ser un correo electrónico válido': 'Por favor, ingrese un correo electrónico válido.'
};

const mostrarMensajeError = computed(() => {
  return errorMessage.value ? mensajeErrorPersonalizado[errorMessage.value] || errorMessage.value : '';
});
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
