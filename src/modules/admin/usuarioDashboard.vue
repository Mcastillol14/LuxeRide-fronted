<template>
  <section id="usuarios" class="container my-5">
    <h2 class="text-center mb-4">Usuarios</h2>

    <div class="row mb-4">
      <div class="col-12 col-md-6 col-lg-4 mb-3 mb-md-0">
        <input v-model="dni" type="text" class="form-control" placeholder="Filtrar por DNI" @input="filtrarUsuarios" />
      </div>

      <div class="col-12 col-md-6 col-lg-4 mb-3 mb-md-0">
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
            <th>Estado de la cuenta</th>
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
            <td>
              <span :class="usuario.accountNonLocked ? 'text-success' : 'text-danger'">
                {{ usuario.accountNonLocked ? 'Activo' : 'Bloqueado' }}
              </span>
            </td>
            <td>
              <button v-if="usuario.rol !== 'ROL_ADMIN'"
                class="btn btn-outline-primary btn-sm rounded-pill px-4 mb-2 mb-sm-0">Editar</button>

              <button v-if="usuario.accountNonLocked && usuario.rol !== 'ROL_ADMIN'"
                class="btn btn-outline-danger btn-sm rounded-pill px-4 mb-2 mb-sm-0" @click="desactivarCuenta(usuario.dni)">
                Desactivar
              </button>
              <button v-if="!usuario.accountNonLocked && usuario.rol !== 'ROL_ADMIN'"
                class="btn btn-outline-success btn-sm rounded-pill px-4 mb-2 mb-sm-0" @click="activarCuenta(usuario.dni)">
                Activar
              </button>

              <button v-if="usuario.rol !== 'ROL_TAXISTA' && usuario.rol !== 'ROL_ADMIN'"
                class="btn btn-outline-success btn-sm rounded-pill px-4 mb-2 mb-sm-0" @click="añadirTaxista(usuario)">
                Añadir como Taxista
              </button>
              <button v-if="usuario.rol === 'ROL_TAXISTA' && usuario.rol !== 'ROL_ADMIN'"
                class="btn btn-outline-warning btn-sm rounded-pill px-4 mb-2 mb-sm-0" @click="eliminarTaxista(usuario)">
                Eliminar de Taxista
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <div class="pagination-container text-center mt-4">
      <button class="btn btn-outline-secondary" :disabled="listadoUsuarios.currentPage === 0"
        @click="cambiarPagina(listadoUsuarios.currentPage - 1)">
        Anterior
      </button>

      <span> Página {{ listadoUsuarios.currentPage + 1 }} de {{ listadoUsuarios.totalPages }} </span>

      <button class="btn btn-outline-secondary"
        :disabled="listadoUsuarios.currentPage === listadoUsuarios.totalPages - 1"
        @click="cambiarPagina(listadoUsuarios.currentPage + 1)">
        Siguiente
      </button>
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

const listadoUsuarios = useListadoUsuariosStore();
const desactivarCuentaStore = useDesactivarCuentaStore();
const activarCuentaStore = useActivarCuentaStore();
const addTaxistaStore = useAddTaxistaStore();
const eliminarTaxistaStore = useEliminarTaxistaStore();

const usuarios = ref([]);
const dni = ref("");
const rol = ref("");

const cambiarPagina = async (pagina) => {
  if (pagina >= 0 && pagina < listadoUsuarios.totalPages) {
    await listadoUsuarios.obtenerListadoUsuarios(pagina, rol.value, dni.value);
    usuarios.value = listadoUsuarios.usuarios;
  }
};

const filtrarUsuarios = async () => {
  await listadoUsuarios.obtenerListadoUsuarios(0, rol.value, dni.value);
  usuarios.value = listadoUsuarios.usuarios;
};

const refrescarTabla = async () => {
  await listadoUsuarios.obtenerListadoUsuarios();
  usuarios.value = listadoUsuarios.usuarios;
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
  try {
    await listadoUsuarios.obtenerListadoUsuarios();
    usuarios.value = listadoUsuarios.usuarios;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
});
</script>

