<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Registro</h1>
    <Form @submit="enviarFormulario" v-slot="{ errors }" class="formulario">

      <div class="mb-3">
        <Field id="name" placeholder="Nombre" name="name" type="text"
          v-model="datosFormulario.name"
          :rules="'required'"
          :class="{ 'is-invalid': errors.name }"
          class="form-control" />
        <ErrorMessage name="name" class="invalid-feedback" />
      </div>

      <div class="mb-3">
        <Field id="lastName" name="lastName" placeholder="Apellidos" type="text"
          v-model="datosFormulario.lastName"
          :rules="'required'"
          :class="{ 'is-invalid': errors.lastName }"
          class="form-control" />
        <ErrorMessage name="lastName" class="invalid-feedback" />
      </div>

      <div class="mb-3">
        <Field id="dni" name="dni" placeholder="DNI" type="text"
          v-model="datosFormulario.dni"
          :rules="'required|dni'"
          :class="{ 'is-invalid': errors.dni || (store.error && store.error.toLowerCase().includes('dni')) }"
          class="form-control" />
        <ErrorMessage name="dni" class="invalid-feedback" />
      </div>

      <div class="mb-3">
        <Field id="email" name="email" placeholder="Correo electrónico" type="email"
          v-model="datosFormulario.email"
          :rules="'required|email'"
          :class="{ 'is-invalid': errors.email || (store.error && store.error.toLowerCase().includes('correo')) }"
          class="form-control" />
        <ErrorMessage name="email" class="invalid-feedback" />
      </div>

      <div class="mb-3">
        <Field id="password" name="password" placeholder="Contraseña" type="password"
          v-model="datosFormulario.password"
          :rules="'required|min:8'"
          :class="{ 'is-invalid': errors.password }"
          class="form-control" />
        <ErrorMessage name="password" class="invalid-feedback" />
      </div>

      <div class="mb-3">
        <Field id="confirmPassword" name="confirmPassword" placeholder="Confirmar contraseña"
          type="password"
          v-model="datosFormulario.confirmPassword"
          :rules="reglasConfirmPassword"
          :class="{ 'is-invalid': errors.confirmPassword }"
          class="form-control" />
        <ErrorMessage name="confirmPassword" class="invalid-feedback" />
      </div>

      <div class="form-check mb-3">
        <Field name="aceptoTerminos" type="checkbox"
          v-model="datosFormulario.aceptoTerminos"
          :value="true"
          :rules="'requiredCheckbox'"
          class="form-check-input" />
        <label for="aceptoTerminos" class="form-check-label">Acepto los términos y condiciones</label>
        <ErrorMessage name="aceptoTerminos" class="invalid-feedback" />
      </div>

      <button type="submit" :disabled="Object.keys(errors).length > 0 || store.cargando" class="btn btn-primary w-100">
        {{ store.cargando ? 'Enviando...' : 'Enviar' }}
      </button>
    </Form>

    <div v-if="mensajeExito" class="alert alert-success mt-3">
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

<style scoped>
.formulario {
  max-width: 500px;
  margin: 0 auto;
}

.alert {
  text-align: center;
}

.invalid-feedback {
  display: block;
}
</style>
