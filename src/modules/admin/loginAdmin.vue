<template>
  <div class="login-container">
    <div class="cabeza">
      <span class="texto">
        LuxeRide Admin
      </span>
    </div>
    <h2 class="titulo-login">Panel Administrador</h2>
    <Form @submit="enviarFormulario" v-slot="{ errors }" class="formulario">
      <div class="campo">
        <Field id="email" name="email" type="email" placeholder="Correo electrónico" v-model="datosFormulario.email"
          :rules="'required|email'" :class="{ 'error-input': errors.email }" />
        <loginError name="email" class="error-message" />
      </div>
      <div class="campo">
        <Field id="passwordLogin" name="passwordLogin" type="password" placeholder="Contraseña"
          v-model="datosFormulario.passwordLogin" :rules="'required'"
          :class="{ 'error-input': errors.passwordLogin }" />
        <loginError name="passwordLogin" class="error-message" />
      </div>
      <button type="submit" class="boton-enviar">Iniciar sesión</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineRule, Field, Form } from 'vee-validate';
import { datosStore } from '@/stores/loginAdmin.js';
import { email } from '@vee-validate/rules';
import loginError from '../error/loginError.vue';
import router from '@/router';

const store = datosStore();
const errorMessage = ref('');

defineRule('required', (value) => {
  return value?.trim() ? true : 'Este campo es obligatorio';
});
defineRule('email', email);

const datosFormulario = ref({
  email: '',
  passwordLogin: '',
});

const enviarFormulario = async (values, { resetForm }) => {
  try {
    errorMessage.value = '';
    const usuario = {
      email: values.email,
      password: values.passwordLogin
    };
    await store.loginUsuario(usuario);
    if (!store.error) {
      resetForm();
      router.push('/admin/dashboard');
      localStorage.setItem('token', store.token);
    } else {
      errorMessage.value = store.error;
    }
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    errorMessage.value = error.message || 'Ha ocurrido un error. Por favor, inténtelo de nuevo.';
  }
};
</script>

<style scoped src="../../assets/style/loginAdmin.css"></style>
