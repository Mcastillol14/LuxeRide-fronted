<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Iniciar Sesión</h1>

    <div v-if="storeLogin.mensaje" class="alert alert-danger" role="alert">
      {{ storeLogin.mensaje }}
    </div>

    <Form @submit="enviarFormulario" v-slot="{ errors }" class="formulario">
      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <Field
          id="email"
          name="email"
          type="email"
          placeholder="Correo electrónico"
          v-model="datosFormulario.email"
          :rules="'required|email'"
          :class="{ 'is-invalid': errors.email }"
          class="form-control"
          aria-describedby="emailHelp"
        />
        <loginError name="email" class="invalid-feedback" />
      </div>

      <div class="mb-3">
        <label for="passwordLogin" class="form-label">Contraseña</label>
        <Field
          id="passwordLogin"
          name="passwordLogin"
          type="password"
          placeholder="Contraseña"
          v-model="datosFormulario.passwordLogin"
          :rules="'required'"
          :class="{ 'is-invalid': errors.passwordLogin }"
          class="form-control"
          aria-describedby="passwordHelp"
        />
        <loginError name="passwordLogin" class="invalid-feedback" />
      </div>

      <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineRule, Field, Form } from 'vee-validate';
import { email } from '@vee-validate/rules';
import { datosStore } from '@/stores/loginUser';
import router from '@/router';

const storeLogin = datosStore();
const datosFormulario = ref({
  email: '',
  passwordLogin: ''
});

defineRule('required', (value) => value?.trim() ? true : 'Este campo es obligatorio');
defineRule('email', email);

const enviarFormulario = async (values, { resetForm }) => {
  try {
    storeLogin.mensaje = '';
    const usuario = { email: values.email, password: values.passwordLogin };
    await storeLogin.loginUsuario(usuario);
    if (!storeLogin.error) {
      resetForm();
      localStorage.setItem('token', storeLogin.token);
      router.push('/home');
    } else {
      storeLogin.mensaje = storeLogin.error;
    }
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    storeLogin.mensaje = error.message || 'Ha ocurrido un error. Por favor, inténtelo de nuevo.';
  }
};
</script>

<style scoped>
.formulario {
  max-width: 400px;
  margin: 0 auto;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  display: block;
}

.alert {
  margin-bottom: 20px;
}
</style>
