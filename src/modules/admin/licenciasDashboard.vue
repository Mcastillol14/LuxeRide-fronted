<template>
  <section id="licencias" class="container my-5">
    <h5 class="text-center mb-4">Licencias</h5>
    <div class="row mb-4">
      <div class="col-12 col-md-6 col-lg-4 mb-3 mb-md-0">
        <input v-model="numero" type="text" class="form-control" placeholder="Filtrar por número de licencia"
          @input="filtrarLicencias" />
      </div>
      <div class="col-12 col-lg-4">
        <button @click="abrirModalNuevaLicencia" class="btn btn-primary w-100">
          Añadir Nueva Licencia
        </button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered shadow-sm rounded">
        <thead class="table-dark">
          <tr>
            <th>Id</th>
            <th style="width: 150px;">Estado</th>
            <th>Número de licencia</th>
            <th>Coche al que pertenece</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
  <tr v-for="licencia in licencias" :key="licencia.id">
    <td>{{ licencia.id }}</td>
    <td>
      <span :class="licencia.estado ? 'text-success' : 'text-danger'">
        {{ licencia.estado ? 'Activa' : 'Desactivada' }}
      </span>
    </td>
    <td>{{ licencia.numero }}</td>
    <td>
      <span v-if="licencia.coche">{{ licencia.coche.matricula }}</span>
      <span v-else>No asignado</span>
    </td>
    <td>
      <button
        :class="['btn', 'btn-sm', 'rounded-pill', 'px-4', 'mb-2', 'mb-sm-0', licencia.estado ? 'btn-outline-danger' : 'btn-outline-success']"
        @click="licencia.estado ? desactivarLicencia(licencia.id) : activarLicencia(licencia.id)"
        :aria-label="licencia.estado ? 'Desactivar licencia' : 'Activar licencia'"
      >
        {{ licencia.estado ? 'Desactivar' : 'Activar' }}
      </button>
    </td>
  </tr>
</tbody>
      </table>
    </div>
    <div class="pagination-container text-center mt-4">
      <button class="btn btn-outline-secondary mx-2" :disabled="listadoLicencias.currentPage === 0"
        @click="cambiarPagina(listadoLicencias.currentPage - 1)">Anterior</button>
      <span> Página {{ listadoLicencias.currentPage + 1 }} de {{ listadoLicencias.totalPages }}</span>
      <button class="btn btn-outline-secondary mx-2"
        :disabled="listadoLicencias.currentPage === listadoLicencias.totalPages - 1"
        @click="cambiarPagina(listadoLicencias.currentPage + 1)">
        Siguiente
      </button>
    </div>

    <div v-if="mostrarModal" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-container">
        <div class="modal-header">
          <h5 class="modal-title">Añadir Nueva Licencia</h5>
          <button type="button" class="btn-close" @click="cerrarModal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="registrarNuevaLicencia">
            <div class="mb-3">
              <label for="numeroLicencia" class="form-label">Número de Licencia</label>
              <input type="text" class="form-control" id="numeroLicencia" v-model="nuevaLicencia.numero" required>
            </div>
            <button type="submit" class="btn btn-primary">Registrar Licencia</button>
          </form>
          <div v-if="mensaje" :class="['alert', mensajeTipo === 'success' ? 'alert-success' : 'alert-danger']"
            role="alert">
            {{ mensaje }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useListadoLicenciasStore } from '@/stores/admin/listadoLicencias';
import { useRegistrarLicenciaStore } from '@/stores/admin/registrarLicencia';
import { useDesactivarLicenciaStore } from '@/stores/admin/desactivarLicencia';
import { useActivarLicenciaStore } from '@/stores/admin/activarLicencia';

const listadoLicencias = useListadoLicenciasStore();
const registrarLicencia = useRegistrarLicenciaStore();
const desactivarLicenciaStore = useDesactivarLicenciaStore();
const activarLicenciaStore = useActivarLicenciaStore();

const licencias = ref([]);
const estado = ref("");
const numero = ref("");
const nuevaLicencia = ref({
  numero: '',
});
const mostrarModal = ref(false);
const mensaje = ref('');
const mensajeTipo = ref('');

onMounted(async () => {
  try {
    await listadoLicencias.obtenerListadoLicencias();
    licencias.value = listadoLicencias.licencias;
  } catch (error) {
    console.error('Error al obtener licencias:', error);
  }
});

const cambiarPagina = async (pagina) => {
  if (pagina >= 0 && pagina < listadoLicencias.totalPages) {
    try {
      await listadoLicencias.obtenerListadoLicencias(pagina, estado.value, numero.value);
      licencias.value = listadoLicencias.licencias;
    } catch (error) {
      console.error('Error al cambiar de página:', error);
    }
  }
};

const filtrarLicencias = async () => {
  try {
    await listadoLicencias.obtenerListadoLicencias(0, estado.value, numero.value);
    licencias.value = listadoLicencias.licencias;
  } catch (error) {
    console.error('Error al filtrar licencias:', error);
  }
};

const refrescarTabla = async () => {
  try {
    await listadoLicencias.obtenerListadoLicencias();
    licencias.value = listadoLicencias.licencias;
  } catch (error) {
    console.error('Error al refrescar la tabla:', error);
  }
};

const desactivarLicencia = async (id) => {
  try {
    await desactivarLicenciaStore.desactivarLicencia(id);
    await refrescarTabla();
  } catch (error) {
    console.error('Error al desactivar licencia:', error);
  }
};

const activarLicencia = async (id) => {
  try {
    await activarLicenciaStore.activarLicencia(id);
    await refrescarTabla();
  } catch (error) {
    console.error('Error al activar licencia:', error);
  }
};

const abrirModalNuevaLicencia = () => {
  nuevaLicencia.value = { numero: '' };
  mensaje.value = '';
  mensajeTipo.value = '';
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
  nuevaLicencia.value = { numero: '' };
  mensaje.value = '';
  mensajeTipo.value = '';
};

const registrarNuevaLicencia = async () => {
  const licenciaRegex = /^\d{4}-\d{4}$/;
  if (!licenciaRegex.test(nuevaLicencia.value.numero)) {
    mensaje.value = 'El formato del número de licencia es incorrecto. Por ejemplo, 1234-1234.';
    mensajeTipo.value = 'danger';
    return;
  }

  try {
    await registrarLicencia.registrarLicencia(nuevaLicencia.value);
    mensaje.value = 'Licencia registrada correctamente';
    mensajeTipo.value = 'success';
    await refrescarTabla();
  } catch (error) {
    if (error.response && error.response.status === 409) {
      mensaje.value = 'El número de licencia ya existe';
      mensajeTipo.value = 'danger';
    } else {
      mensaje.value = 'Error al registrar nueva licencia';
      mensajeTipo.value = 'danger';
    }
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

.alert {
  margin-top: 10px;
}
</style>
