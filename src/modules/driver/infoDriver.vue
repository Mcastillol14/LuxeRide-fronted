<template>
  <Card>
    <template #title>Información del Taxista</template>
    <template #content>
      <div v-if="usuarioStore.cargando">
        <ProgressSpinner />
      </div>
      <div v-else-if="usuarioStore.error">
        <Message severity="error">{{ usuarioStore.error }}</Message>
      </div>
      <div v-else>
        <p><strong>Nombre:</strong> {{ usuarioStore.nombre }} {{ usuarioStore.apellidos }}</p>
        <p><strong>DNI:</strong> {{ usuarioStore.dni }}</p>
        <p><strong>Email:</strong> {{ usuarioStore.email }}</p>
        <p><strong>ID de Taxista:</strong> {{ usuarioStore.id }}</p>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { onMounted } from 'vue';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import { useUsuarioStore } from '@/stores/Usuario/infoUser.js';
import { useLoginUsuarioStore } from '@/stores/loginUser.js';

const usuarioStore = useUsuarioStore();
const loginStore = useLoginUsuarioStore();

onMounted(async () => {
  const token = loginStore.token || localStorage.getItem('token');

  if (!loginStore.token && token) {
    loginStore.token = token;
  }

  if (token && !usuarioStore.id) {
    await usuarioStore.obtenerInfoUsuario();
  }
});
</script>
