import axios from "axios";
import { defineStore } from "pinia";
import { useLoginAdminStore } from "../loginAdmin";
import {API_URL} from "@/constants.js";

export const useEditarUsuarioStore = defineStore("editarUsuario", {
  state: () => ({
    error: null,
    cargando: false,
  }),

  actions: {
    async editarCuenta(id, datosUsuario) {
      this.cargando = true;
      this.error = null;

      const loginStore = useLoginAdminStore();
      const token = loginStore.token;

      if (!token) {
        this.error = "Token no disponible";
        console.error("Token no disponible");
        this.cargando = false;
        return;
      }

      try {
       await axios.put(`${API_URL}/api/admin/editarUsuario/${id}`, null, {
          params: {
            nombre: datosUsuario.nombre,
            apellidos: datosUsuario.apellidos,
            dni: datosUsuario.dni,
            email: datosUsuario.email,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
        );

      } catch (error) {
        if (error.response?.data?.message) {
          this.error = error.response.data.message;
        } else {
          this.error = "Error al editar usuario";
        }
      } finally {
        this.cargando = false;
      }
    },
  },
});
