import axios from "axios";
import {defineStore} from "pinia";
import {useLoginAdminStore} from "../loginAdmin"

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

      if(!token){
        throw new Error("Token no disponible")
      }
      try {
        await axios.post("http://localhost:8000/api/admin/addCoche",coche,{
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
