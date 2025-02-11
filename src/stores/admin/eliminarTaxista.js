import axios from "axios";
import { useLoginStore } from "../loginAdmin";
import { defineStore } from "pinia";

export const useEliminarTaxistaStore = defineStore("eliminarTaxista", {
  state: () => ({
    error: null,
    cargando: false,
  }),
  actions: {
    async eliminarTaxista(usuario) {
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
        const response = await axios.put("https://luxeride-backend.onrender.com/api/admin/eliminarTaxista", usuario, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        console.log("Usuario eliminado de taxista:", response.data);
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        console.error("Error al eliminar taxista:", this.error);
      } finally {
        this.cargando = false;
      }
    }
  }
});
