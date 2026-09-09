<template>
  <div class="registro-container">
    <h1 class="titulo">Registro</h1>
    <Form @submit="enviarFormulario" v-slot="{ errors }" class="formulario">
      <div class="campo">
        <Field id="name" placeholder="Nombre" name="name" type="text"
          v-model="datosFormulario.name"
          :rules="'required'"
          :class="{ 'error-input': errors.name }" />
        <ErrorMessage name="name" class="error-message" />
      </div>

      <div class="campo">
        <Field id="lastName" name="lastName" placeholder="Apellidos" type="text"
          v-model="datosFormulario.lastName"
          :rules="'required'"
          :class="{ 'error-input': errors.lastName }" />
        <ErrorMessage name="lastName" class="error-message" />
      </div>

      <div class="campo">
        <Field id="dni" name="dni" placeholder="DNI" type="text"
          v-model="datosFormulario.dni"
          :rules="'required|dni'"
          :class="{ 'error-input': errors.dni || (store.error && store.error.toLowerCase().includes('dni')) }" />
        <ErrorMessage name="dni" class="error-message" />
      </div>

      <div class="campo">
        <Field id="email" name="email" placeholder="Correo electrónico" type="email"
          v-model="datosFormulario.email"
          :rules="'required|email'"
          :class="{ 'error-input': errors.email || (store.error && store.error.toLowerCase().includes('correo')) }" />
        <ErrorMessage name="email" class="error-message" />
      </div>

      <div class="campo">
        <Field id="password" name="password" placeholder="Contraseña" type="password"
          v-model="datosFormulario.password"
          :rules="'required|min:8'"
          :class="{ 'error-input': errors.password }" />
        <ErrorMessage name="password" class="error-message" />
      </div>

      <div class="campo">
        <Field id="confirmPassword" name="confirmPassword" placeholder="Confirmar contraseña"
          type="password"
          v-model="datosFormulario.confirmPassword"
          :rules="reglasConfirmPassword"
          :class="{ 'error-input': errors.confirmPassword }" />
        <ErrorMessage name="confirmPassword" class="error-message" />
      </div>

      <div class="campo-checkbox">
        <Field name="aceptoTerminos" type="checkbox"
          v-model="datosFormulario.aceptoTerminos"
          :value="true"
          :rules="'requiredCheckbox'" />
        <label for="aceptoTerminos">Acepto los términos y condiciones</label>
        <ErrorMessage name="aceptoTerminos" class="error-message" />
      </div>

      <button type="submit" :disabled="Object.keys(errors).length > 0 || store.cargando" class="boton-enviar">
        {{ store.cargando ? 'Enviando...' : 'Enviar' }}
      </button>
    </Form>

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
import { datosStore } from '../../stores/registerUser';
import ErrorMessage from '../error/registerError.vue';

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

const enviarFormulario = async (values, { resetForm }) => {
  try {
    mensajeExito.value = '';
    const usuario = {
      nombre: datosFormulario.value.name,
      apellidos: datosFormulario.value.lastName,
      dni: datosFormulario.value.dni,
      email: datosFormulario.value.email,
      password: datosFormulario.value.password,
    };

    await store.registrarUsuario(usuario);

    if (!store.error) {
      mensajeExito.value = 'Registrado correctamente';
      resetForm();
    }
  } catch (error) {
    console.error('Error en el componente:', error);
  }
};
</script>

<style scoped src="../../assets/style/registerUser.css">

</style>
