import { defineStore } from "pinia";
import axios from "axios";
import { useLoginStore } from "../loginAdmin";

export const useEditarServicioStore = defineStore("editarServicio", {
  state: () => ({
    error: null,
    cargando: false,
  }),
  actions: {
    async editarServicio(id, datosServicio) {
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
        const response = await axios.put(
          `http://localhost:8080/api/admin/editarServicio/${id}`,
          datosServicio,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Servicio editado correctamente:", response.data);
      } catch (error) {
        if (error.response?.data?.message) {
          this.error = error.response.data.message;
        }
        else {
          this.error = "Error al editar servicio";
        }
      } finally {
        this.cargando = false;
      }
    },
  },
});
