import { defineStore } from "pinia";
import axios from "axios";
import { useLoginUsuarioStore } from "../loginUser.js";

export const usePdfUsuarioStore = defineStore("pdfUsuario", {
  state: () => ({
    error: null,
    cargando: false,
    idUsuario: null,
  }),
  actions: {
    async obtenerPdf(idUsuario) {
      this.cargando = true;
      this.error = null;

      const loginStore = useLoginUsuarioStore();
      const token = loginStore.token;
      function generarCadenaAleatoria(longitud) {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let resultado = "";
        for (let i = 0; i < longitud; i++) {
          resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return resultado;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/usuarios/generarPDF/${idUsuario}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        const cadenaAleatoria = generarCadenaAleatoria(10);
        const nombreArchivo = `usuario_${idUsuario}_${cadenaAleatoria}.pdf`;
        link.href = url;
        link.setAttribute("download", nombreArchivo);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        this.error = error.response?.data?.message || "Error al obtener el PDF";
        console.error("Error obteniendo el PDF:", error);
      } finally {
        this.cargando = false;
      }
    },
  },
});
