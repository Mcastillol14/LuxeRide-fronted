import { defineStore } from "pinia";
import axios from "axios";

export const listadoUsuariosStore = defineStore("listadoUsuarios", {
  state: () => ({
    usuarios: [],
    cargando: false,
    error: null,
    token: null,
  }),
  actions: {
    async obtenerListadoUsuarios() {
      this.cargando = true;
      this.error = null;

      try {
        const respuesta = await axios.get(
          "http://localhost:8080/api/admin/allusers",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.usuarios = respuesta.data.content;
        return respuesta;
      } catch (error) {
        this.error =
          error.response?.data?.message || error.response?.data || error.message;
        console.error("Error al obtener usuarios:", this.error);
        throw new Error("No se pudo obtener el listado de usuarios");
      } finally {
        this.cargando = false;
      }
    },
  },
});
