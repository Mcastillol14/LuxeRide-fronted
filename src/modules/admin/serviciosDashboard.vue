<template>
  <section id="servicios" class="container my-5">
    <h5 class="text-center mb-4">Servicios</h5>
    <div class="row mb-4">
      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <select v-model="estado" class="form-control" @change="filtrarServicios">
          <option value="">Filtrar por estado</option>
          <option value="true">Activo</option>
          <option value="false">Desactivado</option>
        </select>
      </div>
      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <button @click="abrirModalNuevoServicio" class="btn btn-primary w-100">
          Añadir Nuevo Servicio
        </button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered shadow-sm rounded">
        <thead class="table-dark">
          <tr>
            <th>Id</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th style="width: 150px;">Estado</th>
            <th>Precio por kilómetro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="servicio in servicios" :key="servicio.id">
            <td>{{ servicio.id }}</td>
            <td>{{ servicio.tipo }}</td>
            <td>{{ servicio.descripcion }}</td>
            <td>
              <span :class="servicio.estado ? 'text-success' : 'text-danger'">
                {{ servicio.estado ? 'Activo' : 'Desactivado' }}
              </span>
            </td>
            <td>{{ servicio.precioPorKm }}€</td>
            <td>
              <button
                :class="['btn', 'btn-sm', 'rounded-pill', 'px-4', 'mb-2', servicio.estado ? 'btn-outline-danger' : 'btn-outline-success']"
                @click="servicio.estado ? desactivarServicio(servicio.id) : activarServicio(servicio.id)">
                {{ servicio.estado ? 'Desactivar' : 'Activar' }}
              </button>
              <button class="btn btn-outline-primary btn-sm rounded-pill px-4 mb-2" @click="editarServicio(servicio)">
                Editar
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

  <!-- Modal para Nuevo/Editar Servicio -->
  <div v-if="modalVisible" class="modal-overlay" @click.self="cerrarModal">
    <div class="modal-container">
      <div class="modal-header">
        <h5 class="modal-title">{{ modoEdicion ? 'Editar Servicio' : 'Añadir Nuevo Servicio' }}</h5>
        <button type="button" class="btn-close" @click="cerrarModal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="tipo" class="form-label">Tipo</label>
            <input type="text" id="tipo" v-model="servicioEdit.tipo" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="descripcion" class="form-label">Descripción</label>
            <input type="text" id="descripcion" v-model="servicioEdit.descripcion" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="precioPorKm" class="form-label">Precio por kilómetro</label>
            <input type="number" id="precioPorKm" v-model="servicioEdit.precioPorKm"
              :class="{ 'is-invalid': precioKmError }" class="form-control" required step="any" min="0"
              @input="clearPrecioKmError">
            <div v-if="precioKmError" class="text-danger">{{ precioKmError }}</div>
          </div>
          <button type="submit" class="btn btn-primary">{{ modoEdicion ? 'Guardar Cambios' : 'Registrar Servicio'
            }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useListadoServiciosStore } from '@/stores/admin/listadoServicios';
import { useRegistrarServicioStore } from '@/stores/admin/registrarServicio';
import { useActivarServicioStore } from '@/stores/admin/activarServicio';
import { useDesactivarServicioStore } from '@/stores/admin/desactivarServicio';
import { useEditarServicioStore } from '@/stores/admin/editarServicio';

const listadoServiciosStore = useListadoServiciosStore();
const registrarServicioStore = useRegistrarServicioStore();
const activarServicioStore = useActivarServicioStore();
const desactivarServicioStore = useDesactivarServicioStore();
const editarServicioStore = useEditarServicioStore();

const servicios = ref([]);
const estado = ref("");
const modalVisible = ref(false);
const modoEdicion = ref(false);
const servicioEdit = ref({
  tipo: '',
  descripcion: '',
  precioKm: 0,
});
const precioKmError = ref("");

onMounted(async () => {
  await refrescarTabla();
});

const refrescarTabla = async () => {
  await listadoServiciosStore.obtenerListadoServicios();
  servicios.value = listadoServiciosStore.servicios;
};

const cambiarPagina = async (pagina) => {
  if (pagina >= 0 && pagina < listadoServiciosStore.totalPages) {
    await listadoServiciosStore.obtenerListadoServicios(pagina, estado.value);
    servicios.value = listadoServiciosStore.servicios;
  }
};

const filtrarServicios = async () => {
  await listadoServiciosStore.obtenerListadoServicios(0, estado.value);
  servicios.value = listadoServiciosStore.servicios;
};

const activarServicio = async (id) => {
  await activarServicioStore.activarServicio(id);
  await refrescarTabla();
};

const desactivarServicio = async (id) => {
  await desactivarServicioStore.desactivarServicio(id);
  await refrescarTabla();
};

const abrirModalNuevoServicio = () => {
  modoEdicion.value = false;
  servicioEdit.value = { tipo: '', descripcion: '', precioPorKm: 0 };
  modalVisible.value = true;
};

const editarServicio = (servicio) => {
  modoEdicion.value = true;
  servicioEdit.value = { ...servicio };
  modalVisible.value = true;
};

const cerrarModal = () => {
  modalVisible.value = false;
  precioKmError.value = "";
};

const clearPrecioKmError = () => {
  precioKmError.value = "";
};

const submitForm = async () => {
  const precioKmRegex = /^\d+(\.\d{1,2})?$/;
  if (!precioKmRegex.test(servicioEdit.value.precioPorKm)) {
    precioKmError.value = "El precio por kilómetro debe ser un número con hasta 2 decimales";
    return;
  }

  try {
    if (modoEdicion.value) {
      await editarServicioStore.editarServicio(servicioEdit.value.id, servicioEdit.value);
    } else {
      await registrarServicioStore.registrarServicio(servicioEdit.value);
    }
    await refrescarTabla();
    cerrarModal();
  } catch (error) {
    console.error('Error al procesar el servicio:', error);
  }
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

.is-invalid {
  border-color: #dc3545;
}
</style>
