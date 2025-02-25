import axios from "axios";
import { useLoginAdminStore } from "../loginAdmin";
import { defineStore } from "pinia";

export const useBloquearCuentaStore = defineStore("bloquearCuenta", {
  state: () => ({
    error: null,
    cargando: false,
  }),
  actions: {
    async bloquearCuenta(id) {
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
        const response = await axios.put(`http://localhost:8080/api/admin/bloquearCuenta/${id}`, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        console.log("Cuenta bloqueada correctamente:", response.data);
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        console.error("Error al bloquear cuenta:", this.error);
      } finally {
        this.cargando = false;
      }
    }
  }
});
