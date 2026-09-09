import { defineStore } from "pinia";
import { postUsuario } from "./httpUsuarios";

export const datosStore = defineStore('login', {
  state: () => ({
    usuario: null,
    cargando: false,
    error: null,
  }),
  actions: {
    async loginUsuario(usuario) {
      this.cargando = true;
      this.error = null;
      try {
        const respuesta = await postUsuario('/api/usuarios/iniciar', usuario);
        this.usuario = respuesta.data;
        return respuesta;
      } catch (error) {
        this.error = error.response ? error.response.data : error.message;
        throw error;
      } finally {
        this.cargando = false;
      }
    }
  }
});
