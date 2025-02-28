<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{label}}</label>
    <InputText
      :id="id"
      v-model="inputValue"
      class="w-100"
      :class="{'p-invalid':errors}"
      :placeholder="`Introduce ${label.toLowerCase()}`"
      />
    <small v-if="errors" class="p-error">{{errors}}</small>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import InputText from 'primevue/inputtext'

const props=defineProps({
  label:{
    type:String,
    required:true
  },
  modelValue:{
    type:String,
    default:''
  },
  errors:{
    type:String,
    default:''
  }
})

const emit =defineEmits(['update:modalValue'])
const id = computed(() => props.label.toLowerCase().replace(' ', '-'));

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});</script>

<style scoped></style>
