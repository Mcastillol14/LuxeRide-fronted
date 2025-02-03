<template>
  <main>
   <div class="panel">
     <aside class="menu-derecha">
       <nav class="opciones">
           <button
           class="opcion"
           :class="{ active: opcion === 'inicio' }"
           @click="cambiarOpcion('inicio')">
           Inicio
           </button>
           <button
           class="opcion"
           :class="{ active: opcion === 'pedirViaje' }"
           @click="cambiarOpcion('pedirViaje')">
           Pedir viaje
           </button>
           <button
           class="opcion"
           :class="{ active: opcion === 'servicios' }"
           @click="cambiarOpcion('servicios')">
           Servicios
           </button>
           <button
           class="opcion"
           :class="{ active: opcion === 'historial' }"
           @click="cambiarOpcion('historial')">
           Historial
           </button>
           <button
           class="opcion"
           :class="{ active: opcion === 'perfil' }"
           @click="cambiarOpcion('perfil')">
           Perfil
           </button>
       </nav>
     </aside>
   </div>
  </main>
 </template>

 <script setup>
 import { ref } from 'vue';

 const opcion = ref('inicio');

 const cambiarOpcion = (nuevaOpcion) => {
   opcion.value = nuevaOpcion;
 }
 </script>

 <style scoped>

 </style>
