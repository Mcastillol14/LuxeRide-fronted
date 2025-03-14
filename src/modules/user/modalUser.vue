<template>
  <Dialog
    :visible="modelValue"
    @update:visible="updateVisibility"
    :modal="true"
    :closable="true"
    header="Mi Perfil"
    :style="{ width: '90%', maxWidth: '550px' }"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :draggable="false"
  >
    <div class="user-profile-content" v-if="modelValue">
      <div class="text-center mb-4">
        <div class="avatar-container">
          <Avatar
            size="xlarge"
            class="p-overlay-badge custom-avatar"
            style="background-color: #E8F5E9; color: #2E7D32"
          >
            <i class="bi bi-person"></i>
            <Badge value="Usuario"/>
          </Avatar>
        </div>

        <div v-if="userData" class="user-info">
          <h3 class="mt-3 mb-1">{{ userData.nombre || 'Sin nombre' }}</h3>
          <p class="text-muted mb-0">{{ userData.apellidos || 'Sin apellidos' }}</p>
          <p class="text-muted mb-0">{{ userData.dni || 'Sin DNI' }}</p>
          <p class="text-muted mb-0">{{ userData.email || 'Sin email' }}</p>
          <p class="text-muted mb-0">ID: {{ userData.id }}</p>
        </div>
        <div v-else>
          <p>Cargando información del usuario...</p>
        </div>
      </div>
      <Divider/>


    </div>

    <template #footer>
      <Button
        label="Cerrar"
        icon="pi pi-times"
        class="p-button-success close-button"
        @click="closeModal"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { defineProps, defineEmits, watch, onMounted } from 'vue';
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import 'primeicons/primeicons.css';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userData: {
    type: Object,
    default: () => null
  }
});

const emit = defineEmits(['update:modelValue', 'hide']);

onMounted(() => {
  console.log('Modal montado, userData:', props.userData);
  if (props.userData) {
    console.log('ID en el modal:', props.userData.id);
  }
});


watch(() => props.userData, (newValue) => {
  console.log('userData actualizado en modal:', newValue);
  if (newValue) {
    console.log('ID en userData actualizado:', newValue.id);
  }
}, { immediate: true, deep: true });

watch(() => props.modelValue, (newValue) => {
  console.log('Visibilidad del modal cambiada a:', newValue);
  if (newValue && !props.userData) {
    console.warn('Modal visible pero userData es null o undefined');
  } else if (newValue && props.userData) {
    console.log('Modal visible con userData:', props.userData);
    console.log('ID en userData:', props.userData.id);
  }
}, { immediate: true });

const updateVisibility = (value) => {
  emit('update:modelValue', value);
};

const closeModal = () => {
  emit('update:modelValue', false);
  emit('hide');
};
</script>

<style scoped>
.user-profile-content {
  padding: 1rem 0;
}

.custom-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-avatar i {
  font-size: 2rem;
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.user-info {
  text-align: center;
}

.close-button {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.close-button:hover {
  transform: scale(1.05);
}
</style>

