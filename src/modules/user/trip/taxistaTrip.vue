<template>
  <div class="mb-3">
    <label for="taxista" class="form-label">Conductor</label>
    <Select
      id="taxista"
      v-model="selectedValue"
      :options="drivers"
      optionLabel="Taxista"
      placeholder="Taxista"
      class="w-100"
      :class="{'p-input':errors}"
      />
    <small v-if="errors" class="p-error">{{ errors }}</small>
  </div>
</template>

<script setup>
import {computed} from "vue";
import Select from 'primevue/select';

const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  },
  errors: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

</script>

<style scoped></style>
