<template>
  <div class="container py-4">
    <Card class="p-3 shadow-sm mx-auto" style="max-width: 400px;">
      <template #content>
        <form @submit.prevent="enviarFormulario">
         <div class="d-flex gap-2">
            <div class="w-50">
              <label for="nombre" class="form-label text-sm">Nombre</label>
              <InputText id="nombre" v-model="datosFormulario.nombre" class="w-100 text-sm" :class="{'p-invalid': errors.nombre}" placeholder="Tu nombre" />
              <small v-if="errors.nombre" class="p-error">{{ errors.nombre }}</small>
            </div>

            <div class="w-50">
              <label for="apellidos" class="form-label text-sm">Apellidos</label>
              <InputText id="apellidos" v-model="datosFormulario.apellidos" class="w-100 text-sm" :class="{'p-invalid': errors.apellidos}" placeholder="Tus apellidos" />
              <small v-if="errors.apellidos" class="p-error">{{ errors.apellidos }}</small>
            </div>
          </div>

          <div class="d-flex gap-2 mt-2">
            <div class="w-50">
              <label for="dni" class="form-label text-sm">DNI</label>
              <InputText id="dni" v-model="datosFormulario.dni" class="w-100 text-sm" :class="{'p-invalid': errors.dni}" placeholder="DNI" maxlength="9" />
              <small v-if="errors.dni" class="p-error">{{ errors.dni }}</small>
            </div>

        <div class="w-50">
              <label for="email" class="form-label text-sm">Email</label>
              <InputText id="email" v-model="datosFormulario.email" class="w-100 text-sm" :class="{'p-invalid': errors.email}" placeholder="Email" />
              <small v-if="errors.email" class="p-error">{{ errors.email }}</small>
            </div>
          </div>


            <div class="mt-2">
              <label for="password" class="form-label text-sm">Contraseña</label>
              <Password id="password" v-model="datosFormulario.password" class="w-100 text-sm" :toggleMask="true" :feedback="true" :class="{'p-invalid': errors.password}" placeholder="Contraseña" />
              <small v-if="errors.password" class="p-error">{{ errors.password }}</small>
            </div>

          <Button type="submit" label="Registrarse" class="w-100 p-button-sm mt-3" :loading="isSubmitting" />

          <small v-if="mensajesError.length" class="p-error d-block mt-1 text-center text-sm">
            {{ mensajesError[0].mensaje }}
          </small>

          <Message v-if="registroExitoso" severity="success" class="mt-2 text-center text-sm">
            ¡Registro exitoso!
          </Message>
        </form>
      </template>
    </Card>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRegistroUsuarioStore } from '@/stores/registerUser';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Message from 'primevue/message';
import Card from 'primevue/card';

const registroUsuarioStore = useRegistroUsuarioStore();
const datosFormulario = ref({ nombre: '', apellidos: '', dni: '', email: '', password: '' });
const mensajesError = ref([]);
const errors = ref({});
const isSubmitting = ref(false);
const registroExitoso = ref(false);

const validarDNI = (dni) => /^[0-9]{8}[A-Z]$/i.test(dni);
const validarPassword = (password) => {
  if (password.length > 8) return 'Máximo 8 caracteres';
  if (!/\d/.test(password)) return 'Debe tener un número';
  if (!/[A-Z]/.test(password)) return 'Debe tener una mayúscula';
  return '';
};

const validarFormulario = () => {
  errors.value = {};
  if (!datosFormulario.value.nombre) errors.value.nombre = 'Obligatorio';
  if (!datosFormulario.value.apellidos) errors.value.apellidos = 'Obligatorio';
  if (!datosFormulario.value.dni) errors.value.dni = 'Obligatorio';
  else if (!validarDNI(datosFormulario.value.dni)) errors.value.dni = 'Formato incorrecto';
  if (!datosFormulario.value.email) errors.value.email = 'Obligatorio';
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(datosFormulario.value.email)) errors.value.email = 'Correo inválido';
  if (!datosFormulario.value.password) errors.value.password = 'Obligatorio';
  else {
    const errorPassword = validarPassword(datosFormulario.value.password);
    if (errorPassword) errors.value.password = errorPassword;
  }
  return Object.keys(errors.value).length === 0;
};

const enviarFormulario = async () => {
  if (!validarFormulario()) return;
  isSubmitting.value = true;
  mensajesError.value = [];
  registroExitoso.value = false;

  try {
    await registroUsuarioStore.registrarUsuario({
      nombre: datosFormulario.value.nombre,
      apellidos: datosFormulario.value.apellidos,
      dni: datosFormulario.value.dni.toUpperCase(),
      email: datosFormulario.value.email,
      password: datosFormulario.value.password
    });

    registroExitoso.value = true;
    datosFormulario.value = { nombre: '', apellidos: '', dni: '', email: '', password: '' };
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 400) {
        const errorMsg = error.response.data;
        if (typeof errorMsg === 'string') {
          if (errorMsg.includes('DNI')) mensajesError.value.push({ mensaje: 'DNI ya registrado.' });
          else if (errorMsg.includes('email')) mensajesError.value.push({ mensaje: 'Correo ya registrado.' });
          else mensajesError.value.push({ mensaje: errorMsg });
        } else {
          mensajesError.value.push({ mensaje: 'Error de validación.' });
        }
      } else if (statusCode === 500) {
        mensajesError.value.push({ mensaje: 'Error del servidor.' });
      } else {
        mensajesError.value.push({ mensaje: 'Error en el registro.' });
      }
    } else {
      mensajesError.value.push({ mensaje: 'Error de conexión.' });
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.text-sm {
  font-size: 0.85rem;
}

.p-error {
  font-size: 0.75rem;
  color: #f44336;
}
button {
  border-radius: 4px;
  padding: 8px 12px;
}

.mt-2 {
  margin-top: 0.75rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.text-center {
  text-align: center;
}

.d-flex {
  display: flex;
}

.gap-2 {
  gap: 0.5rem;
}

.w-50 {
  width: 50%;
}
</style>

