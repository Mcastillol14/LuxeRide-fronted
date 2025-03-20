import axios from "axios";
import { useLoginAdminStore } from "../loginAdmin";
import { defineStore } from "pinia";
import {API_URL} from "@/constants.js";

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
        this.cargando = false;
        return;
      }

      try {
         await axios.put(`${API_URL}/api/admin/bloquearCuenta/${id}`, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
      } finally {
        this.cargando = false;
      }
    }
  }
});
