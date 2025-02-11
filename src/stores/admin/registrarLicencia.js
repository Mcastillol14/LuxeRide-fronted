import { defineStore } from "pinia"
import axios from "axios"
import { useLoginStore } from "../loginAdmin"

export const useRegistrarLicenciaStore = defineStore("registrarLicencia", {
  state: () => ({
    cargando: false,
    error: null,
    mensaje: null,
    esExito: false,
  }),
  actions: {
    async registrarLicencia(licencia) {
      const loginStore = useLoginStore()
      const token = loginStore.token
      this.cargando = true
      this.error = null
      this.mensaje = null
      this.esExito = false

      if (!token) {
        throw new Error("Token no disponible")
      }

      try {
        await axios.post("https://luxeride-backend.onrender.com/api/admin/registrarLicencia", licencia, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.mensaje = "Licencia registrada con éxito"
        this.esExito = true
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.mensaje = "La licencia ya existe"
          this.esExito = false
        } else {
          this.error = error.response ? error.response.data.error : error.message
          this.esExito = false
        }
        throw error
      } finally {
        this.cargando = false
      }
    },
  },
})
