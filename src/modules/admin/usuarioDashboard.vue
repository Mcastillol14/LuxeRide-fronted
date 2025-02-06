<template>
  <section id="usuarios" class="container my-5">
    <h5 class="text-center mb-4">Usuarios</h5>
    <div class="row mb-4">
      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <input v-model="dni" type="text" class="form-control" placeholder="Filtrar por DNI" @input="filtrarUsuarios" />
      </div>
      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <select v-model="rol" class="form-control" @change="filtrarUsuarios">
          <option value="">Filtrar por rol</option>
          <option value="ROL_CLIENTE">Cliente</option>
          <option value="ROL_TAXISTA">Taxista</option>
          <option value="ROL_ADMIN">Administrador</option>
        </select>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered shadow-sm rounded">
        <thead class="table-dark">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Rol</th>
            <th class="estado-col">Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td>{{ usuario.id }}</td>
            <td>{{ usuario.nombre }}</td>
            <td>{{ usuario.apellidos }}</td>
            <td>{{ usuario.dni }}</td>
            <td>{{ usuario.email }}</td>
            <td>{{ usuario.rol }}</td>
            <td class="estado-col">
              <span :class="usuario.accountNonLocked ? 'text-success' : 'text-danger'">
                {{ usuario.accountNonLocked ? 'Activo' : 'Bloqueado' }}
              </span>
            </td>
            <td>
              <button v-if="usuario.rol !== 'ROL_ADMIN'" class="btn btn-outline-primary btn-sm rounded-pill px-4 mb-2"
                @click="editarUsuario(usuario)">
                Editar
              </button>
              <button v-if="usuario.accountNonLocked && usuario.rol !== 'ROL_ADMIN'"
                class="btn btn-outline-danger btn-sm rounded-pill px-4 mb-2" @click="desactivarCuenta(usuario.dni)">
                Desactivar
              </button>
              <button v-if="!usuario.accountNonLocked && usuario.rol !== 'ROL_ADMIN'"
                class="btn btn-outline-success btn-sm rounded-pill px-4 mb-2" @click="activarCuenta(usuario.dni)">
                Activar
              </button>
              <button v-if="usuario.rol !== 'ROL_TAXISTA' && usuario.rol !== 'ROL_ADMIN'"
                class="btn btn-outline-success btn-sm rounded-pill px-4 mb-2" @click="añadirTaxista(usuario)">
                Añadir como Taxista
              </button>
              <button v-if="usuario.rol === 'ROL_TAXISTA' && usuario.rol !== 'ROL_ADMIN'"
                class="btn btn-outline-warning btn-sm rounded-pill px-4 mb-2" @click="eliminarTaxista(usuario)">
                Eliminar de Taxista
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-container text-center mt-4">
      <button class="btn btn-outline-secondary mx-2" :disabled="listadoUsuariosStore.currentPage === 0"
        @click="cambiarPagina(listadoUsuariosStore.currentPage - 1)">
        Anterior
      </button>
      <span> Página {{ listadoUsuariosStore.currentPage + 1 }} de {{ listadoUsuariosStore.totalPages }} </span>
      <button class="btn btn-outline-secondary mx-2"
        :disabled="listadoUsuariosStore.currentPage === listadoUsuariosStore.totalPages - 1"
        @click="cambiarPagina(listadoUsuariosStore.currentPage + 1)">
        Siguiente
      </button>
    </div>

    <!-- Modal de Edición -->
    <div v-if="modalVisible" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-container">
        <div class="modal-header">
          <h5 class="modal-title">Editar Usuario</h5>
          <button type="button" class="btn-close" @click="cerrarModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input type="text" id="nombre" v-model="usuarioEdit.nombre" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="apellidos" class="form-label">Apellidos</label>
              <input type="text" id="apellidos" v-model="usuarioEdit.apellidos" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="dni" class="form-label">DNI</label>
              <input type="text" id="dni" v-model="usuarioEdit.dni" :class="{ 'is-invalid': dniError }"
                class="form-control" required @input="clearDniError" />
              <div v-if="dniError" class="text-danger">{{ dniError }}</div>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Correo Electrónico</label>
              <input type="email" id="email" v-model="usuarioEdit.email" :class="{ 'is-invalid': emailError }"
                class="form-control" required @input="clearEmailError" />
              <div v-if="emailError" class="text-danger">{{ emailError }}</div>
            </div>

            <button type="submit" class="btn btn-primary">Guardar Cambios</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useListadoUsuariosStore } from '../../stores/admin/listadoUsuarios';
