import { defineStore } from "pinia";
import axios from "axios";

import {API_URL} from "@/constants.js";
export const useRegistroUsuarioStore = defineStore('registroUsuarioStore', {
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
        const respuesta = await axios.post(`${API_URL}/api/usuarios/registrar`, usuario, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.usuario = respuesta.data;
        return respuesta.data;
      } catch (error) {
        console.error('Error en registrarUsuario:', error);

        if (error.response) {
          this.error = {
            status: error.response.status,
            data: error.response.data,
            message: typeof error.response.data === 'string'
              ? error.response.data
              : 'Error en el servidor'
          };
        } else if (error.request) {
          this.error = {
            status: 0,
            message: 'No se recibió respuesta del servidor'
          };
        } else {
          this.error = {
            message: error.message
          };
        }

        throw error;
      } finally {
        this.cargando = false;
      }
    }
  }
});
