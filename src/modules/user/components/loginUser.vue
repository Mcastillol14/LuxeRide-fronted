<template>
  <div>
    <h1>Inicio Sesion</h1>
    <Form @submit="enviarFormulario" v-slot="{ errors }">
      <div>
        <label for="email">Email:</label>
        <Field id="email" name="email" type="email" v-model="datosFormulario.email" :rules="'required|email'" />
        <loginError name="email" />
      </div>
      <div>
        <label for="passwordLogin">Contraseña:</label>
        <Field id="passwordLogin" name="passwordLogin" type="passwordLogin" v-model="datosFormulario.passwordLogin" :rules="'required'" />
        <loginError name="passwordLogin" />
      </div>
      <div>
        <button type="submit" :disabled="Object.keys(errors).length > 0">Enviar</button>
      </div>
    </Form>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { defineRule, Field, Form } from 'vee-validate'
import { email} from '@vee-validate/rules'
import loginError from '../../error/loginError.vue';

//Añadimos las reglas de validación
defineRule('required', (value) => {
  if (!value || value.trim() === '') {
    return 'Este campo es obligatorio';
  }
  return true;
});

defineRule('email', email);

const datosFormulario = ref({
  email: '',
  passwordLogin: ''
});

const enviarFormulario = (value) => {
  console.log('Formulario enviado', value);
};


</script>

<style  scoped src="../../../assets/style/loginUser.css"></style>
