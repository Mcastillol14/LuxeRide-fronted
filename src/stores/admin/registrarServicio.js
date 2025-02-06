import { defineStore } from "pinia";
import axios from "axios";
import { useLoginStore } from "../loginAdmin";

export const useRegistrarServicioStore = defineStore("registrarServicio", {
  state
    : () => ({
      cargando: false,
      error: null,
      mensaje: null,
      esExito: false,
    }),

  actions: {
    async registrarServicio(servicio) {

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
        await axios.post("http://localhost:8080/api/admin/registrarServicio", servicio, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.mensaje = "Servicio registrado con éxito"
        this.esExito = true
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.mensaje = "El servicio ya existe"
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

