import { defineStore } from "pinia";
import axios from "axios";

export const useRegistroUsuarioStore = defineStore('datos', {
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
        const respuesta = await axios.post('http://localhost:8080/api/usuarios/registrar', usuario, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.usuario = respuesta.data;
        return respuesta.data;
      } catch (error) {
        this.error = error.response?.data || error.message;
        throw error;
      } finally {
        this.cargando = false;
      }
    }
  }
});
