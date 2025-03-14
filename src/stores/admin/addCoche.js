import axios from "axios";
import {defineStore} from "pinia";
import {useLoginAdminStore} from "../loginAdmin"
import {API_URL} from "@/constants.js";

export const useAddCocheStore = defineStore("addCoche",{
  state:()=>({
    cargando: false,
    error: null,
    mensaje: null,
  }),
  actions:{
    async addCoche(coche){
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
        await axios.post(`${API_URL}/api/admin/addCoche`,coche,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        this.mensaje="Coche registrado con exito"
      }catch(error){
        this.error = error.response ? error.response.data.error : error.message
        throw error
      }finally{
        this.cargando = false
      }
    },
  },
})
