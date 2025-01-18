<template>
  <span v-if="mostrarMensajeError" class="error">{{ mostrarMensajeError }}</span>
</template>

<script setup>
import { computed } from 'vue';
import { useField } from 'vee-validate';
import { datosStore } from '../../stores/registerUser.js'

const store=datosStore();
const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

const { errorMessage } = useField(props.name);

const mensajeErrorPersonalizado = {
  email: 'Por favor, introduce un correo electrónico válido',
  min: 'Este campo debe tener al menos 8 caracteres',
  dni: 'El DNI introducido no es válido',
  confirmarPassword: 'Las contraseñas no coinciden',
  aceptoTerminos: 'Debes aceptar los términos y condiciones'
};
const errorGlobal=computed(()=>store.error||'');


const mostrarMensajeError = computed(() => {
  if (errorGlobal.value) {
    return errorGlobal.value;
  }
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

