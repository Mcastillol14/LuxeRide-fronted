import { defineStore } from "pinia";
import axios from "axios";
import { useLoginUsuarioStore} from "@/stores/loginUser.js";

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({
    nombre: null,
    apellidos: null,
    dni: null,
    email: null,
    cargando: false,
    error: null,
  }),
  actions: {
    async obtenerInfoUsuario() {
      this.cargando = true;
      this.error = null;

      const loginStore = useLoginUsuarioStore();
      const token = loginStore.token;

      if (!token) {
        this.error = "Token no disponible";
        console.error("Token no disponible");
        this.cargando = false;
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/usuarios/info", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const { nombre, apellidos, dni, email } = response.data;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.email = email;

      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        console.error("Error al obtener información del usuario:", this.error);
      } finally {
        this.cargando = false;
      }
    },
  },
});
