<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Registro</h1>
    <Form @submit="enviarFormulario" v-slot="{ errors, isSubmitting }" class="formulario">
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
          :class="{ 'is-invalid': errors.dni || serverErrors.dni }"
          class="form-control" />
        <ErrorMessage name="dni" class="invalid-feedback" />
        <div v-if="serverErrors.dni" class="invalid-feedback">{{ serverErrors.dni }}</div>
      </div>

      <div class="mb-3">
        <Field id="email" name="email" placeholder="Correo electrónico" type="email"
          v-model="datosFormulario.email"
          :rules="'required|email'"
          :class="{ 'is-invalid': errors.email || serverErrors.email }"
          class="form-control" />
        <ErrorMessage name="email" class="invalid-feedback" />
        <div v-if="serverErrors.email" class="invalid-feedback">{{ serverErrors.email }}</div>
      </div>

      <div class="mb-3">
        <Field id="password" name="password" placeholder="Contraseña" type="password"
          v-model="datosFormulario.password"
          :rules="'required|passwordMin'"
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

      <button
        type="submit"
        :disabled="Object.keys(errors).length > 0 || isSubmitting"
        class="btn btn-primary w-100"
      >
        {{ isSubmitting ? 'Enviando...' : 'Enviar' }}
      </button>
    </Form>

    <div v-if="mensajeExito" class="alert alert-success mt-3">
      {{ mensajeExito }}
    </div>
    <div v-if="mensajeError" class="alert alert-danger mt-3">
      {{ mensajeError }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { email } from '@vee-validate/rules';
import { defineRule } from 'vee-validate';
import { useRegistroUsuarioStore } from '../../stores/registerUser';

const store = useRegistroUsuarioStore();

defineRule('required', (value) => {
  if (!value || value.trim() === '') {
    return 'Campo obligatorio';
  }
  return true;
});

defineRule('passwordMin', (value) => {
  if (!value || value.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres';
  }
  return true;
});

defineRule('requiredCheckbox', (value) => {
  if (value !== true) {
    return 'Debes aceptar los términos y condiciones';
  }
  return true;
});

defineRule('email', (value) => {
  if (!email(value)) {
    return 'Correo electrónico no válido';
  }
  return true;
});

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
const mensajeError = ref('');
const serverErrors = ref({
  dni: '',
  email: ''
});

const enviarFormulario = async (values, { resetForm, setSubmitting }) => {
  try {
    mensajeExito.value = '';
    mensajeError.value = '';
    serverErrors.value = { dni: '', email: '' };

    const usuario = {
      nombre: values.name,
      apellidos: values.lastName,
      dni: values.dni,
      email: values.email,
      password: values.password,
    };

    await store.registrarUsuario(usuario);

    if (!store.error) {
      mensajeExito.value = 'Registrado correctamente';
      resetForm();
    } else {
      handleServerError(store.error);
    }
  } catch (error) {
    console.error('Error en el componente:', error);
    handleServerError(error);
  } finally {
    setSubmitting(false);
  }
};

const handleServerError = (error) => {
  console.log('Error recibido:', error);

  if (error && error.response && error.response.data) {
    const errorData = error.response.data;
    console.log('Datos del error:', errorData);

    if (typeof errorData === 'string') {
      if (errorData === 'El DNI y el correo ya existen') {
        serverErrors.value.dni = 'Este DNI ya está registrado';
        serverErrors.value.email = 'Este correo electrónico ya está registrado';
      } else if (errorData.toLowerCase().includes('dni')) {
        serverErrors.value.dni = 'Este DNI ya está registrado';
      } else if (errorData.toLowerCase().includes('correo')) {
        serverErrors.value.email = 'Este correo electrónico ya está registrado';
      } else {
        mensajeError.value = errorData;
      }
    } else if (typeof errorData === 'object') {
      if (errorData.dni) {
        serverErrors.value.dni = errorData.dni;
      }
      if (errorData.email) {
        serverErrors.value.email = errorData.email;
      }
      if (!serverErrors.value.dni && !serverErrors.value.email) {
        mensajeError.value = 'Error en el registro. Por favor, revise los datos e intente nuevamente.';
      }
    }
  } else {
    mensajeError.value = 'Ocurrió un error al procesar la solicitud. Por favor, inténtelo de nuevo.';
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

