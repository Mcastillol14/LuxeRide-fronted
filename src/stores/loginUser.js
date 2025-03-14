import { defineStore } from "pinia";
import axios from "axios";
import {API_URL} from "@/constants.js";

export const useLoginUsuarioStore = defineStore('datos', {
  state: () => ({
    usuario: null,
    cargando: false,
    error: null,
    token: null,
    mensaje: null
  }),
  actions: {
    // Inicializar el store desde localStorage al cargar la aplicación
    inicializarDesdeLocalStorage() {
      const tokenGuardado = localStorage.getItem('token');
      if (tokenGuardado) {
        try {
          this.token = tokenGuardado;
        } catch (error) {
          console.error('Error al recuperar token de localStorage:', error);
          this.logoutUsuario();
        }
      }
    },

    async loginUsuario(usuario) {
      this.cargando = true;
      this.error = null;
      this.mensaje = null;
      try {
        const respuesta = await axios.post(`${API_URL}/api/usuarios/iniciar`, usuario, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.usuario = respuesta.data;
        this.token = respuesta.data.token;

        localStorage.setItem('token', this.token);


        return respuesta.data;
      } catch (error) {
        this.error = error.response?.data || error.message;
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    logoutUsuario() {
      this.usuario = null;
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      console.log('Sesión cerrada y datos eliminados de localStorage');
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token
  }
});
