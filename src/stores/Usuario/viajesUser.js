import { defineStore } from 'pinia';
import axios from 'axios';
import { useLoginUsuarioStore } from '../loginUser.js';
//import {API_MAPS, API_KEY} from "@/constants.js";

export const useViajesUsuarioStore = defineStore('viajesUsuario', {
  state: () => ({
    origen: null,
    destino: null,
    distancia: null,
    fecha_inicio: null,
    fecha_fin: null,
    imagen: null,
    error: null,
    cargando: false,
  }),
  actions: {
    async obtenerRuta(origen, destino) {
      this.cargando = true;
      this.error = null;

      try {
        const response = await axios.post(
          "https://europe-southwest1-lucid-mariner-442915-p4.cloudfunctions.net/Rutas2",
          {
            api_key: "AIzaSyBhgamsYkctswgfv5SBiMbZ1ir1GDR5wo4",
            origen: origen,
            destino: destino
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Respuesta de la API:", response.data);

        const { destino: destinoResponse, distancia, fecha_fin, fecha_inicio, imagen, origen: origenResponse } = response.data;

        this.origen = origenResponse;
        this.destino = destinoResponse;
        this.distancia = distancia;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.imagen = imagen; // Imagen en base64 que devuelve la API

        this.cargando = false;

        // Si la respuesta es exitosa, registrar el viaje automáticamente
        if (response.status === 200) {
          await this.registrarViajeDesdeLocalStorage();
        }

        return true;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        this.cargando = false;
        console.error("Error detallado:", error);
        return false;
      }
    },

    async registrarViajeDesdeLocalStorage() {
      // Recuperar información del servicio
      const servicioGuardado = localStorage.getItem('servicioSeleccionado');
      if (!servicioGuardado) {
        this.error = "No hay información del servicio disponible";
        return false;
      }

      // Recuperar información del taxista y coche
      const taxistaGuardado = localStorage.getItem('taxistaSeleccionado');
      if (!taxistaGuardado) {
        this.error = "No hay información del taxista disponible";
        return false;
      }

      try {
        const servicio = JSON.parse(servicioGuardado);
        const seleccionTaxista = JSON.parse(taxistaGuardado);

        return await this.registrarViaje(
          { id: servicio.id, precioBase: servicio.precioBase },
          seleccionTaxista.taxista,
          seleccionTaxista.coche
        );
      } catch (error) {
        console.error("Error al procesar datos del localStorage:", error);
        this.error = "Error al procesar datos guardados";
        return false;
      }
    },

    async registrarViaje(servicio, taxista, coche) {
      if (!this.origen || !this.destino || !this.distancia) {
        this.error = "No hay información de ruta disponible";
        return false;
      }

      const loginStore = useLoginUsuarioStore();
      const token = loginStore.token || localStorage.getItem('token');

      if (!token) {
        this.error = "Token no disponible";
        return false;
      }

      // Obtener información del usuario desde localStorage
      let usuarioId = null;
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        try {
          const userData = JSON.parse(userDataString);
          usuarioId = userData.id;
        } catch (error) {
          console.error("Error al parsear userData:", error);
        }
      }

      if (!usuarioId) {
        this.error = "ID de usuario no disponible";
        return false;
      }

      const distanciaNum = parseFloat(this.distancia.replace(/[^0-9.]/g, ''));

      // Calcular precio total (distancia * precio base del servicio)
      const precioTotal = distanciaNum * servicio.precioBase;

      // Formatear fechas para el backend y sumar una hora
      const horaInicio = this.fecha_inicio
        ? new Date(new Date(this.fecha_inicio).setHours(new Date(this.fecha_inicio).getHours() + 1)).toISOString()
        : new Date(new Date().setHours(new Date().getHours() + 1)).toISOString();

      const horaLlegada = this.fecha_fin
        ? new Date(new Date(this.fecha_fin).setHours(new Date(this.fecha_fin).getHours() + 1)).toISOString()
        : new Date(new Date().setHours(new Date().getHours() + 1)).toISOString();

// Crear el objeto viaje con todos los campos requeridos
      const viaje = {
        horaInicio,
        horaLlegada,
        origen: this.origen,
        destino: this.destino,
        distanciaKm: distanciaNum,
        precioTotal,
        cliente: { id: usuarioId },
        taxista: { id: taxista.id },
        servicio: { id: servicio.id },
        coche: { id: coche.id },
        foto: this.imagen // La imagen en base64 que devuelve la API de mapas
      };


      try {
        const response = await axios.post(
          `http://localhost:8080/api/usuarios/hacerViaje`,
          viaje,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Respuesta del registro de viaje:", response.data);

        // Guardar información del viaje en localStorage
        localStorage.setItem('ultimoViaje', JSON.stringify({
          origen: this.origen,
          destino: this.destino,
          distancia: this.distancia,
          precioTotal,
          fecha: new Date().toISOString()
        }));

        return true;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        console.error("Error al registrar viaje:", error);
        return false;
      }
    }
  }
});
