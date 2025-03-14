import { defineStore } from "pinia";
import axios from "axios";
import {API_MAPS} from "@/constants.js";

export const useRutasStore = defineStore("rutas", {
  state: () => ({
    origen: null,
    destino: null,
    distancia: null,
    fecha_inicio: null,
    fecha_fin: null,
    imagen: null,
    cargando: false,
    error: null,
  }),
  actions: {
    async obtenerRuta(origen, destino) {
      this.cargando = true;
      this.error = null;
      this.origen = origen;
      this.destino = destino;

      const apiKey = import.meta.env.VITE_API_KEY;
      if (!apiKey) {
        this.error = "API Key no disponible";
        this.cargando = false;
        return;
      }

      try {
        const response = await axios.post(
          `${API_MAPS}`,
          {
            api_key: apiKey,
            origen,
            destino,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { destino, distancia, fecha_fin, fecha_inicio, imagen, origen } = response.data;

        this.origen = origen;
        this.destino = destino;
        this.distancia = distancia;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.imagen = imagen;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
      } finally {
        this.cargando = false;
      }
    },
  },
  getters: {
    getRutaData: (state) => {
      return {
        origen: state.origen,
        destino: state.destino,
        distancia: state.distancia,
        fecha_inicio: state.fecha_inicio,
        fecha_fin: state.fecha_fin,
        imagen: state.imagen,
      };
    },
  },
});
