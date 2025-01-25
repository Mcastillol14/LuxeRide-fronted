<template>
  <div class="login-container">
    <h1 class="titulo">Iniciar Sesión</h1>
    <Form @submit="enviarFormulario" v-slot="{ errors }" class="formulario">
      <div class="campo">
        <Field
          id="email"
          name="email"
          type="email"
          placeholder="Correo electrónico"
          v-model="datosFormulario.email"
          :rules="'required|email'"
          :class="{ 'error-input': errors.email }"
        />
        <loginError name="email" class="error-message" />
      </div>
      <div class="campo">
        <Field
          id="passwordLogin"
          name="passwordLogin"
          type="password"
          placeholder="Contraseña"
          v-model="datosFormulario.passwordLogin"
          :rules="'required'"
          :class="{ 'error-input': errors.passwordLogin }"
        />
        <loginError name="passwordLogin" class="error-message" />
      </div>
      <button
        type="submit"
        class="boton-enviar"
      >
        Iniciar Sesión
      </button>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineRule, Field, Form } from 'vee-validate';
import { datosStore } from '@/stores/loginUser.js';
import { email } from '@vee-validate/rules';
import loginError from '../error/loginError.vue';


const storeLogin = datosStore();
const router = useRouter();

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
    const usuario = {
      email: values.email,
      password: values.passwordLogin,
    };
    await storeLogin.loginUsuario(usuario);

    if (!storeLogin.error) {
      resetForm();
      router.push('/home');
    } else {
      console.error('Error al iniciar sesión:', storeLogin.error);
    }
  } catch (error) {
    console.error('Ocurrió un error inesperado:', error);
  }
};
</script>

<style scoped src="../../assets/style/loginUser.css"></style>
