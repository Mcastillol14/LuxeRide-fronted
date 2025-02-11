import axios from "axios";
import { useLoginStore } from "../loginAdmin";
import { defineStore } from "pinia";

export const useDesactivarCuentaStore = defineStore("desactivarCuenta", {
  state: () => ({
    error: null,
    cargando: false,
  }),
  actions: {
    async desactivarCuenta(dni) {
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
        const response = await axios.put("https://luxeride-backend.onrender.com/api/admin/desactivarCuenta", { dni }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        console.log("Cuenta desactivada correctamente:", response.data);
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        console.error("Error al desactivar cuenta:", this.error);
      } finally {
        this.cargando = false;
      }
    }
  }
});
