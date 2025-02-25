import { jwtDecode } from "jwt-decode";

export function obtenerToken(){
  return localStorage.getItem("token");
}
 export function obtenerRoles(){
  const token=obtenerToken();
  if(token){
    const dToken=jwtDecode(token);
    return dToken.roles;
  }
  return null;
}
 export function obtenerUsuario(){
  const token=obtenerToken();
  if(token){
    const dToken=jwtDecode(token);
    return dToken.usuario;
  }
  return null;
}
export function estaAutenticado(){
  const token=obtenerToken();
  if(token){
    const dToken=jwtDecode(token);
    return dToken.exp*1000>Date.now();
  }
  return false;
}
