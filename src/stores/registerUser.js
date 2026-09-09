import { defineStore } from "pinia";
import axios from "axios";

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
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const respuesta = await axios.post(`${apiUrl}/api/usuarios/registrar`, usuario, {
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
