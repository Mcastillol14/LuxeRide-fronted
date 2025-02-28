<template>
  <section id="coches" class="container my-5">
    <div class="row mb-4">
      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <input v-model="matricula" type="text" class="form-control" placeholder="Filtrar por matricula"
               @input="filtraMatricula"/>
      </div>
      <div class="col-12 col-lg-4">
        <button @click="abrirModalNuevoCoche" class="btn btn-primary w-100">
          <i class="bi bi-plus-circle"></i> Añadir Nuevo Coche
        </button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered shadow-sm rounded">
        <thead class="table-dark">
        <tr>
          <th>Id</th>
          <th>Modelo</th>
          <th>Marca</th>
          <th>Matricula</th>
          <th>Licencia</th>
          <th>Usuarios</th>
          <th>Estado</th>
          <th>Disponible</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="coche in coches" :key="coche.id">
          <td>{{ coche.id }}</td>
          <td>{{ coche.modelo }}</td>
          <td>{{ coche.marca }}</td>
          <td>{{ coche.matricula }}</td>
          <td>{{ coche.licencia ? coche.licencia : 'Sin licencia asignada' }}</td>
          <td>{{ coche.usuario ? coche.usuario : 'Sin usuarios asignados' }}</td>
          <td>
            <span :class="coche.estado ? 'text-success' : 'text-danger'">
              <i :class="coche.estado ? 'bi bi-check-circle' : 'bi bi-x-circle'"></i>
              {{ coche.estado ? 'Activo' : 'Desactivado' }}
            </span>
          </td>
          <td>
            <span :class="coche.disponible ? 'text-success' : 'text-danger'">
              <i :class="coche.disponible ? 'bi bi-check-circle' : 'bi bi-x-circle'"></i>
              {{ coche.disponible ? 'Disponible' : 'No disponible' }}
            </span>
          </td>
          <td>
            <button class="btn-control btn btn-outline-success btn-sm rounded-pill mx-1"
                    @click="abrirModalAddLicencia(coche)">
              <i class="bi bi-plus-circle"></i>
            </button>
            <button class="btn-control btn btn-outline-primary btn-sm rounded-pill mx-1"
                    @click="abrirModalAddUsuario(coche)">
              <i class="bi bi-person-plus"></i>
            </button>
            <button class="btn-control btn btn-outline-danger btn-sm rounded-pill mx-1"
                    @click="abrirModalDeleteUsuario(coche)">
              <i class="bi bi-person-dash"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- Paginación -->
    <div class="pagination-container text-center mt-4">
      <button class="btn btn-outline-secondary mx-2" :disabled="listadoCochesStore.currentPage === 0"
              @click="cambiarPagina(listadoCochesStore.currentPage - 1)">
        <i class="bi bi-chevron-left"></i> Anterior
      </button>
      <span>Página {{ listadoCochesStore.currentPage + 1 }} de {{ listadoCochesStore.totalPages }}</span>
      <button class="btn btn-outline-secondary mx-2"
              :disabled="listadoCochesStore.currentPage === listadoCochesStore.totalPages - 1"
              @click="cambiarPagina(listadoCochesStore.currentPage + 1)">
        Siguiente <i class="bi bi-chevron-right"></i>
      </button>
    </div>

    <!-- Modal de añadir Coche -->
    <div v-if="mostrarModalNuevoCoche" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h5>Añadir Nuevo Coche</h5>
          <button class="btn-close" @click="cerrarModalNuevoCoche">x</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addNuevoCoche">
            <div class="mb-3">
              <label>Modelo</label>
              <input v-model="nuevoCoche.modelo" type="text" class="form-control" required>
            </div>
            <div class="mb-3">
              <label>Marca</label>
              <input v-model="nuevoCoche.marca" type="text" class="form-control" required>
            </div>
            <div class="mb-3">
              <label>Matrícula</label>
              <input v-model="nuevoCoche.matricula" type="text" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Añadir Coche</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal de añadir Licencia -->
    <div v-if="mostrarModalLicencia" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h5>Añadir Licencia a Coche</h5>
          <button class="btn-close" @click="cerrarModalLicencia">x</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addLicenciaToCoche">
            <div class="mb-3">
              <label>Número licencia</label>
              <select v-model="licenciaSeleccionada" class="form-select" required>
                <option v-for="licencia in licenciasDisponibles" :key="licencia.id" :value="licencia.id">
                  {{ licencia.numero }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Añadir</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal de add Usuario -->
    <div v-if="mostrarModalAddUsuario" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h5>Añadir Usuario a Coche</h5>
          <button class="btn-close" @click="cerrarModalAddUsuario">x</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addUsuarioToCoche">
            <div class="mb-3">
              <label>Usuario</label>
              <select v-model="usuarioSeleccionado" class="form-select" required>
                <option v-for="usuario in usuariosDisponibles" :key="usuario.id" :value="usuario.id">
                  {{ usuario.nombre }} {{ usuario.apellidos }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Añadir Usuario</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal de eliminar Usuario -->
    <div v-if="mostrarModalDeleteUsuario" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h5>Eliminar Usuario del Coche</h5>
          <button class="btn-close" @click="cerrarModalDeleteUsuario">x</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="deleteUsuarioFromCoche">
            <div class="mb-3">
              <label>Usuario</label>
              <select v-model="usuarioAEliminar" class="form-select" required>
                <option v-for="usuario in usuariosCoche" :key="usuario.id" :value="usuario.id">
                  {{ usuario.nombre }} {{ usuario.apellidos }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-danger mt-3">Eliminar Usuario</button>
          </form>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {useListadoCochesStore} from '@/stores/admin/listadoCoches';
import {useAddCocheStore} from "@/stores/admin/addCoche";
import {useAddLicenciaStore} from '@/stores/admin/addLicencia';
import {useAddUsuarioStore} from '@/stores/admin/addUsuario';
import {useDeleteUsuarioStore} from '@/stores/admin/deleteUsuario';
import debounce from 'lodash/debounce';

const listadoCochesStore = useListadoCochesStore();
const addCocheStore = useAddCocheStore();
const addLicenciaStore = useAddLicenciaStore();
const addUsuarioStore = useAddUsuarioStore();
const deleteUsuarioStore = useDeleteUsuarioStore();

const matricula = ref('');
const coches = computed(() => listadoCochesStore.coches);
const mostrarModalNuevoCoche = ref(false);
const mostrarModalLicencia = ref(false);
const mostrarModalAddUsuario = ref(false);
const mostrarModalDeleteUsuario = ref(false);
const nuevoCoche = ref({modelo: '', marca: '', matricula: ''});
const licenciaSeleccionada = ref('');
const usuarioSeleccionado = ref('');
const usuarioAEliminar = ref('');
const cocheSeleccionado = ref(null);
const licenciasDisponibles = ref([]);
const usuariosDisponibles = ref([]);
const usuariosCoche = ref([]);
const mensaje = ref('')
const mensajeTipo = ref('')

const filtraMatricula = debounce(async () => {
  await listadoCochesStore.obtenerListadoCoches(0, matricula.value);
}, 500);

onMounted(async () => {
  await listadoCochesStore.obtenerListadoCoches(0, '');
});

const cambiarPagina = async (pagina) => {
  if (pagina >= 0 && pagina < listadoCochesStore.totalPages) {
    try {
      await listadoCochesStore.obtenerListadoCoches(pagina, matricula.value);
    } catch (error) {
      console.log('Error al cambiar de página', error);
    }
  }
};

const abrirModalNuevoCoche = () => {
  mostrarModalNuevoCoche.value = true;
  mensaje.value = '';
  mensajeTipo.value = '';
};

const cerrarModalNuevoCoche = () => {
  mostrarModalNuevoCoche.value = false;
  nuevoCoche.value = {modelo: '', marca: '', matricula: ''};
};

const addNuevoCoche = async () => {
  const matriculaRegex = /^[0-9]{4} [A-Z]{3}$/;
    if(!matriculaRegex.test(nuevoCoche.value.matricula)){
      mensaje.value = 'El formato de la matricula es incorrecto. Por ejemplo, 1234 BBB';
      mensajeTipo.value = 'danger';
      return
    }
  try {
    await addCocheStore.addCoche(nuevoCoche.value);
    mensaje.value = 'Coche registrado correctamente';
    mensaje.value = 'success';

    await refrescarTabla();
  } catch (error) {
    console.error('Error al añadir nuevo coche', error);
  }
};

const abrirModalAddLicencia = async (coche) => {
  cocheSeleccionado.value = coche;
  // Aquí deberías cargar las licencias disponibles
  // licenciasDisponibles.value = await obtenerLicenciasDisponibles();
  mostrarModalLicencia.value = true;
};

const cerrarModalLicencia = () => {
  mostrarModalLicencia.value = false;
  licenciaSeleccionada.value = '';
};

const addLicenciaToCoche = async () => {
  try {
    await addLicenciaStore.addLicenciaToCoche(cocheSeleccionado.value.id, licenciaSeleccionada.value);
    await listadoCochesStore.obtenerListadoCoches(listadoCochesStore.currentPage, matricula.value);
    cerrarModalLicencia();
  } catch (error) {
    console.error('Error al añadir licencia al coche', error);
  }
};

const abrirModalAddUsuario = async (coche) => {
  cocheSeleccionado.value = coche;
  // Aquí deberías cargar los usuarios disponibles
  // usuariosDisponibles.value = await obtenerUsuariosDisponibles();
  mostrarModalAddUsuario.value = true;
};

const cerrarModalAddUsuario = () => {
  mostrarModalAddUsuario.value = false;
  usuarioSeleccionado.value = '';
};

const addUsuarioToCoche = async () => {
  try {
    await addUsuarioStore.addUsuarioToCoche(cocheSeleccionado.value.id, usuarioSeleccionado.value);
    await listadoCochesStore.obtenerListadoCoches(listadoCochesStore.currentPage, matricula.value);
    cerrarModalAddUsuario();
  } catch (error) {
    console.error('Error al añadir usuario al coche', error);
  }
};

const abrirModalDeleteUsuario = async (coche) => {
  cocheSeleccionado.value = coche;
  // Aquí deberías cargar los usuarios del coche
  // usuariosCoche.value = await obtenerUsuariosCoche(coche.id);
  mostrarModalDeleteUsuario.value = true;
};

const cerrarModalDeleteUsuario = () => {
  mostrarModalDeleteUsuario.value = false;
  usuarioAEliminar.value = '';
};

const deleteUsuarioFromCoche = async () => {
  try {
    await deleteUsuarioStore.deleteUsuarioFromCoche(cocheSeleccionado.value.id, usuarioAEliminar.value);
    await listadoCochesStore.obtenerListadoCoches(listadoCochesStore.currentPage, matricula.value);
    cerrarModalDeleteUsuario();
  } catch (error) {
    console.error('Error al eliminar usuario del coche', error);
  }
};
const refrescarTabla = async () => {
  await listadoCochesStore.obtenerListadoCoches(0, matricula.value)
  coches.value=[...listadoCochesStore.coches];
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
  z-index: 1000;
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
  margin-bottom: 15px;
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

.table-responsive {
  overflow-x: auto;
}

.table {
  min-width: 1000px;
}

.btn-control {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
