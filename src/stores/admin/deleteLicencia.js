import {defineStore} from "pinia";
import axios from "axios";
import {useLoginAdminStore} from "../loginAdmin";
import {API_URL} from "@/constants.js";

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
        this.error = "Token no disponible";
        this.cargando = false;
        return;
      }

      try {
        await axios.delete(`${API_URL}/api/admin/deleteLicencia/${id}`, {
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

