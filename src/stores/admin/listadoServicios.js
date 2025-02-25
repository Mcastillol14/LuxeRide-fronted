import {defineStore} from "pinia";
import axios from "axios";
import {useLoginAdminStore} from "../loginAdmin";
import {debounce} from "lodash";

export const useListadoServiciosStore = defineStore("listadoServicios", {
  state: () => ({
    servicios: [],
    cargando: false,
    error: null,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10,
    totalElements: 0,
  }),
  actions: {
    async obtenerListadoServicios(page = 0, tipo = "") {
      this.cargando = true;
      this.error = null;

      const loginStore = useLoginAdminStore();
      const token = loginStore.token;

      if (!token) {
        this.error = "Token no disponible";
        console.error("Token no disponible");
        this.cargando = false;
        return;
      }

      try {
        const respuesta = await axios.get("http://localhost:8080/api/admin/allServicios", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            size: this.pageSize,
            tipo,
          },
        });

        this.servicios = respuesta.data.content;
        this.totalPages = respuesta.data.totalPages;
        this.currentPage = respuesta.data.number;
        this.totalElements = respuesta.data.totalElements;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        console.error("Error al obtener servicios:", this.error);
      } finally {
        this.cargando = false;
      }
    },
  }
})
