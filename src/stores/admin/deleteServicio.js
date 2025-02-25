import {defineStore} from "pinia";
import axios from "axios";
import {useLoginAdminStore} from "../loginAdmin";

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
          this.cargardo = false;
          throw new Error("Token no disponible");
        }
        try {
          await axios.delete(`http://localhost:8080/api/admin/deleteServicio/${id}`, {
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
