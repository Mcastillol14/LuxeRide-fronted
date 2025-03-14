<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Solicitar Taxi</h1>
    <div class="row">
      <div class="col-md-6 mb-4">
        <ubicacionTrip titulo="Origen" @ubicacion-seleccionada="setOrigen" />
      </div>
      <div class="col-md-6 mb-4">
        <ubicacionTrip titulo="Destino" @ubicacion-seleccionada="setDestino" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-4">
        <servicioTrip @servicio-seleccionado="setServicio" />
      </div>
      <div class="col-md-6 mb-4">
        <taxistaTrip @taxista-seleccionado="setTaxista" />
      </div>
    </div>
    <div class="text-center">
      <Button label="Confirmar Viaje" icon="pi pi-check" @click="confirmarViaje" :disabled="!puedeConfirmar" />
    </div>

    <Dialog v-model:visible="mostrarModalProgreso" header="Estado del Viaje" :modal="true" :closable="false">
      <ProgressBar :value="progresoViaje" />
      <p class="mt-3">{{ estadoViajeTexto }}</p>
    </Dialog>

    <Dialog v-model:visible="mostrarModalFinal" header="Viaje Completado" :modal="true">
      <p>Su viaje ha sido completado con éxito.</p>
      <template #footer>
        <Button label="Descargar PDF" icon="pi pi-file-pdf" @click="descargarPDF" />
        <Button label="Cerrar" icon="pi pi-times" @click="cerrarModalFinal" class="p-button-secondary" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ProgressBar from 'primevue/progressbar';
import ubicacionTrip from './ubicacionTrip.vue'
import servicioTrip from './servicioTrip.vue'
import taxistaTrip from './taxistaTrip.vue'
import { useRutasStore } from '@/stores/Usuario/viajesUser.js';
import { useLoginUsuarioStore } from "@/stores/loginUser.js";
import { useUsuarioStore } from "@/stores/Usuario/infoUser.js";

const rutasStore = useRutasStore();
const loginStore = useLoginUsuarioStore();
const usuarioStore = useUsuarioStore();

const origen = ref({ calle: '', ciudad: '' });
const destino = ref({ calle: '', ciudad: '' });
const servicio = ref(null);
const taxista = ref(null);

const mostrarModalProgreso = ref(false);
const mostrarModalFinal = ref(false);
const progresoViaje = ref(0);
const estadoViajeTexto = ref('Esperando taxista');

const setOrigen = (ubicacion) => origen.value = ubicacion;
const setDestino = (ubicacion) => destino.value = ubicacion;
const setServicio = (servicioSeleccionado) => servicio.value = servicioSeleccionado;
const setTaxista = (taxistaSeleccionado) => taxista.value = taxistaSeleccionado;

const puedeConfirmar = computed(() =>
  origen.value.calle && origen.value.ciudad &&
  destino.value.calle && destino.value.ciudad &&
  servicio.value && taxista.value
);

const cargarInformacionStorage = () => {
  const tokenStorage = localStorage.getItem('token');

  if (tokenStorage) {
    try {
      loginStore.token = tokenStorage;
      console.log('Token recuperado de localStorage y actualizado en el store');

      const userDataStorage = localStorage.getItem('userData');
      if (userDataStorage) {
        const userData = JSON.parse(userDataStorage);
        Object.assign(usuarioStore, userData);
        console.log('Datos de usuario recuperados de localStorage y actualizados en el store');
      } else {
        usuarioStore.obtenerInfoUsuario();
      }
    } catch (error) {
      console.error('Error al cargar datos del localStorage:', error);
    }
  } else {
    console.log('No hay token en localStorage');
  }
}

const confirmarViaje = async () => {
  const origenCompleto = `${origen.value.calle}, ${origen.value.ciudad}`;
  const destinoCompleto = `${destino.value.calle}, ${destino.value.ciudad}`;

  try {
    await rutasStore.obtenerRuta(origenCompleto, destinoCompleto);
    mostrarModalProgreso.value = true;
    simularProgresoViaje();
  } catch (error) {
    console.error('Error al confirmar el viaje:', error);
  }
};

const simularProgresoViaje = () => {
  const intervalo = setInterval(() => {
    progresoViaje.value += 10;
    if (progresoViaje.value <= 33) {
      estadoViajeTexto.value = 'Esperando taxista';
    } else if (progresoViaje.value <= 66) {
      estadoViajeTexto.value = 'En camino';
    } else {
      estadoViajeTexto.value = 'Llegando a destino';
    }

    if (progresoViaje.value >= 100) {
      clearInterval(intervalo);
      mostrarModalProgreso.value = false;
      mostrarModalFinal.value = true;
    }
  }, 1000);
};

const descargarPDF = () => {
  console.log('Función para descargar PDF (aún no implementada)');
};

const cerrarModalFinal = () => {
  mostrarModalFinal.value = false;
  progresoViaje.value = 0;
  estadoViajeTexto.value = 'Esperando taxista';
};

onMounted(() => {
  cargarInformacionStorage();
})
</script>
