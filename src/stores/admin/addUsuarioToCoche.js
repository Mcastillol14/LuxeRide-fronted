import {defineStore} from "pinia"
import axios from "axios"
import {useLoginAdminStore} from "../loginAdmin"
import {API_URL} from "@/constants.js";

export const useAddUsuarioToCoche = defineStore("addUsuarioToCoche", {
  state: () => ({
    cargando: false,
    error: null,
    mensaje: null,
  }),

  actions: {
    async addUsuarioToCoche(cocheId, usuarioId) {
      const loginStore = useLoginAdminStore()
      const token = loginStore.token
      this.cargando = true
      this.error = null
      this.mensaje = null

      if (!token) {
        this.error = "Token no disponible";
        this.cargando = false;
        return;
      }

      try {
        await axios.put(`${API_URL}/api/admin/addUsuarioToCoche/${cocheId}/${usuarioId}`, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        this.mensaje = "Usuario asignado al coche con éxito"
      } catch (error) {
        this.error = error.response ? error.response.data.error : error.message
        throw error
      } finally {
        this.cargando = false
      }
    },
  },
})

