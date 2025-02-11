import axios from "axios";
import { defineStore } from "pinia";
import { useLoginStore } from "../loginAdmin";

export const useEditarUsuarioStore = defineStore("editarUsuario", {
  state: () => ({
    error: null,
    cargando: false,
  }),

  actions: {
    async editarCuenta(id, datosUsuario) {
      this.cargando = true;
      this.error = null;

      const loginStore = useLoginStore();
      const token = loginStore.token;

      if (!token) {
        this.error = "Token no disponible";
        console.error("Token no disponible");
        this.cargando = false;
        return;
      }

      try {
        const response = await axios.put(
          `https://luxeride-backend.onrender.com/api/admin/editarUsuario/${id}`,
          datosUsuario,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Usuario editado correctamente:", response.data);
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
