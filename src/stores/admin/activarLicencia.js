import { defineStore } from "pinia";
import axios from "axios";
import { useLoginStore } from "../loginAdmin";

export const useActivarLicenciaStore = defineStore("activarLicencia", {
  actions: {
    async activarLicencia(id) {
      const loginStore = useLoginStore();
      const token = loginStore.token;

      if (!token) {
        throw new Error("Token no disponible");
      }

      try {
        await axios.put(`https://luxeride-backend.onrender.com/api/admin/activarLicencia/${id}`, {}, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
      }
    },
  },
});
