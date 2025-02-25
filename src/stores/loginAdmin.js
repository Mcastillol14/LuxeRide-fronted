import {defineStore} from "pinia";
import axios from "axios";

export const useLoginAdminStore = defineStore("datos", {
  state: () => ({
    usuario: null,
    cargando: false,
    error: null,
    token: localStorage.getItem("token") || null,
    mensaje: null
  }),
  actions: {
    async loginUsuario(usuario) {
      this.cargando = true;
      this.error = null;
      this.mensaje = null;
      try {
        const respuesta = await axios.post("http://localhost:8080/api/usuarios/iniciar", usuario, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.usuario = respuesta.data;
        this.token = respuesta.data.token;
        localStorage.setItem("token", this.token);
        return respuesta.data;
      } catch (error) {
        this.error = error.response?.data || error.message;
        throw error;
      } finally {
        this.cargando = false;
      }
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "datos",
        storage: localStorage,
        paths: ["usuario", "token"],
      },
    ],
  },
});
