import { defineStore } from "pinia"
import axios from "axios"
import { useLoginStore } from "../loginAdmin"

export const useListadoLicenciasStore = defineStore("listadoLicencias", {
  state: () => ({
    licencias: [],
    cargando: false,
    error: null,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10,
    totalElements: 0,
  }),
  actions: {
    async obtenerListadoLicencias(page = 0, estado = "", numero = "") {
      this.cargando = true
      this.error = null

      const loginStore = useLoginStore()
      const token = loginStore.token

      if (!token) {
        this.error = "Token no disponible"
        console.error("Token no disponible")
        this.cargando = false
        return
      }

      try {
        const respuesta = await axios.get("https://luxeride-backend.onrender.com/api/admin/allLicencias", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            size: this.pageSize,
            estado,
            numero,
          },
        });

        this.licencias = respuesta.data.content
        this.totalPages = respuesta.data.totalPages
        this.currentPage = respuesta.data.number
      } catch (error) {
        this.error = error.response?.data?.message || error.message
        console.error("Error al obtener licencias:", this.error)
      } finally {
        this.cargando = false
      }
    }
  }
})
