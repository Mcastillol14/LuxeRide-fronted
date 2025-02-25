<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Iniciar Sesión</h1>

    <Form @submit="enviarFormulario" v-slot="{ errors, isSubmitting }" class="formulario">
      <div class="mb-3">
        <Field id="email" name="email" type="email" placeholder="Correo electrónico" v-model="datosFormulario.email"
          :rules="'required|email'" :class="{ 'is-invalid': errors.email }" class="form-control" />
        <ErrorMessage name="email" class="invalid-feedback" />
      </div>

      <div class="mb-3">
        <Field id="passwordLogin" name="passwordLogin" type="password" placeholder="Contraseña"
          v-model="datosFormulario.passwordLogin" :rules="'required'" :class="{ 'is-invalid': errors.passwordLogin }"
          class="form-control" />
        <ErrorMessage name="passwordLogin" class="invalid-feedback" />
      </div>

      <button type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting" class="btn btn-primary w-100">
        {{ isSubmitting ? 'Iniciando...' : 'Iniciar sesión' }}
      </button>
    </Form>

    <div v-if="mensajeError" class="alert alert-danger mt-3">
      {{ mensajeError }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { defineRule } from 'vee-validate';
import { email } from '@vee-validate/rules';
import { useLoginUsuarioStore } from '@/stores/loginUser';
import router from '@/router';

const storeLogin = useLoginUsuarioStore();
const datosFormulario = ref({
  email: '',
  passwordLogin: ''
});

defineRule('required', (value) => (!value || value.trim() === '' ? 'Campo obligatorio' : true));
defineRule('email', (value) => (email(value) ? true : 'Correo electrónico no válido'));

const mensajeError = ref('');


const enviarFormulario = async (values, { resetForm, setSubmitting }) => {
  try {
    mensajeError.value = '';

    const usuario = {
      email: values.email,
      password: values.passwordLogin
    };

    await storeLogin.loginUsuario(usuario);

    if (!storeLogin.error) {
      resetForm();
      localStorage.setItem('token', storeLogin.token);
      router.push('/home');
    } else {
      errorServidor(storeLogin.error);
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    errorServidor(error);
  } finally {
    setSubmitting(false);
  }
};

const errorServidor = (error) => {
  console.log('Error recibido:', error);

  if (error.response) {
    const status = error.response.status;
    const message = error.response.data.message;

    if (status === 401) {
      if (message === 'Usuario no encontrado') {
        mensajeError.value = 'Email no registrado';
      } else if (message === 'Tu cuenta está bloqueada. Contacta con el soporte') {
        mensajeError.value = 'Tu cuenta está bloqueada. Contacta con el soporte';
      } else {
        mensajeError.value = 'Error desconocido. Inténtelo nuevamente.';
      }
    } else if (status === 500) {
      mensajeError.value = 'Contraseña incorrecta';
    } else {
      mensajeError.value = 'Error desconocido. Inténtelo nuevamente.';
    }
  } else {
    mensajeError.value = 'Error en la conexión con el servidor.';
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

.is-invalid {
  border-color: #dc3545;
}
</style>
