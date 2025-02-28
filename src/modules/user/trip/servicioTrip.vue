<template>
  <div class="mb-3">
    <label for="servicios" class="form-label">Servicios</label>
    <TreeSelect
      id="servicios"
      v-model="selectedValue"
      :options="servicios"
      selectionMode="single"
      display="chip"
      :maxSelectedLabels="1"
      placeholder="Seleccione servicio"
      class="w-100"
      :class="{'p-invalid':errors}"
    />
    <small v-if="errors" class="p-error">{{ errors }}</small>
  </div>
</template>

<script setup>
import {computed} from "vue";
import TreeSelect from "primevue/treeselect";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  errors: {
    type: String,
    defaul: ''
  }
})
const emit = defineEmits(["update:modelValue"]);
const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>

<style scoped>

</style>
