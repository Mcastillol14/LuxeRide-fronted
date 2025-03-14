import axios from "axios";
import { useLoginAdminStore } from "../loginAdmin";
import { defineStore } from "pinia";
import {API_URL} from "@/constants.js";

export const useDesbloquearCuentaStore = defineStore("desbloquearCuenta", {
  state: () => ({
    error: null,
    cargando: false,
  }),
  actions: {
    async desbloquearCuenta(id) {
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
        const response = await axios.put(`${API_URL}/api/admin/desbloquearCuenta/${id}`, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        console.log("Cuenta desbloqueada correctamente:", response.data);
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        console.error("Error al desbloquear cuenta:", this.error);
      } finally {
        this.cargando = false;
      }
    }
  }
});
