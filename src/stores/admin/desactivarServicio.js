import { defineStore } from "pinia";
import axios from "axios";
import { useLoginAdminStore } from "../loginAdmin";

export const useDesactivarServicioStore = defineStore("desactivarServicio", {
  actions: {
    async desactivarServicio(id) {
      const loginStore = useLoginAdminStore();
      const token = loginStore.token;

      if (!token) {
        throw new Error("Token no disponible");
      }

      try {
        await axios.put(`http://localhost:8080/api/admin/desactivarServicio/${id}`,
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
