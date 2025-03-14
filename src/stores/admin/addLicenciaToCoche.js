import { defineStore } from "pinia"
import axios from "axios"
import { useLoginAdminStore } from "../loginAdmin"
import {API_URL} from "@/constants.js";

export const useAddLicenciaToCoche = defineStore("addLicenciaToCoche", {
  state: () => ({
    cargando: false,
    error: null,
    mensaje: null,
  }),

  actions: {
    async addLicenciaToCoche(cocheId, licenciaId) {
      const loginStore = useLoginAdminStore()
      const token = loginStore.token
      this.cargando = true
      this.error = null
      this.mensaje = null

      if (!token) {
        this.error = "Token no disponible";
        console.error("Token no disponible");
        this.cargando = false;
        return;
      }

      try {
        await axios.put(`${API_URL}/${cocheId}/${licenciaId}`, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        this.mensaje = "Licencia asignada al coche con éxito"
      } catch (error) {
        this.error = error.response ? error.response.data.error : error.message
        throw error
      } finally {
        this.cargando = false
      }
    },
  },
})

