import { defineStore } from "pinia";
import axios from "axios";
import { useLoginUsuarioStore } from "@/stores/loginUser.js";
import {API_URL} from "@/constants.js";

export const useServiciosUserStore = defineStore("serviciosUser", {
  state: () => ({
    servicios: [],
    cargando: false,
    error: null,
  }),

  actions: {
    async obtenerTodosServicios() {
      this.cargando = true;
      this.error = null;

      const loginStore = useLoginUsuarioStore();
      let token = loginStore.token;

      if (!token) {
        token = localStorage.getItem('token');
        if (token) {
          loginStore.token = token;
        }
      }

      if (!token) {
        this.error = "Token no disponible";
        this.cargando = false;
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/usuarios/allServicios`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        this.servicios = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
      } finally {
        this.cargando = false;
      }
    },
  },

  getters: {
    getServicios: (state) => state.servicios,
  },
});
