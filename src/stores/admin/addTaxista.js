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
    async addTaxista(id) {
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
        await axios.put(`${API_URL}/api/admin/addTaxista/${id}`, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        console.error(this.error);
      } finally {
        this.cargando = false;
      }
    }
  }
});
