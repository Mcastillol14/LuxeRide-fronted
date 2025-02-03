<template>
  <div class="login-container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow p-4">
      <div class="text-center">
        <h2 class="fw-bold">LuxeRide Admin</h2>
        <p class="text-muted">Panel Administrador</p>
      </div>
      <Form @submit="enviarFormulario" v-slot="{ errors }">
        <div class="mb-3">
          <label for="email" class="form-label">Correo electrónico</label>
          <Field id="email" name="email" type="email" class="form-control" v-model="datosFormulario.email" :rules="'required|email'" :class="{'is-invalid': errors.email}" />
          <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
        </div>
        <div class="mb-3">
          <label for="passwordLogin" class="form-label">Contraseña</label>
          <Field id="passwordLogin" name="passwordLogin" type="password" class="form-control" v-model="datosFormulario.passwordLogin" :rules="'required'" :class="{'is-invalid': errors.passwordLogin}" />
          <div v-if="errors.passwordLogin" class="invalid-feedback">{{ errors.passwordLogin }}</div>
        </div>
        <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
      </Form>
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';
import { defineRule, Field, Form } from 'vee-validate';
import { email } from '@vee-validate/rules';
import { datosStore } from '../../stores/loginUser';
import router from '@/router';

const store = datosStore();
const errorMessage = ref('');

defineRule('required', (value) => value?.trim() ? true : 'Este campo es obligatorio');
defineRule('email', email);

const datosFormulario = ref({
  email: '',
  passwordLogin: ''
});

const enviarFormulario = async (values, { resetForm }) => {
  try {
    errorMessage.value = '';
    const usuario = { email: values.email, password: values.passwordLogin };
    await store.loginUsuario(usuario);
    if (!store.error) {
      resetForm();
      console.log("Token recibido:", store.token);
      localStorage.setItem('token', store.token);

      // Log antes de la redirección
      console.log("Redirigiendo a /admin/dashboard");

      nextTick(() => {
        router.replace('/admin/dashboard');
      });
    } else {
      errorMessage.value = store.error;
    }
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    errorMessage.value = error.message || 'Ha ocurrido un error. Por favor, inténtelo de nuevo.';
  }
};


</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
}

.card {
  border-radius: 10px;
}

.fw-bold {
  font-weight: bold;
}

.invalid-feedback {
  display: block;
}
</style>
