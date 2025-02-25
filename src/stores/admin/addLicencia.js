import { defineStore } from "pinia"
import axios from "axios"
import { useLoginAdminStore } from "../loginAdmin"

export const useAddLicenciaStore = defineStore("addLicencia", {
  state: () => ({
    cargando: false,
    error: null,
    mensaje: null,
  }),
  actions: {
    async addLicencia(licencia) {
      const loginStore = useLoginAdminStore()
      const token = loginStore.token
      this.cargando = true
      this.error = null
      this.mensaje = null

      if (!token) {
        throw new Error("Token no disponible")
      }

      try {
        await axios.post("http://localhost:8080/api/admin/addLicencia", licencia, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.mensaje = "Licencia registrada con éxito"
      } catch (error) {
        this.error = error.response ? error.response.data.error : error.message
        throw error
      } finally {
        this.cargando = false
      }
    },
  },
})
