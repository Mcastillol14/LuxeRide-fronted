<template>
  <section id="coches" class="container my-5">
    <div class="row mb-4">
      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <input v-model="matricula" type="text" class="form-control" placeholder="Filtrar por matricula" @input="filtraMatricula"/>
      </div>
      <div class="col-12 col-lg-4">
        <button @click="abrirModalNuevoCoche" class="btn btn-primary w-100">
          <i class="bi bi-plus-circle"></i>Añadir Nuevo Coche
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
        <td>{{coche.marca}}</td>
        <td>{{coche.matricula}}</td>
        <td>{{ coche.licencia ? coche.licencia : 'Sin licencia asignada' }}</td>
        <td>{{coche.usuario ? coche.usuario:'Sin usuarios asignados'}}</td>
        <td>
          <span :class="coche.estado ? 'text-success' : 'text-danger'">
            <i :class="coche.estado ? 'bi bi-check-circle' : 'bi bi-x-circle'"></i>
            {{coche.estado ? 'Activo' : 'Desactivado'}}
          </span>
        </td>
        <td>
          <span :class="coche.disponible ? 'text-success' : 'text-danger'">
            <i :class="coche.disponible ? 'bi bi-check-circle' : 'bi bi-x-circle'"></i>
            {{coche.disponible ? 'Disponible' : 'No disponible'}}
          </span>
        </td>
        <td>
          <button v-if="coche.estado" class="btn-control btn btn-outline-warning btn-sm rounded-pill"
                  @click="desactivarCocheMarcada(coche.id)">
            <i class="bi bi-lock"></i>
          </button>
          <button v-if="!coche.estado" class="btn-control btn btn-outline-success btn sm rounded-pill"
                  @click="activarCocheMarcada(coche.id)">
            <i class="bi bi-unlock"></i>
          </button>
          <button class="btn-control btn btn-outline-success btn sm rounded-pill"
          @click="abrirModalAddLicencia"
          ></button>
          <button class="btn-control btn btn-outline-success btn sm rounded-pill"
                  @click="abirMoldalAddUsuario"
          ></button>
          <button class="btn-control btn btn-outline-success btn sm rounded-pill"
                  @click="abrirModalDeleteUsuario"
          ></button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
    <!-- Paginación -->

    <div class="pagination-container text-center mt-4">
      <button class="btn btn-outline-secondary mx-2" :disabled="listadoCochesSotre.currentPage===0"
      @click="cambiarPagina(listadoCochesStore.currentPage - 1)">
        <i class="bi bi-chevron-left"></i>Anterior
      </button>
      <span>Página {{listadoCochesStore.currentPage + 1}} de {{listadoCochesStore.totalPages}}</span>
      <button class="btn btn-outline-secondary mx-2" :disabled="listadoCochesStore.currentPage===listadoCochesStore.totalPages - 1"
      @click="cambiarPagina(listadoCochesStore.currentPage + 1)">
        Siguiente <i class="bi bi-chevron-right"></i>
      </button>
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
              <label>Numero licencia</label>
              <select name="" id=""></select>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Añadir</button>
          </form>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
</script>

<style scoped></style>

