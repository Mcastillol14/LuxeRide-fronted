<template>
  <div class="container-cliente">
    <headerUser @show-profile="mostrarPerfil" @logout="logoutB" />
    <main class="container py-4">
      <heroUser @book-taxi="irReserva" />
      <noticiasUser />
    </main>

    <modalUser
      v-if="estaVisible"
      v-model="estaVisible"
      :userData="userData"
      @hide="visibilidadModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import { useUsuarioStore } from '@/stores/Usuario/infoUser.js';
import { useLoginUsuarioStore } from "@/stores/loginUser.js";
import headerUser from './headerUser.vue';
import heroUser from './heroUser.vue';
import noticiasUser from './noticiasUser.vue';
import modalUser from './modalUser.vue';
import router from "@/router/index.js";

const estaVisible = ref(false);
const userData = ref(null);

const usuarioStore = useUsuarioStore();
const cerrarSesion = useLoginUsuarioStore();

const cargarInformacionStorage = () => {
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    try {
      userData.value = JSON.parse(storedData);
    } catch (error) {
      console.error(error);
      localStorage.removeItem('userData');
    }
  }
};

const guardarInformacionStorage = (data) => {
  if (data && typeof data === 'object') {
    localStorage.setItem('userData', JSON.stringify(data));
  } else {
    console.error('Intentando guardar datos inválidos en localStorage:', data);
  }
};

const mostrarPerfil = async () => {
  try {
    if (userData.value && userData.value.id) {
      estaVisible.value = true;
      return;
    }

    await usuarioStore.obtenerInfoUsuario();



    if (usuarioStore.nombre) {
      userData.value = {
        id: usuarioStore.id,
        nombre: usuarioStore.nombre,
        apellidos: usuarioStore.apellidos,
        dni: usuarioStore.dni,
        email: usuarioStore.email
      };


      guardarInformacionStorage(userData.value);
      estaVisible.value = true;
    }
  } catch (error) {
    console.error('Error al cargar los datos del usuario:', error);
  }
};

const visibilidadModal = () => {
  estaVisible.value = false;
};

const logoutB = () => {
  cerrarSesion.logoutUsuario();
  localStorage.removeItem('userData');
  router.push('/');
  userData.value = null;
};

const irReserva = () => {
  router.push("/trip");
};

onMounted(() => {
  cargarInformacionStorage();
});
</script>

<style scoped>

</style>
