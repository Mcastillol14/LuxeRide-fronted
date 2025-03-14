import axios from "axios";
import { useLoginAdminStore } from "../loginAdmin";
import { defineStore } from "pinia";
import {API_URL} from "@/constants.js";

export const useDeleteTaxistaStore = defineStore("deleteTaxista", {
  state: () => ({
    error: null,
    cargando: false,
  }),
  actions: {
    async deleteTaxista(id) {
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
        const response = await axios.put(`${API_URL}/api/admin/deleteTaxista/${id}`,null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });

        console.log("Usuario eliminado de taxista:", response.data);
      } catch (error) {
        this.error = error.response?.data?.message || "Error desconocido";
        console.error("Error al eliminar taxista:", this.error);
      } finally {
        this.cargando = false;
      }
    }
  }
});
