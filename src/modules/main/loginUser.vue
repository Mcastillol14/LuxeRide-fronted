<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Iniciar Sesión</h1>
    <Form @submit="enviarFormulario" v-slot="{ errors }" class="formulario">

      <div class="mb-3">
        <Field
          id="email"
          name="email"
          type="email"
          placeholder="Correo electrónico"
          v-model="datosFormulario.email"
          :rules="'required|email'"
          :class="{ 'is-invalid': errors.email }"
          class="form-control"
        />
        <loginError name="email" class="invalid-feedback" />
      </div>

      <div class="mb-3">
        <Field
          id="passwordLogin"
          name="passwordLogin"
          type="password"
          placeholder="Contraseña"
          v-model="datosFormulario.passwordLogin"
          :rules="'required'"
          :class="{ 'is-invalid': errors.passwordLogin }"
          class="form-control"
        />
        <loginError name="passwordLogin" class="invalid-feedback" />
      </div>

      <button
        type="submit"
        :disabled="Object.keys(errors).length > 0 || storeLogin.cargando"
        class="btn btn-primary w-100"
      >
        {{ storeLogin.cargando ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
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
      localStorage.setItem('token', storeLogin.token);
    } else {
      console.error('Error al iniciar sesión:', storeLogin.error);
    }
  } catch (error) {
    console.error('Ocurrió un error inesperado:', error);
  }
};
</script>

<style scoped>
.formulario {
  max-width: 400px;
  margin: 0 auto;
}

.alert {
  text-align: center;
}

.invalid-feedback {
  display: block;
}
</style>
