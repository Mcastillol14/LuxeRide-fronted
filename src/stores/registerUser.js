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
        const respuesta = await axios.post('http://localhost:8080/api/users/register', usuario, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.usuario = respuesta.data;
        return respuesta;
      } catch (error) {
        console.error('Error completo:', error);
        this.error = error.response ? error.response.data : error.message;
        throw error;
      } finally {
        this.cargando = false;
      }
    }
  }
});