import { useDesactivarCuentaStore } from '../../stores/admin/desactivarCuenta';
import { useActivarCuentaStore } from '../../stores/admin/activarCuenta';
import { useAddTaxistaStore } from '../../stores/admin/addTaxista';
import { useEliminarTaxistaStore } from '../../stores/admin/eliminarTaxista';
import { useEditarUsuarioStore } from '../../stores/admin/editarUsuario';

const listadoUsuariosStore = useListadoUsuariosStore();
const desactivarCuentaStore = useDesactivarCuentaStore();
const activarCuentaStore = useActivarCuentaStore();
const addTaxistaStore = useAddTaxistaStore();
const eliminarTaxistaStore = useEliminarTaxistaStore();
const editarUsuarioStore = useEditarUsuarioStore();

const usuarios = ref([]);
const dni = ref("");
const rol = ref("");
const modalVisible = ref(false);
const usuarioEdit = ref({});
const dniError = ref("");
const emailError = ref("");

const editarUsuario = (usuario) => {
  usuarioEdit.value = { ...usuario };
  modalVisible.value = true;
};

const cerrarModal = () => {
  modalVisible.value = false;
  dniError.value = "";
  emailError.value = "";
};

const clearDniError = () => {
  dniError.value = "";
};

const clearEmailError = () => {
  emailError.value = "";
};

const submitForm = async () => {
  const dniRegex = /^\d{8}[A-Za-z]$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!dniRegex.test(usuarioEdit.value.dni)) {
    dniError.value = "El DNI debe tener 8 números seguidos de una letra";
    return;
  }

  if (!emailRegex.test(usuarioEdit.value.email)) {
    emailError.value = "El correo electrónico no es válido";
    return;
  }

  await editarUsuarioStore.editarCuenta(usuarioEdit.value.id, usuarioEdit.value);

  if (editarUsuarioStore.error) {
    dniError.value = editarUsuarioStore.error;
    emailError.value = editarUsuarioStore.error;
    return;
  }

  await refrescarTabla();
  cerrarModal();
};

const refrescarTabla = async () => {
  await listadoUsuariosStore.obtenerListadoUsuarios();
  usuarios.value = listadoUsuariosStore.usuarios;
};

const cambiarPagina = async (pagina) => {
  await listadoUsuariosStore.obtenerListadoUsuarios(pagina, rol.value, dni.value);
  usuarios.value = listadoUsuariosStore.usuarios;
};

const filtrarUsuarios = async () => {
  await listadoUsuariosStore.obtenerListadoUsuarios(0, rol.value, dni.value);
  usuarios.value = listadoUsuariosStore.usuarios;
};

const desactivarCuenta = async (dni) => {
  await desactivarCuentaStore.desactivarCuenta(dni);
  await refrescarTabla();
};

const activarCuenta = async (dni) => {
  await activarCuentaStore.activarCuenta(dni);
  await refrescarTabla();
};

const añadirTaxista = async (usuario) => {
  await addTaxistaStore.añadirTaxista(usuario);
  await refrescarTabla();
};

const eliminarTaxista = async (usuario) => {
  await eliminarTaxistaStore.eliminarTaxista(usuario);
  await refrescarTabla();
};

onMounted(async () => {
  await refrescarTabla();
});
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

.estado-col {
  width: 100px;

}

.is-invalid {
  border-color: #dc3545;
}
</style>
