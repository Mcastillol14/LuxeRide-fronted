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
  required: 'Este campo es obligatorio',
  email: 'Por favor, introduce un correo electrónico válido',
  min: 'Este campo debe tener al menos 8 caracteres',
  dni: 'El DNI introducido no es válido',
  confirmarPassword: 'Las contraseñas no coinciden',
  aceptoTerminos: 'Debes aceptar los términos y condiciones'
};

const mostrarMensajeError = computed(() => {
  if (!errorMessage.value) {
    return '';
  }
  const errorKey = errorMessage.value.toLowerCase();
  return mensajeErrorPersonalizado[errorKey] || errorMessage.value;
});
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.8rem;
  display: block;
  margin-top: 0.25rem;
}
</style>
