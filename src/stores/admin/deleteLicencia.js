import {defineStore} from "pinia";
import axios from "axios";
import {useLoginAdminStore} from "../loginAdmin";

export const useDeleteLicenciaStore = defineStore("deleteLicencia", {
  state: () => ({
    cargando: false,
    error: null,
    mensaje: null,
  }),

  actions: {
    async deleteLicencia(id) {
      const loginStore = useLoginAdminStore();
      const token = loginStore.token;

      this.cargando = true;
      this.error = null;
      this.mensaje = null;

      if (!token) {
        this.cargando = false;
        throw new Error("Token no disponible");
      }

      try {
        await axios.delete(`http://localhost:8080/api/admin/deleteLicencia/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        this.mensaje = "Licencia eliminada correctamente";
      } catch (error) {
        this.error = error.response?.data?.message || "Error al eliminar la licencia";
      } finally {
        this.cargando = false;
      }
    },
  },
});

