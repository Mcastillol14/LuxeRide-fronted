<template>
  <span v-if="mostrarMensajeError" class="error">{{ mostrarMensajeError }}</span>
</template>

<script setup>
import { computed } from 'vue';
import { useField } from 'vee-validate';
import { datosStore } from '@/stores/registerUser.js'

const store = datosStore();
const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

const { errorMessage } = useField(props.name);

// vee-validate cae en el mensaje genérico "{field} is not valid." cuando una
// regla (p.ej. email, min) falla sin devolver su propio texto; para esos
// campos mostramos un mensaje en español en su lugar.
const mensajeErrorPersonalizado = {
  email: 'Por favor, introduce un correo electrónico válido',
  password: 'La contraseña debe tener al menos 8 caracteres',
};

const mostrarMensajeError = computed(() => {
  if (store.error) {
    if (props.name === 'dni' && store.error.toLowerCase().includes('dni')) {
      return store.error;
    }
    if (props.name === 'email' && store.error.toLowerCase().includes('correo')) {
      return store.error;
    }
  }
  if (!errorMessage.value) {
    return '';
  }

  const esMensajeGenerico = errorMessage.value === `${props.name} is not valid.`;
  if (esMensajeGenerico && mensajeErrorPersonalizado[props.name]) {
    return mensajeErrorPersonalizado[props.name];
  }
  return errorMessage.value;
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
