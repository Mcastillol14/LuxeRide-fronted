import { defineStore } from "pinia";
import { postUsuario } from "../api/usuariosApi";

export const datosStore = defineStore('registro', {
  state: () => ({
    usuario: null,
    cargando: false,
    error: null,
  }),
  actions: {
    async registrarUsuario(usuario) {
      this.cargando = true;
      this.error = null;
      try {
        const respuesta = await postUsuario('/api/usuarios/registrar', usuario);
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
