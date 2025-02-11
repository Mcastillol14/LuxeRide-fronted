import { defineStore } from "pinia";
import axios from "axios";
import { useLoginStore } from "../loginAdmin";

export const useDesactivarServicioStore = defineStore("desactivarServicio", {
  actions: {
    async desactivarServicio(id) {
      const loginStore = useLoginStore();
      const token = loginStore.token;

      if (!token) {
        throw new Error("Token no disponible");
      }

      try {
        await axios.put(`https://luxeride-backend.onrender.com/api/admin/desactivarServicio/${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
      }
    },
  },
})
