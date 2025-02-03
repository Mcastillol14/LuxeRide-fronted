import axios from "axios";
import { useLoginStore } from "../loginAdmin";
import { defineStore } from "pinia";

export const useAddTaxistaStore = defineStore("añadirTaxista", {
  state: () => ({
    error: null,
    cargando: false,
  }),
  actions: {
    async añadirTaxista(usuario) {
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
        const response = await axios.put("http://localhost:8080/api/admin/addTaxista", usuario, {
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
