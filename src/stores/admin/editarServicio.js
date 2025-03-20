import { defineStore } from "pinia";
import axios from "axios";
import { useLoginAdminStore } from "../loginAdmin";
import {API_URL} from "@/constants.js";

export const useEditarServicioStore = defineStore("editarServicio", {
  state: () => ({
    error: null,
    cargando: false,
  }),
  actions: {
    async editarServicio(id, datosServicio) {
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
        await axios.put(`${API_URL}/api/admin/editarServicio/${id}`,
          datosServicio,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        if (error.response?.data?.message) {
          this.error = error.response.data.message;
        } else {
          this.error = "Error al editar servicio";
        }
      } finally {
        this.cargando = false;
      }
    },
  },
});
