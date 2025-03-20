<template>
  <div class="container py-5">
    <Card class="p-4 shadow-sm mx-auto" style="max-width: 400px;">
      <template #content>
        <form @submit.prevent="enviarFormulario" aria-label="Formulario de inicio de sesión">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <InputText
              id="email"
              v-model="datosFormulario.email"
              class="w-100 p-inputtext-sm"
              :class="{'p-invalid': errors.email}"
              placeholder="Email"
              aria-describedby="email-help"
            />
            <small v-if="errors.email" class="p-error" id="email-help">{{ errors.email }}</small>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <Password
              id="password"
              v-model="datosFormulario.passwordLogin"
              placeholder="Contraseña"
              :toggleMask="false"
              :feedback="false"
              inputClass="w-100"
              class="w-100"
              :class="{'p-invalid': errors.passwordLogin}"
              aria-describedby="password-help"
            />
            <small v-if="errors.passwordLogin" class="p-error" id="password-help">{{ errors.passwordLogin }}</small>
          </div>

          <Button
            type="submit"
            label="Iniciar sesión"
            class="w-100 p-button-sm"
            :loading="isSubmitting"
            aria-live="polite"
          />
        </form>
      </template>
    </Card>

    <small v-if="mensajeError" class="error-message">{{ mensajeError }}</small>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLoginUsuarioStore } from '@/stores/loginUser';
import router from '@/router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Card from 'primevue/card';

const storeLogin = useLoginUsuarioStore();
const datosFormulario = ref({ email: '', passwordLogin: '' });
const mensajeError = ref('');
const errors = ref({});
const isSubmitting = ref(false);

const validarFormulario = () => {
  errors.value = {};
  if (!datosFormulario.value.email) {
    errors.value.email = 'El correo es obligatorio';
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(datosFormulario.value.email)) {
    errors.value.email = 'Correo electrónico no válido';
  }
  if (!datosFormulario.value.passwordLogin) {
    errors.value.passwordLogin = 'La contraseña es obligatoria';
  }
  return Object.keys(errors.value).length === 0;
};

const enviarFormulario = async () => {
  if (!validarFormulario()) return;

  isSubmitting.value = true;
  mensajeError.value = '';
  try {
    await storeLogin.loginUsuario({
      email: datosFormulario.value.email,
      password: datosFormulario.value.passwordLogin
    });

    if (!storeLogin.error) {
      localStorage.setItem('token', storeLogin.token);
      router.push('/home');
    } else {
      mensajeError.value = storeLogin.error;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      mensajeError.value = 'Correo o contraseña incorrectos.';
    } else {
      mensajeError.value = 'Error en la conexión con el servidor.';
    }
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};

</script>

<style scoped>
.p-inputtext-sm, .p-button-sm {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.p-invalid {
  border-color: #f44336;
  background-color: #ffe6e6;
}

.p-error {
  font-size: 0.75rem;
  color: #f44336;
  margin-top: 5px;
}

.mt-3 {
  margin-top: 1rem;
}

.text-center {
  text-align: center;
}

.card {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

:deep(.p-password-panel) {
  margin-top: 5px;
}

button:disabled {
  background-color: #dcdcdc;
}

button:disabled:hover {
  background-color: #dcdcdc;
}

input, button {
  border-radius: 4px;
  padding: 8px 12px;
}
.error-message {
  display: block;
  color: #f44336;
  font-size: 0.8rem;
  text-align: center;
  margin-top: 5px;
}
</style>
