import { defineStore } from "pinia";
import axios from "axios";

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
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const respuesta = await axios.post(`${apiUrl}/api/usuarios/iniciar`, usuario, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
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
