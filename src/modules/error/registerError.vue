<template>
  <span v-if="mostrarMensajeError" class="error">{{ mostrarMensajeError }}</span>
</template>

<script setup>
import { computed } from 'vue';
import { useField } from 'vee-validate';
import { datosStore } from '@/stores/registerUser.js';

const store = datosStore();
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
  if (store.error) {
    if (props.name === 'dni' && store.error.toLowerCase().includes('dni')) {
      return mensajeErrorPersonalizado.dni;
    }
    return store.error;
  }
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
