<template>
  <section id="servicios" class="container my-5">
    <div class="row mb-4">
      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <input v-model="tipo" type="text" class="form-control" placeholder="Filtrar por tipo"
               @input="filtrarServicios"/>
      </div>
      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <button @click="abrirModalNuevoServicio" class="btn btn-primary w-100">
          <i class="bi bi-plus-circle"></i> Añadir Nuevo Servicio
        </button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered shadow-sm rounded" style="table-layout: fixed;">
        <thead class="table-dark">
        <tr>
          <th>Id</th>
          <th>Tipo</th>
          <th>Descripción</th>
          <th>Precio por kilómetro</th>
          <th style="width: 140px;">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="servicio in servicios" :key="servicio.id">
          <td>{{ servicio.id }}</td>
          <td>{{ servicio.tipo }}</td>
          <td>{{ servicio.descripcion }}</td>
          <td>{{ servicio.precioPorKm }}€</td>
          <td>
            <button class="btn-control btn btn-outline-danger btn-sm rounded-pill"
                    @click="deleteServicioMarcada(servicio.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-container text-center mt-4">
      <button class="btn btn-outline-secondary mx-2" :disabled="listadoServiciosStore.currentPage === 0"
              @click="cambiarPagina(listadoServiciosStore.currentPage - 1)">
        Anterior
      </button>
      <span>Página {{ listadoServiciosStore.currentPage + 1 }} de {{ listadoServiciosStore.totalPages }}</span>
      <button class="btn btn-outline-secondary mx-2"
              :disabled="listadoServiciosStore.currentPage === listadoServiciosStore.totalPages - 1"
              @click="cambiarPagina(listadoServiciosStore.currentPage + 1)">
        Siguiente
      </button>
    </div>
  </section>

  <!-- Modal para Nuevo Servicio -->
  <div v-if="mostrarModal" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h5>Añadir Servicio</h5>
        <button class="btn-close" @click="cerrarModal">x</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="registrarServicioNuevo">
          <div class="mb-3">
            <label for="tipoServicio">Tipo</label>
            <input
              type="text"
              class="form-control"
              id="tipoServicio"
              v-model="nuevoServicio.tipo"
              required
            >
          </div>
          <div class="mb-3">
            <label for="descripcionServicio">Descripción</label>
            <input
              type="text"
              class="form-control"
              id="descripcionServicio"
              v-model="nuevoServicio.descripcion"
              required
            >
          </div>
          <div class="mb-3">
            <label for="precioServicio">Precio por kilómetro</label>
            <input
              type="number"
              class="form-control"
              id="precioServicio"
              v-model="nuevoServicio.precioPorKm"
              step="0.01"
              min="0.01"
              required
            >
          </div>
          <button type="submit" class="btn btn-primary">Registrar Servicio</button>
        </form>
        <div v-if="mensaje" :class="['alert mt-2', mensajeTipo === 'success' ? 'alert-success' : 'alert-danger']"
             role="alert">
          {{ mensaje }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {useListadoServiciosStore} from '@/stores/admin/listadoServicios';
import {useAddServicioStore} from "@/stores/admin/addServicio.js";
import {useDeleteServicioStore} from "@/stores/admin/deleteServicio.js";
import debounce from "lodash/debounce";

const listadoServiciosStore = useListadoServiciosStore();
const addServicioStore = useAddServicioStore();

const deleteServicioStore = useDeleteServicioStore();

const servicios = computed(() => listadoServiciosStore.servicios);
const tipo = ref("");
const nuevoServicio = ref({
  tipo: '',
  descripcion: '',
  precioPorKm: ''
});

const mostrarModal = ref(false);
const mensaje = ref('');
const mensajeTipo = ref('');

const filtrarServicios = debounce(async () => {
  await listadoServiciosStore.obtenerListadoServicios(0, tipo.value);
}, 500);

onMounted(async () => {
  await listadoServiciosStore.obtenerListadoServicios(0, "");
});

const cambiarPagina = async (pagina) => {
  if (pagina >= 0 && pagina < listadoServiciosStore.totalPages) {
    try {
      await listadoServiciosStore.obtenerListadoServicios(pagina, tipo.value);
    } catch (error) {
      console.log(error);
    }
  }
};

const abrirModalNuevoServicio = () => {
  nuevoServicio.value = {tipo: '', descripcion: '', precioPorKm: ''};
  mensaje.value = '';
  mensajeTipo.value = '';
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
  nuevoServicio.value = {tipo: '', descripcion: '', precioPorKm: ''};
  mensaje.value = '';
  mensajeTipo.value = '';
};

const refrescarTabla = async () => {
  await listadoServiciosStore.obtenerListadoServicios(listadoServiciosStore.currentPage, tipo.value);
};

const registrarServicioNuevo = async () => {
  try {
    const servicioToAdd = {
      ...nuevoServicio.value,
      precioPorKm: parseFloat(nuevoServicio.value.precioPorKm).toFixed(2)
    };

    await addServicioStore.addServicio(servicioToAdd);
    mensaje.value = 'Servicio registrado correctamente';
    mensajeTipo.value = 'success';
    await refrescarTabla();
    nuevoServicio.value = {tipo: '', descripcion: '', precioPorKm: ''};
    setTimeout(() => {
      cerrarModal();
    }, 1000);
  } catch (error) {
    console.error('Error al registrar servicio:', error);
    if (error.response && error.response.status === 400) {
      mensaje.value = error.response.data || 'Error al registrar nuevo servicio';
    } else {
      mensaje.value = 'Error al registrar nuevo servicio';
    }
    mensajeTipo.value = 'danger';
  }
};

const deleteServicioMarcada = async (id) => {
  await deleteServicioStore.deleteServicio(id);
  await refrescarTabla();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  margin-top: 10px;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
