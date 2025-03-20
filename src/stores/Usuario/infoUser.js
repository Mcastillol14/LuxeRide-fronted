import { defineStore } from "pinia";
import axios from "axios";
import { useLoginUsuarioStore } from "@/stores/loginUser.js";
import {API_URL} from "@/constants.js";

export const useUsuarioStore = defineStore("usuario", {
  state: () => {
    const userDataString = localStorage.getItem('userData');
    let userData = {};

    if (userDataString) {
      try {
        userData = JSON.parse(userDataString);
      } catch (error) {
        console.error( error);
      }
    }

    return {
      id: userData.id || null,
      nombre: userData.nombre || null,
      apellidos: userData.apellidos || null,
      dni: userData.dni || null,
      email: userData.email || null,
      rol: userData.rol || null,
      accountNonLocked: userData.accountNonLocked || null,
      cargando: false,
      error: null,
    };
  },
  actions: {
    async obtenerInfoUsuario() {
      this.cargando = true;
      this.error = null;

      const loginStore = useLoginUsuarioStore();
      const token = loginStore.token;

      if (!token) {
        this.error = "Token no disponible";
        this.cargando = false;
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/usuarios/info`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const { id, nombre, apellidos, dni, email, rol, accountNonLocked } = response.data;


        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.email = email;
        this.rol = rol;
        this.accountNonLocked = accountNonLocked;

        const userData = {
          id, nombre, apellidos, dni, email, rol, accountNonLocked
        };
        localStorage.setItem('userData', JSON.stringify(userData));

      } catch (error) {
        this.error = error.response?.data?.message || error.message;
      } finally {
        this.cargando = false;
      }
    }
  },
  getters: {
    getUserData: (state) => {
      return {
        id: state.id,
        nombre: state.nombre,
        apellidos: state.apellidos,
        dni: state.dni,
        email: state.email,
        rol: state.rol
      };
    }
  }
});
