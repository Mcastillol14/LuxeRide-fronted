import { defineStore } from 'pinia';
import axios from 'axios';
import {API_URL} from "@/constants.js";
import {useLoginUsuarioStore} from "@/stores/loginUser.js";

export const useCocheStore = defineStore('coche', {
  state: () => {
    const estadoServicioString = localStorage.getItem('estadoServicio');
    let estadoServicio = { enServicio: false, coche: null };

    if (estadoServicioString) {
      try {
        estadoServicio = JSON.parse(estadoServicioString);
      } catch (error) {
        console.error('Error al parsear estadoServicio de localStorage:', error);
      }
    }

    return {
      cochesDisponibles: [],
      error: null,
      cargando: false,
      cocheActual: estadoServicio.coche,
      enServicio: estadoServicio.enServicio
    };
  },
  actions: {
    async obtenerCochesDisponibles(taxistaId) {
      this.cargando = true;
      this.error = null;

      const loginStore = useLoginUsuarioStore();
      let token = loginStore.token;

      if (!token) {
        token = localStorage.getItem('token');
        if (token) {
          loginStore.token = token;
        }
      }

      if (!token) {
        this.error = "Token no disponible";
        this.cargando = false;
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/taxista/cochesTaxistas/${taxistaId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.cochesDisponibles = response.data;
      } catch (error) {
        this.error = error.response?.data || error.message;
      } finally {
        this.cargando = false;
      }
    },

    async ponerEnServicio(cocheId, taxistaId) {
      this.cargando = true;

      const loginStore = useLoginUsuarioStore();
      let token = loginStore.token || localStorage.getItem('token');

      if (!token) {
        this.error = "Token no disponible";
        this.cargando = false;
        return;
      }

      try {
        await axios.put(`${API_URL}/api/taxista/ponerEnServicio/${cocheId}/${taxistaId}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const cocheSeleccionado = this.cochesDisponibles.find(coche => coche.id === cocheId);
        this.cocheActual = cocheSeleccionado;
        this.enServicio = true;

        this.guardarEstadoServicio();

        this.cochesDisponibles = this.cochesDisponibles.filter(coche => coche.id !== cocheId);
      } catch (error) {
        this.error = error.response?.data || error.message;
      } finally {
        this.cargando = false;
      }
    },

    async liberarCoche(cocheId) {
      this.cargando = true;

      const loginStore = useLoginUsuarioStore();
      let token = loginStore.token || localStorage.getItem('token');

      if (!token) {
        this.error = "Token no disponible";
        this.cargando = false;
        return;
      }

      try {
        await axios.put(`${API_URL}/api/taxista/liberarCoche/${cocheId}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        this.cocheActual = null;
        this.enServicio = false;

        this.guardarEstadoServicio();

        if (this.taxistaId) {
          await this.obtenerCochesDisponibles(this.taxistaId);
        }
      } catch (error) {
        this.error = error.response?.data || error.message;
      } finally {
        this.cargando = false;
      }
    },

    guardarEstadoServicio() {
      localStorage.setItem('estadoServicio', JSON.stringify({
        enServicio: this.enServicio,
        coche: this.cocheActual
      }));
    },

    liberarCocheAlCerrarSesion() {
      if (this.enServicio && this.cocheActual) {
        this.liberarCoche(this.cocheActual.id);
      }
    }
  },
  getters: {
    getEstadoServicio: (state) => {
      return {
        enServicio: state.enServicio,
        cocheActual: state.cocheActual
      };
    }
  }
});
