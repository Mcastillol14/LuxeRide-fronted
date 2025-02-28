<template>
  <section id="licencias" class="container my-5">
    <div class="row mb-4">
      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <input v-model="numero" type="text" class="form-control" placeholder="Filtrar por número"
               @input="filtrarLicencias"/>
      </div>
      <div class="col-12 col-lg-4">
        <button @click="abrirModalNuevaLicencia" class="btn btn-primary w-100">
          <i class="bi bi-plus-circle"></i> Añadir Nueva Licencia
        </button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered shadow-sm rounded">
        <thead class="table-dark">
        <tr>
          <th>Id</th>
          <th>Numero</th>
          <th style="width: 140px">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="licencia in licencias" :key="licencia.id">
          <td class="id-column">{{ licencia.id }}</td>
          <td>{{ licencia.numero }}</td>
          <td class="text-center">
            <button class="btn-control btn btn-outline-primary btn-sm rounded-pill mx-1"
                    @click="abrirModalEdicion(licencia)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn-control btn btn-outline-danger btn-sm rounded-pill mx-1"
                    @click="deleteLicenciaMarcada(licencia.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- Paginación -->
    <div class="pagination-container text-center mt-4">
      <button class="btn btn-outline-secondary mx-2" :disabled="listadoLicenciasStore.currentPage === 0"
              @click="cambiarPagina(listadoLicenciasStore.currentPage - 1)">
        <i class="bi bi-chevron-left"></i> Anterior
      </button>
      <span> Página {{ listadoLicenciasStore.currentPage + 1 }} de {{ listadoLicenciasStore.totalPages }} </span>
      <button class="btn btn-outline-secondary mx-2"
              :disabled="listadoLicenciasStore.currentPage === listadoLicenciasStore.totalPages - 1"
              @click="cambiarPagina(listadoLicenciasStore.currentPage + 1)">
        Siguiente <i class="bi bi-chevron-right"></i>
      </button>
    </div>
    <!-- Modal de edición -->
    <div v-if="mostrarModalEdicion" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h5>Editar Licencia</h5>
          <button class="btn-close" @click="cerrarModal">x</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="guardarEdicionLicencia">
            <div class="mb-3">
              <label for="editLicenciaNumero" class="form-label">Número</label>
              <input v-model="licenciaEditada.numero" type="text" class="form-control" id="editLicenciaNumero"
                     required/>
            </div>
            <button type="submit" class="btn btn-success mt-3" :disabled="editarLicenciaStore.cargando">
              {{ editarLicenciaStore.cargando ? 'Guardando...' : 'Guardar' }}
            </button>
          </form>
          <div v-if="editarLicenciaStore.error" class="alert alert-danger mt-3" role="alert">
            {{ editarLicenciaStore.error }}
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de add licencia -->
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h5>Añadir Licencia</h5>
          <button class="btn-close" @click="cerrarModalAdd">x</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="registrarLicenciaNueva">
            <div class="mb-3">
              <label>Número Licencia</label>
              <input type="text" class="form-control" id="numeroLicencia" v-model="nuevaLicencia.numero" required>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Registrar Licencia</button>
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
import {ref, onMounted, computed} from 'vue'
import {useListadoLicenciasStore} from '@/stores/admin/listadoLicencias';
import {useAddLicenciaStore} from '@/stores/admin/addLicencia';
import {useEditarLicenciaStore} from '@/stores/admin/editarLicencia';
import {useDeleteLicenciaStore} from '@/stores/admin/deleteLicencia';
import {debounce} from 'lodash';

const listadoLicenciasStore = useListadoLicenciasStore();
const addLicenciaStore = useAddLicenciaStore();
const editarLicenciaStore = useEditarLicenciaStore();
const deleteLicenciaStore = useDeleteLicenciaStore();

const numero = ref("")
const licencias = computed(() => listadoLicenciasStore.licencias)
const nuevaLicencia = ref({numero: '',})
const mostrarModal = ref(false)
const mostrarModalEdicion = ref(false)
const mensaje = ref('')
const mensajeTipo = ref('')
const licenciaEditada = ref(null)

const filtrarLicencias = debounce(async () => {
  await listadoLicenciasStore.filtrarLicencia(numero.value);
  licencias.value = [...listadoLicenciasStore.licencias];
}, 500)

onMounted(async () => {
  await listadoLicenciasStore.obtenerListadoLicencias(0, "")
  licencias.value = [...listadoLicenciasStore.licencias]
})

const cambiarPagina = async (pagina) => {
  if (pagina >= 0 && pagina < listadoLicenciasStore.totalPages) {
    try {
      await listadoLicenciasStore.obtenerListadoLicencias(pagina, numero.value)
    } catch (error) {
      console.log('Error al cambiar de pagina', error)
    }
  }
}
const refrescarTabla = async () => {
  await listadoLicenciasStore.obtenerListadoLicencias(0, numero.value)
  licencias.value = [...listadoLicenciasStore.licencias]
}

const abrirModalNuevaLicencia = () => {
  nuevaLicencia.value = {numero: ''};
  mensaje.value = '';
  mensajeTipo.value = '';
  mostrarModal.value = true;
}
const cerrarModalAdd = () => {
  mostrarModal.value = false;
  nuevaLicencia.value = {numero: ''};
  mensaje.value = '';
  mensajeTipo.value = '';
}

const registrarLicenciaNueva = async () => {
  const licenciaRegex = /^\d{4}-\d{4}$/;
  if (!licenciaRegex.test(nuevaLicencia.value.numero)) {
    mensaje.value = 'El formato del número de licencia es incorrecto. Por ejemplo, 1234-1234.';
    mensajeTipo.value = 'danger';
    return;
  }

  try {
    await addLicenciaStore.addLicencia(nuevaLicencia.value);
    mensaje.value = 'Licencia registrada correctamente';
    mensajeTipo.value = 'success';
    await refrescarTabla();
    setTimeout(() => {
      cerrarModalAdd();
    }, 1000)
  } catch (error) {
    if (error.response && error.response.status === 400) {
      mensaje.value = 'El número de licencia ya existe';
      mensajeTipo.value = 'danger';
    } else {
      mensaje.value = 'Error al registrar nueva licencia';
      mensajeTipo.value = 'danger';
    }
  }
}
const abrirModalEdicion = (licencia) => {
  licenciaEditada.value = {...licencia};
  mostrarModalEdicion.value = true;
}

const cerrarModal = () => {
  licenciaEditada.value = null;
  mostrarModalEdicion.value = false;
  editarLicenciaStore.error = null;
}

const guardarEdicionLicencia = async () => {
  if (!licenciaEditada.value) return;

  const licenciaRegex = /^\d{4}-\d{4}$/;
  if (!licenciaRegex.test(licenciaEditada.value.numero)) {
    editarLicenciaStore.error = 'El formato del número de licencia es incorrecto. Por ejemplo, 1234-1234.';
    return;
  }

  try {
    await editarLicenciaStore.editarLicencia(licenciaEditada.value.id, {
      numero: licenciaEditada.value.numero
    });
    await refrescarTabla();
    setTimeout(() => {
      cerrarModal();
    }, 1000)
  } catch (error) {
    console.error('Error al editar la licencia:', error);
  }
}
const deleteLicenciaMarcada = async (id) => {
  await deleteLicenciaStore.deleteLicencia(id);
  await refrescarTabla();
}
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

.table-responsive {
  overflow-x: auto;
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
