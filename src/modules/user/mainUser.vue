<template>
  <div class="container-cliente">
    <headerUser @show-profile="showUserProfile" @logout="handleLogout" />
    <main class="container py-4">
      <heroUser @book-taxi="navigateToBooking" />
      <noticiasUser />
    </main>

    <modalUser
      v-if="isProfileVisible"
      v-model="isProfileVisible"
      :userData="userData"
      @hide="handleHideModal"
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

const isProfileVisible = ref(false);
const userData = ref(null);

const usuarioStore = useUsuarioStore();
const cerrarSesion = useLoginUsuarioStore();

const loadUserDataFromStorage = () => {
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    try {
      userData.value = JSON.parse(storedData);
      console.log('Datos cargados desde localStorage:', userData.value);
    } catch (error) {
      console.error('Error al parsear datos de localStorage:', error);
      localStorage.removeItem('userData');
    }
  }
};

const saveUserDataToStorage = (data) => {
  if (data && typeof data === 'object') {
    localStorage.setItem('userData', JSON.stringify(data));
      console.log('Datos guardados en localStorage:', data);
  } else {
    console.error('Intentando guardar datos inválidos en localStorage:', data);
  }
};

const showUserProfile = async () => {
  try {
    // Si ya tenemos datos y el ID está presente, mostrar el modal directamente
    if (userData.value && userData.value.id) {
      console.log('Usando datos existentes con ID:', userData.value.id);
      isProfileVisible.value = true;
      return;
    }

    // Si no tenemos datos o falta el ID, obtener datos frescos
    console.log('Obteniendo datos frescos del usuario');
    await usuarioStore.obtenerInfoUsuario();

    // Verificar que tenemos un ID después de la llamada a la API
    console.log('ID obtenido del store:', usuarioStore.id);

    if (usuarioStore.nombre) {
      // Crear objeto userData asegurando que el ID esté incluido
      userData.value = {
        id: usuarioStore.id, // Asegurarse de que el ID esté primero para depuración
        nombre: usuarioStore.nombre,
        apellidos: usuarioStore.apellidos,
        dni: usuarioStore.dni,
        email: usuarioStore.email
      };

      // Verificar que el objeto userData tiene un ID
      if (userData.value.id === undefined || userData.value.id === null) {
        console.warn('El ID es null o undefined después de asignarlo desde el store');
      } else {
        console.log('ID asignado correctamente a userData:', userData.value.id);
      }

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
  cerrarSesion.logoutUsuario();
  localStorage.removeItem('userData');
  router.push('/');
  userData.value = null;
};

const navigateToBooking = () => {
  router.push("/trip");
};

onMounted(() => {
  loadUserDataFromStorage();
});
</script>

<style scoped>

</style>
