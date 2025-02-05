import { defineStore } from "pinia"
import axios from "axios"
import { useLoginStore } from "../loginAdmin"

export const useDesactivarLicenciaStore = defineStore("desactivarLicencia", {
  actions: {
    async desactivarLicencia(id) {
      const loginStore = useLoginStore()
      const token = loginStore.token

      if (!token) {
        throw new Error("Token no disponible")
      }

      try {
        await axios.put(
          `http://localhost:8080/api/admin/desactivarLicencia/${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        )
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message)
      }
    },
  },
})

