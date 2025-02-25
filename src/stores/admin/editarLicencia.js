import axios from "axios";
import { defineStore } from "pinia";
import { useLoginAdminStore } from "../loginAdmin";

export const useEditarLicenciaStore = defineStore("editarLicencia", {
  state: () => ({
    error: null,
    cargando: false,
  }),
  actions: {
    async editarLicencia(id, datosLicencia) {
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
        const response = await axios.put(
          `http://localhost:8080/api/admin/editarLicencia/${id}`,
          datosLicencia,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Licencia editada correctamente:", response.data);
      } catch (error) {
        console.error("Error al editar licencia:", error);
        this.error = error.response?.data?.message || "Error inesperado al editar licencia";
      } finally {
        this.cargando = false;
      }
    },
  },
});
