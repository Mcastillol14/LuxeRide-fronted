<template>
  <div>
    <h1>Registro</h1>
    <Form @submit="enviarFormulario" v-slot="{ errors }">
      <div>
        <label for="name">Nombre:</label>
        <Field id="name" name="name" type="text" v-model="datosFormulario.name" :rules="'required'" />
        <RegisterError name="name" />
      </div>
      <div>
        <label for="lastName">Apellidos:</label>
        <Field id="lastName" name="lastName" type="text" v-model="datosFormulario.lastName" :rules="'required'" />
        <RegisterError name="lastName" />
      </div>
      <div>
        <label for="dni">DNI:</label>
        <Field id="dni" name="dni" type="text" v-model="datosFormulario.dni" :rules="'required|dni'" />
        <RegisterError name="dni" />
      </div>
      <div>
        <label for="email">Correo Electrónico:</label>
        <Field id="email" name="email" type="email" v-model="datosFormulario.email" :rules="'required|email'" />
        <RegisterError name="email" />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <Field id="password" name="password" type="password" v-model="datosFormulario.password"
          :rules="'required|min:8'" />
        <RegisterError name="password" />
      </div>
      <div>
        <label for="confirmPassword">Confirma la contraseña:</label>
        <Field id="confirmPassword" name="confirmPassword" type="password" v-model="datosFormulario.confirmPassword"
          :rules="reglasConfirmPassword" />
        <RegisterError name="confirmPassword" />
      </div>
      <div>
        <Field name="aceptoTerminos" type="checkbox" v-model="datosFormulario.aceptoTerminos" :value="true"
          :rules="'requiredCheckbox'" />
        <label for="aceptoTerminos">Acepto los términos y condiciones</label>
        <RegisterError name="aceptoTerminos" />
      </div>

      <button type="submit" :disabled="Object.keys(errors).length > 0">Enviar</button>
    </Form>

    <!-- Mostrar solo error global -->
    <div v-if="errorGlobal" class="error-global">
      {{ errorGlobal }}
    </div>

    <div v-if="mensajeExito" class="mensaje-exito">
      {{ mensajeExito }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Field, Form } from 'vee-validate';
import { email, min } from '@vee-validate/rules';
import { defineRule } from 'vee-validate';
import RegisterError from '../../error/registerError.vue';
import { datosStore } from '../../../stores/registerUser.js';

const store = datosStore();

defineRule('required', (value) => {
  if (!value || value.trim() === '') {
    return 'Este campo es obligatorio';
  }
  return true;
});
defineRule('requiredCheckbox', (value) => {
  if (value !== true) {
    return 'Debes aceptar los términos y condiciones';
  }
  return true;
});
defineRule('email', email);
defineRule('min', min);
defineRule('dni', (value) => {
  const patronDni = /^[0-9]{8}[A-Za-z]$/;
  if (!value || value.trim() === '') {
    return 'El DNI es obligatorio';
  }
  if (!patronDni.test(value)) {
    return 'El DNI no es válido';
  }
  return true;
});

const reglasConfirmPassword = computed(() => {
  return (value) => {
    if (!value) {
      return 'La confirmación de contraseña es obligatoria';
    }
    if (value !== datosFormulario.value.password) {
      return 'Las contraseñas no coinciden';
    }
    return true;
  };
});

const datosFormulario = ref({
  name: '',
  lastName: '',
  dni: '',
  email: '',
  password: '',
  confirmPassword: '',
  aceptoTerminos: false
});

const mensajeExito = ref('');

const errorGlobal = computed(() => store.error || '');

const enviarFormulario = async () => {
  try {
    const usuario = {
      name: datosFormulario.value.name,
      lastName: datosFormulario.value.lastName,
      dni: datosFormulario.value.dni,
      email: datosFormulario.value.email,
      password: datosFormulario.value.password,
    };

    await store.registrarUsuario(usuario);

    if (!store.error) {
      mensajeExito.value = 'Registrado correctamente';
    }
  } catch (error) {
    console.error('Error completo:', error);
  }
};
</script>

<style scoped>
.error-global {
  font-weight: bold;
  background-color: #ffe6e6;
  border: 1px solid red;
  padding: 0.5rem;
  margin-top: 1rem;
  border-radius: 5px;
  color: red;
}
.mensaje-exito {
  font-weight: bold;
  color: green;
  margin-top: 1rem;
}
</style>

