import {defineStore} from "pinia";
import axios from "axios";
import {useLoginAdminStore} from "../loginAdmin";
import {API_URL} from "@/constants.js";

export const useDeleteServicioStore = defineStore("deleteServicioStore", {
  state: () => ({
    cargando: false,
    error: null,
    mensaje: null,
  }),
  actions:
    {
      async deleteServicio(id) {
        const loginStore = useLoginAdminStore();
        const token = loginStore.token;
        this.cargardo = true;
        this.error = null;
        this.mensaje = null;
        if (!token) {
          this.error = "Token no disponible";
          this.cargando = false;
          return;
        }
        try {
          await axios.delete(`${API_URL}/api/admin/deleteServicio/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          this.mensaje = "Servicio eliminado correctamente";
        } catch (error) {
          this.error = error.response?.data?.message || "Error al eliminar el servicio";
        } finally {
          this.cargardo = false;
        }
      },
    },
});
