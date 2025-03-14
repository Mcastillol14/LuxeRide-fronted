import { defineStore } from "pinia";
import axios from "axios";
import { useLoginAdminStore } from "../loginAdmin";
import { debounce } from "lodash";
import {API_URL} from "@/constants.js";

export const useListadoCochesStore = defineStore("listadoCochesStore", {
  state: () => ({
    coches: [],
    cargando: false,
    error: null,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10,
    totalElements: 0,
  }),
  actions: {
    async obtenerListadoCoches(page = 0, matricula = "") {
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
        const respuesta = await axios.get(`${API_URL}/api/admin/allCoches`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            size: this.pageSize,
            matricula,
          },
        });

        this.coches = respuesta.data.content;
        this.totalPages = respuesta.data.totalPages;
        this.currentPage = respuesta.data.number;
        this.totalElements = respuesta.data.totalElements;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
      } finally {
        this.cargando = false;
      }
    },
    filtarCoche: debounce(async function (matricula) {
      await this.obtenerListadoCoches(0, matricula);
    }, 300),
  },
});
