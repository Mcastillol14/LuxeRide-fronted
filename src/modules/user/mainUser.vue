<template>
  <div class="container-cliente">
    <headerUser @show-profile="showUserProfile" @logout="handleLogout" />
    <main class="container py-4">
      <heroUser @book-taxi="navigateToBooking" />
      <noticiasUser />
    </main>

    <modalUser
      v-if="userData"
      v-model="isProfileVisible"
      :userData="userData"
      @hide="handleHideModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUsuarioStore } from '@/stores/Usuario/infoUser.js';
import {useLoginUsuarioStore} from "@/stores/loginUser.js";
import headerUser from './headerUser.vue';
import heroUser from './heroUser.vue';
import noticiasUser from './noticiasUser.vue';
import modalUser from './modalUser.vue';
import router from "@/router/index.js";


const isProfileVisible = ref(false);
const userData = ref(null);

const usuarioStore = useUsuarioStore();
const cerrarSesion=useLoginUsuarioStore();


const loadUserDataFromStorage = () => {
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    userData.value = JSON.parse(storedData);
    console.log('Datos cargados desde localStorage:', userData.value);
  }
};

const saveUserDataToStorage = (data) => {
  localStorage.setItem('userData', JSON.stringify(data));
  console.log('Datos guardados en localStorage');
};

const showUserProfile = async () => {
  try {
    if (userData.value) {
      isProfileVisible.value = true;
      return;
    }

    await usuarioStore.obtenerInfoUsuario();

    if (usuarioStore.nombre) {
      userData.value = {
        nombre: usuarioStore.nombre,
        apellidos: usuarioStore.apellidos,
        dni: usuarioStore.dni,
        email: usuarioStore.email,
      };

      saveUserDataToStorage(userData.value);

      isProfileVisible.value = true;
    } else {
      console.error('Los datos del usuario no están disponibles en el store');
      alert('No se pudieron cargar los datos del usuario');
    }
  } catch (error) {
    console.error('Error al cargar los datos del usuario:', error);
    alert('Error al cargar los datos del usuario');
  }
};

const handleHideModal = () => {
  isProfileVisible.value = false;
};

const handleLogout = () => {
  cerrarSesion.logoutUsuario()
  localStorage.removeItem('userData');
  router.push('/');
  userData.value = null;
};

const navigateToBooking = () => {
  router.push("/trip")
};

onMounted(() => {
  console.log('Componente principal montado');
  loadUserDataFromStorage(); // Cargar datos al montar el componente
});
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
