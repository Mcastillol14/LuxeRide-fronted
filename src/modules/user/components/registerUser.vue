<template>
  <div>
    <h1>Registro</h1>
    <Form @submit="enviarFormulario" v-slot="{ errors }">
      <div>
        <label for="nombre">Nombre:</label>
        <Field id="nombre" name="nombre" type="text" v-model="datosFormulario.nombre" :rules="'required'" />
        <RegisterError name="nombre" />
      </div>
      <div>
        <label for="apellidos">Apellidos:</label>
        <Field id="apellidos" name="apellidos" type="text" v-model="datosFormulario.apellidos" :rules="'required'" />
        <RegisterError name="apellidos" />
      </div>
      <div>
        <label for="dni">DNI:</label>
        <Field id="dni" name="dni" type="text" v-model="datosFormulario.dni" :rules="'required|dni'" />
        <RegisterError name="dni" />
      </div>
      <div>
        <label for="correoElectronico">Correo Electrónico:</label>
        <Field id="correoElectronico" name="correoElectronico" type="email" v-model="datosFormulario.correoElectronico"
          :rules="'required|email'" />
        <RegisterError name="correoElectronico" />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <Field id="password" name="password" type="password" v-model="datosFormulario.password"
          :rules="'required|min:8'" />
        <RegisterError name="password" />
      </div>
      <div>
        <label for="confirmarPassword">Confirma la contraseña:</label>
        <Field id="confirmarPassword" name="confirmarPassword" type="password"
          v-model="datosFormulario.confirmarPassword" :rules="reglasConfirmarPassword" />
        <RegisterError name="confirmarPassword" />
      </div>
      <div>
        <Field name="aceptoTerminos" type="checkbox" v-model="datosFormulario.aceptoTerminos" :value="true"
          :rules="'requiredCheckbox'" />
        <label for="aceptoTerminos">Acepto los términos y condiciones</label>
        <RegisterError name="aceptoTerminos" />
      </div>

      <button type="submit" :disabled="Object.keys(errors).length > 0">Enviar</button>
    </Form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Field, Form } from 'vee-validate'
import { email, min } from '@vee-validate/rules'
import { defineRule } from 'vee-validate'
import RegisterError from '../../error/RegisterError.vue'

// Añadimos las reglas de validación
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

const reglasConfirmarPassword = computed(() => {
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
  nombre: '',
  apellidos: '',
  dni: '',
  correoElectronico: '',
  password: '',
  confirmarPassword: '',
  aceptoTerminos: false
});




// Controlar el envío del formulario
const enviarFormulario = (value) => {
  console.log('Formulario enviado', value);
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 0.8rem;
}
</style>
