import {defineStore} from "pinia"
import axios from "axios"
import {useLoginAdminStore} from "../loginAdmin"
import {API_URL} from "@/constants.js";

export const useDeleteUsuarioToCoche = defineStore("deleteUsuarioToCoche", {
  state: () => ({
    cargando: false,
    error: null,
    mensaje: null,
  }),

  actions: {
    async deleteUsuarioToCoche(cocheId, usuarioId) {
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
        await axios.delete(`${API_URL}/api/admin/deleteUsuarioToCoche/${cocheId}/${usuarioId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        this.mensaje = "Usuario eliminado del coche con éxito"
      } catch (error) {
        this.error = error.response ? error.response.data.error : error.message
        throw error
      } finally {
        this.cargando = false
      }
    },
  },
})

