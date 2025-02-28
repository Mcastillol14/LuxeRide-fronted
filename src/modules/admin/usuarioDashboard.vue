<template>
  <section id="usuarios" class="container my-5">
    <div class="row mb-4">
      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <input v-model="dni" type="text" class="form-control" placeholder="Filtrar por DNI" @input="filtrarUsuarios" />
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered shadow-sm rounded">
        <thead class="table-dark">
        <tr>
          <th class="id-column">Id</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th style="width: 120px;">DNI</th>
          <th>Email</th>
          <th style="width: 120px;">Rol</th>
          <th class="estado-col">Estado</th>
          <th style="width: 140px;">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td class="id-column">{{ usuario.id }}</td>
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.apellidos }}</td>
          <td>{{ usuario.dni }}</td>
          <td>{{ usuario.email }}</td>
          <td>{{ usuario.rol }}</td>
          <td class="estado-col">
              <span :class="usuario.accountNonLocked ? 'text-success' : 'text-danger'">
                <i :class="usuario.accountNonLocked ? 'bi bi-check-circle' : 'bi bi-x-circle'"></i>
                {{ usuario.accountNonLocked ? 'Activo' : 'Bloqueado' }}
              </span>
          </td>
          <td>
            <button v-if="usuario.rol !== 'ROL_ADMIN'" class="btn btn-outline-primary btn-sm rounded-pill mx-1"
                    @click="abrirModalEdicion(usuario)">
              <i class="bi bi-pencil"></i>
            </button>
            <button v-if="usuario.accountNonLocked && usuario.rol !== 'ROL_ADMIN'"
                    class="btn btn-outline-danger btn-sm rounded-pill mx-1" @click="bloquearCuenta(usuario.id)">
              <i class="bi bi-lock"></i>
            </button>
            <button v-if="!usuario.accountNonLocked && usuario.rol !== 'ROL_ADMIN'"
                    class="btn btn-outline-success btn-sm rounded-pill mx-1" @click="desbloquearCuenta(usuario.id)">
              <i class="bi bi-unlock"></i>
            </button>
            <button v-if="usuario.rol !== 'ROL_TAXISTA' && usuario.rol !== 'ROL_ADMIN'"
                    class="btn btn-outline-success btn-sm rounded-pill mx-1" @click="addTaxista(usuario.id)">
              <i class="bi bi-person-plus"></i>
            </button>
            <button v-if="usuario.rol === 'ROL_TAXISTA' && usuario.rol !== 'ROL_ADMIN'"
                    class="btn btn-outline-warning btn-sm rounded-pill mx-1" @click="deleteTaxista(usuario.id)">
              <i class="bi bi-person-dash"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginación -->
    <div class="pagination-container text-center mt-4">
      <button class="btn btn-outline-secondary mx-2" :disabled="listadoUsuariosStore.currentPage === 0"
              @click="cambiarPagina(listadoUsuariosStore.currentPage - 1)">
        <i class="bi bi-chevron-left"></i> Anterior
      </button>
      <span> Página {{ listadoUsuariosStore.currentPage + 1 }} de {{ listadoUsuariosStore.totalPages }} </span>
      <button class="btn btn-outline-secondary mx-2"
              :disabled="listadoUsuariosStore.currentPage === listadoUsuariosStore.totalPages - 1"
              @click="cambiarPagina(listadoUsuariosStore.currentPage + 1)">
        Siguiente <i class="bi bi-chevron-right"></i>
      </button>
    </div>

    <!-- Modal de edición -->
    <div v-if="usuarioEditado" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h5>Editar Usuario</h5>
          <button class="btn-close" @click="cerrarModal">×</button>
        </div>
        <div class="modal-body">
          <label>Nombre:</label>
          <input v-model="usuarioEditado.nombre" type="text" class="form-control mb-2" />

          <label>Apellidos:</label>
          <input v-model="usuarioEditado.apellidos" type="text" class="form-control mb-2" />

          <label>DNI:</label>
          <input v-model="usuarioEditado.dni" type="text" class="form-control mb-2" />

          <label>Email:</label>
          <input v-model="usuarioEditado.email" type="email" class="form-control mb-2" />

          <button class="btn btn-success mt-3" @click="guardarCambios">Guardar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useListadoUsuariosStore } from '../../stores/admin/listadoUsuarios';
import { useBloquearCuentaStore } from '../../stores/admin/bloquearCuenta';
import { useDesbloquearCuentaStore } from '../../stores/admin/desbloquearCuenta';
import { useAddTaxistaStore } from '../../stores/admin/addTaxista';
import { useDeleteTaxistaStore } from '../../stores/admin/deleteTaxista';
import { useEditarUsuarioStore } from '@/stores/admin/editarUsuario';
import debounce from "lodash/debounce";

const listadoUsuariosStore = useListadoUsuariosStore();
const bloquearCuentaStore = useBloquearCuentaStore();
const desbloquearCuentaStore = useDesbloquearCuentaStore();
const addTaxistaStore = useAddTaxistaStore();
const deleteTaxistaStore = useDeleteTaxistaStore();
const editarUsuarioStore = useEditarUsuarioStore();


const dni = ref("");
const usuarioEditado = ref(null);
const usuarios=computed(()=>listadoUsuariosStore.usuarios)

const filtrarUsuarios = debounce(async () => {
  await listadoUsuariosStore.obtenerListadoUsuarios(0, dni.value);
  usuarios.value = [...listadoUsuariosStore.usuarios];
}, 500);

onMounted(async () => {
  await listadoUsuariosStore.obtenerListadoUsuarios(0, "");
  usuarios.value = [...listadoUsuariosStore.usuarios];
});

const cambiarPagina = async (pagina) => {
  if(pagina >= 0 && pagina<listadoUsuariosStore.totalPages){
    try{
      await listadoUsuariosStore.obtenerListadoUsuarios(pagina,dni.value)
      usuarios.value=listadoUsuariosStore.usuarios
    }catch(error){
      console.log('Error al cambiar de pagina',error)
    }
  }
};

const bloquearCuenta = async (id) => {
  await bloquearCuentaStore.bloquearCuenta(id);
  await refrescarTabla();
};

const desbloquearCuenta = async (id) => {
  await desbloquearCuentaStore.desbloquearCuenta(id);
  await refrescarTabla();
};

const addTaxista = async (id) => {
  await addTaxistaStore.addTaxista(id);
  await refrescarTabla();
};

const deleteTaxista = async (id) => {
  await deleteTaxistaStore.deleteTaxista(id);
  await refrescarTabla();
};

const refrescarTabla = async () => {
  await listadoUsuariosStore.obtenerListadoUsuarios(0, dni.value);
  usuarios.value = [...listadoUsuariosStore.usuarios];
};

const abrirModalEdicion = (usuario) => {
  usuarioEditado.value = { ...usuario };
};

const cerrarModal = () => {
  usuarioEditado.value = null;
};

const guardarCambios = async () => {
  await editarUsuarioStore.editarCuenta(usuarioEditado.value.id, usuarioEditado.value);
  setTimeout(()=>{
    cerrarModal();
  },1000)
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

.table-responsive {
  overflow-x: auto;
}

.table {
  min-width: 1000px;
}

.table td {
  word-wrap: break-word;
  word-break: break-word;
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
  width: 125px;
}

.id-column {
  width: 1%;
  white-space: nowrap;
}
</style>
