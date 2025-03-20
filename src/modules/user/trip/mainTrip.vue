<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">Solicitar Taxi</h1>
    <div class="row">
      <div class="col-md-6 mb-4">
        <ubicacionTrip titulo="Origen" @ubicacion-seleccionada="setOrigen" :disabled="deshabilitarCampos" />
      </div>
      <div class="col-md-6 mb-4">
        <ubicacionTrip titulo="Destino" @ubicacion-seleccionada="setDestino" :disabled="deshabilitarCampos" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-4">
        <servicioTrip @servicio-seleccionado="setServicio" :disabled="deshabilitarCampos" />
      </div>
      <div class="col-md-6 mb-4">
        <taxistaTrip @taxista-seleccionado="setTaxista" :disabled="deshabilitarCampos" />
      </div>
    </div>
    <div class="text-center">
      <Button label="Confirmar Viaje" icon="pi pi-check" @click="confirmarViaje" :disabled="!puedeConfirmar || procesandoViaje" />
    </div>

    <Dialog v-model:visible="mostrarModalProgreso" header="Estado del Viaje" :modal="true" :closable="false">
      <ProgressBar :value="progresoViaje" />
      <p class="mt-3">{{ estadoViajeTexto }}</p>
    </Dialog>

    <Dialog v-model:visible="mostrarModalFinal" header="Viaje Completado" :modal="true">
      <div v-if="viajeCompletado">
        <h3>Resumen del Viaje</h3>
        <p><strong>Origen:</strong> {{ viajeCompletado.origen }}</p>
        <p><strong>Destino:</strong> {{ viajeCompletado.destino }}</p>
        <p><strong>Distancia:</strong> {{ viajeCompletado.distancia }}</p>
        <p><strong>Precio Total:</strong> {{ viajeCompletado.precioTotal.toFixed(2) }}€</p>
      </div>
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
import { useViajesUsuarioStore } from '@/stores/Usuario/viajesUser.js';
import { useLoginUsuarioStore } from "@/stores/loginUser.js";
import { useUsuarioStore } from "@/stores/Usuario/infoUser.js";
import { useServiciosUserStore } from "@/stores/Usuario/serviciosUser.js";
import router from "@/router/index.js";

const viajesStore = useViajesUsuarioStore();
const loginStore = useLoginUsuarioStore();
const usuarioStore = useUsuarioStore();
const serviciosStore = useServiciosUserStore();

const origen = ref({ calle: '', ciudad: '' });
const destino = ref({ calle: '', ciudad: '' });
const servicio = ref(null);
const taxista = ref(null);
const viajeCompletado = ref(null);
const procesandoViaje = ref(false);
const deshabilitarCampos = ref(false);

const mostrarModalProgreso = ref(false);
const mostrarModalFinal = ref(false);
const progresoViaje = ref(0);
const estadoViajeTexto = ref('Esperando taxista');

const setOrigen = (ubicacion) => {
  if (!deshabilitarCampos.value) {
    origen.value = {
      calle: `Calle ${ubicacion.calle}`,
      ciudad: ubicacion.ciudad
    };
  }
};

const setDestino = (ubicacion) => {
  if (!deshabilitarCampos.value) {
    destino.value = {
      calle: `Calle ${ubicacion.calle}`,
      ciudad: ubicacion.ciudad
    };
  }
};

const setServicio = (servicioSeleccionado) => {
  if (!deshabilitarCampos.value) {
    servicio.value = servicioSeleccionado;
  }
};

const setTaxista = (taxistaSeleccionado) => {
  if (!deshabilitarCampos.value) {
    taxista.value = taxistaSeleccionado;
  }
};

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
  if (procesandoViaje.value) return;

  // Deshabilitar el botón y los campos
  procesandoViaje.value = true;
  deshabilitarCampos.value = true;

  const origenCompleto = `${origen.value.calle}, ${origen.value.ciudad}`;
  const destinoCompleto = `${destino.value.calle}, ${destino.value.ciudad}`;

  try {
    // Paso 1: Obtener la ruta usando la API de mapas
    // El registro del viaje se hará automáticamente en el store si la respuesta es 200
    const rutaObtenida = await viajesStore.obtenerRuta(origenCompleto, destinoCompleto);

    if (rutaObtenida) {
      console.log("Ruta obtenida correctamente:", viajesStore.origen, viajesStore.destino, viajesStore.distancia);

      // Guardar información básica del viaje
      localStorage.setItem('infoViaje', JSON.stringify({
        origen: viajesStore.origen,
        destino: viajesStore.destino,
        distancia: viajesStore.distancia,
        fecha_inicio: viajesStore.fecha_inicio,
        fecha_fin: viajesStore.fecha_fin,
        imagen: viajesStore.imagen
      }));

      mostrarModalProgreso.value = true;
      simularProgresoViaje();
    } else {
      console.error("Error al obtener la ruta:", viajesStore.error);
      // Reactivar el botón y los campos en caso de error
      procesandoViaje.value = false;
      deshabilitarCampos.value = false;
    }
  } catch (error) {
    console.error("Error en el proceso de confirmación:", error);
    // Reactivar el botón y los campos en caso de error
    procesandoViaje.value = false;
    deshabilitarCampos.value = false;
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

      // Cargar la información del viaje completado
      const ultimoViajeJSON = localStorage.getItem('ultimoViaje');
      if (ultimoViajeJSON) {
        viajeCompletado.value = JSON.parse(ultimoViajeJSON);
      }

      mostrarModalFinal.value = true;
    }
  }, 1000);
}

const resetearCampos = () => {
  origen.value = { calle: '', ciudad: '' }
  destino.value = { calle: '', ciudad: '' }
  servicio.value = null
  taxista.value = null
  procesandoViaje.value = false;
  deshabilitarCampos.value = false;
}

const descargarPDF = () => {
  console.log('Función para descargar PDF (aún no implementada)');

  setTimeout(()=>{
    router.push("/home")
  },2000)
}

const cerrarModalFinal = () => {
  mostrarModalFinal.value = false;
  progresoViaje.value = 0;
  estadoViajeTexto.value = 'Esperando taxista';
  viajeCompletado.value = null;

  // Limpiar datos del viaje actual
  resetearCampos();
  router.push("/home")
}

onMounted(() => {
  cargarInformacionStorage();
  serviciosStore.obtenerTodosServicios();

  // Intentar cargar datos guardados de origen y destino si existen
  const infoViajeGuardada = localStorage.getItem('infoViaje');
  if (infoViajeGuardada) {
    try {
      const infoViaje = JSON.parse(infoViajeGuardada);
      console.log("Información de viaje recuperada:", infoViaje);
    } catch (error) {
      console.error("Error al recuperar información del viaje:", error);
    }
  }
})
</script>
