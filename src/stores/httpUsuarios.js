import axios from "axios";

// fallback a localhost si no hay VITE_API_URL, para dev
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// post comun a los endpoints de usuarios, lo comparten el store de login y el de registro
export async function postUsuario(ruta, usuario) {
  return axios.post(`${apiUrl}${ruta}`, usuario, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
