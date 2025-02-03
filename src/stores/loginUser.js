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
        const respuesta = await axios.post('http://localhost:8080/api/usuarios/iniciar', usuario, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.usuario = respuesta.data;
        this.token=respuesta.data.token;
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
