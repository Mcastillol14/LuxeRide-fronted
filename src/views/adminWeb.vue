<template>
  <div>
    <loginAdmin/>
  </div>
</template>

<script setup>
import loginAdmin from '@/modules/admin/loginAdmin.vue';
</script>

<style scoped>
:global(body) {
  margin: 0;
  padding: 0;
  background: #1a1a1a;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
