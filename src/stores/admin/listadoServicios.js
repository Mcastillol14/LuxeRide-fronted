import { defineStore } from "pinia";
import axios from "axios";
import { useLoginStore } from "../loginAdmin";

export const useListadoServiciosStore = defineStore("listadoServicios", {
  state: () => ({
    servicios: [],
    cargando: false,
    error: null,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10,
    totalElements: 0,
  }),
  actions: {
    async obtenerListadoServicios(page = 0, estado = "") {
      this.cargando=true
      this.error=null

      const loginStrore = useLoginStore()
      const token = loginStrore.token

      if
      (!token) {
        this.error = "Token no disponible"
        console.error("Token no disponible")
        this.cargando = false
        return
      }
      try {
        const respuesta =
        await axios.get("https://luxeride-backend.onrender.com/api/admin/allServicios", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            size: this.pageSize,
            estado,
          },
        });
        this.servicios = respuesta.data.content
        this.totalPages = respuesta.data.totalPages
        this.currentPage = respuesta.data.number
      }
      catch (error) {
        this.error = error.response?.data?.message || error.message
        console.error("Error al obtener servicios:", this.error)
      }
      finally {
        this.cargando = false
      }
    }
  }
})
