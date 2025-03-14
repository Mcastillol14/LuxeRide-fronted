<template>
  <div class="taxista-dashboard container py-5">
    <h1 class="text-center mb-4">Panel de Taxista</h1>
    <div class="row">
      <div class="col-md-6 mb-4">
        <inforDriver />
      </div>
      <div class="col-md-6 mb-4">
        <estadoDriver
          :enServicio="cocheStore.enServicio"
          :cocheSeleccionado="cocheStore.cocheActual"
          @buscar-coche="buscarCoche"
          @seleccionar-coche="seleccionarCoche"
          @liberar-coche="liberarCoche"
        />
      </div>
    </div>
    <div class="text-center mt-4">
      <Button label="Cerrar sesión" icon="pi pi-sign-out" @click="logout" class="p-button-danger" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import estadoDriver from './estadoDriver.vue'
import inforDriver from './infoDriver.vue'
import { useUsuarioStore } from '@/stores/Usuario/infoUser.js';
import { useCocheStore } from '@/stores/Taxista/cochesDriver.js';
import { useLoginUsuarioStore } from '@/stores/loginUser.js';

const router = useRouter();
const usuarioStore = useUsuarioStore();
const cocheStore = useCocheStore();
const loginStore = useLoginUsuarioStore();

onMounted(async () => {
  const token = loginStore.token || localStorage.getItem('token');
  if (!token) {
    router.push('/driver');
    return;
  }

  if (!loginStore.token && token) {
    loginStore.token = token;
  }

  if (!usuarioStore.id) {
    await usuarioStore.obtenerInfoUsuario();
  }
});

const buscarCoche = async () => {
  const taxistaId = usuarioStore.id;
  if (taxistaId) {
    await cocheStore.obtenerCochesDisponibles(taxistaId);
  } else {
    console.error('ID del taxista no disponible');
  }
};

const seleccionarCoche = async (coche) => {
  const taxistaId = usuarioStore.id;
  if (taxistaId && coche) {
    await cocheStore.ponerEnServicio(coche.id, taxistaId);
  }
};

const liberarCoche = async () => {
  if (cocheStore.cocheActual) {
    await cocheStore.liberarCoche(cocheStore.cocheActual.id);
  }
};

const logout = async () => {
  if (cocheStore.enServicio && cocheStore.cocheActual) {
    await cocheStore.liberarCoche(cocheStore.cocheActual.id);
  }

  loginStore.logoutUsuario();

  router.push('/driver');
};
</script>

<style scoped>
.taxista-dashboard {
  max-width: 900px;
  margin: 0 auto;
}
</style>
