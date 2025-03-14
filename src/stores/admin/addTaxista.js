import axios from "axios";
import { useLoginAdminStore } from "../loginAdmin";
import { defineStore } from "pinia";
import {API_URL} from "@/constants.js";

export const useAddTaxistaStore = defineStore("addTaxista", {
  state: () => ({
    error: null,
    cargando: false,
  }),
  actions: {
    async addTaxista(id) {  // Cambié el nombre de la función aquí
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
        const response = await axios.put(`${API_URL}/api/admin/addTaxista/${id}`, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        console.log("Usuario añadido como taxista:", response.data);
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        console.error("Error al añadir taxista:", this.error);
      } finally {
        this.cargando = false;
      }
    }
  }
});
