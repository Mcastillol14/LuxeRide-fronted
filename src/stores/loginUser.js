import { defineStore } from "pinia";
import axios from "axios";

export const datosStore = defineStore('login', {
  state: () => ({
    usuario: null,
    cargando: false,
    error: null,
    token: null,
    mensaje: null
  }),
  actions: {
    async loginUsuario(usuario) {
      this.cargando = true;
      this.error = null;
      this.mensaje = null;
      try {
        const respuesta = await axios.post('https://luxeride-backend.onrender.com/api/usuarios/iniciar', usuario, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.usuario = respuesta.data;
        this.token = respuesta.data.token;
        return respuesta;
      } catch (error) {
        if (error.response && error.response.status === 500) {
          this.mensaje = "Tu cuenta está desactivada. Contacta con el soporte.";
        } else {
          this.error = error.response ? error.response.data.error : error.message;
        }
        throw error;
      } finally {
        this.cargando = false;
      }
    }
  }
});
