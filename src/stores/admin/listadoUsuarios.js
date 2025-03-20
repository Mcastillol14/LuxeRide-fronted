import { defineStore } from "pinia";
import axios from "axios";
import { useLoginAdminStore } from "../loginAdmin";
import debounce from "lodash/debounce";
import {API_URL} from "@/constants.js";

export const useListadoUsuariosStore = defineStore("listadoUsuarios", {
  state: () => ({
    usuarios: [],
    cargando: false,
    error: null,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10,
    totalElements: 0,
  }),
  actions: {
    async obtenerListadoUsuarios(page = 0, dni = "") {
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
        const respuesta = await axios.get(`${API_URL}/api/admin/allUsuarios`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            size: this.pageSize,
            dni,
          },
        });
        this.usuarios = respuesta.data.content
        this.totalPages = respuesta.data.totalPages
        this.currentPage = respuesta.data.number
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        console.error("Error al obtener usuarios:", this.error);
      } finally {
        this.cargando = false;
      }
    },

    // Usamos debounce para controlar las solicitudes de búsqueda
    filtrarUsuarios:debounce(async function (dni) {
      await this.obtenerListadoUsuarios(0, dni);
    }, 100),
  },
});
