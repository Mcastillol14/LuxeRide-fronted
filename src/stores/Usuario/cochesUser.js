import { defineStore } from "pinia";
import axios from "axios";
import { useLoginUsuarioStore } from "@/stores/loginUser.js";
import {API_URL} from "@/constants.js";

export const useCochesUser = defineStore("coches", {
  state: () => ({
    cochesEnServicio: [],
    cargando: false,
    error: null,
  }),

  actions: {
    async obtenerCochesUser() {
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
        const response = await axios.get(`${API_URL}/api/usuarios/enServicio`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });


        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          this.cochesEnServicio = response.data.map(coche => ({
            id: coche.id,
            descripcion: `${coche.marca} ${coche.modelo} - ${coche.matricula}`,
            taxista: coche.usuarios && coche.usuarios.length > 0 ? coche.usuarios[0] : null
          }));
        } else {
          this.cochesEnServicio = [];
        }

        this.cargando = false;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        this.cargando = false;
      }
    },
  },

  getters: {
    getCochesEnServicio: (state) => state.cochesEnServicio,
  },
});
