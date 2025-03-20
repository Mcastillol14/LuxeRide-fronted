<template>
  <header class="header-container shadow-sm">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center py-3">
        <div class="logo-container">
          <h1 class="m-0 d-flex align-items-center">
            <span class="brand-name">LuxeRide</span>
          </h1>
        </div>
        <div class="user-menu">
          <Button
            icon="pi pi-user"
            class="p-button-rounded p-button-text p-button-lg"
            aria-haspopup="true"
            aria-controls="user-menu"
            @click="toggleUserMenu"
          />
          <Menu
            id="user-menu"
            ref="userMenu"
            :model="menuItems"
            :popup="true"
            class="user-dropdown"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import Menu from 'primevue/menu';

const emit = defineEmits(['show-profile', 'logout']);
const userMenu = ref(null);

const menuItems = [
  {
    label: 'Mi Perfil',
    icon: 'pi pi-user',
    command: () => emit('show-profile')
  },
  {
    label: 'Cerrar Sesión',
    icon: 'pi pi-sign-out',
    command: () => emit('logout')
  }
];

const toggleUserMenu = (event) => {
  userMenu.value.toggle(event);
};
</script>

<style scoped>
.header-container {
  background-color: white;
}

.logo-container {
  display: flex;
  align-items: center;
}
.brand-name {
  color: #2E7D32;

}

.user-dropdown {
  width: 200px;
}




@media (max-width: 576px) {
  .brand-name {
    font-size: 1.2rem;
  }
}
</style>
