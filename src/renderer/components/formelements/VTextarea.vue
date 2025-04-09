<template>
    <v-textarea
      v-model="localValue"
      :label="props.label"
      :placeholder="props.placeholder"
      :rows="props.rows"
      :auto-grow="props.autoGrow"
      :clearable="props.clearable"
      :counter="props.counter"
      :variant="props.variant"
      :density="props.density"
      @update:model-value="updateValue"
    />
  </template>

  <script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    modelValue?: string;
    label?: string;
    placeholder?: string;
    rows?: number;
    autoGrow?: boolean;
    clearable?: boolean;
    counter?: boolean | number;
    variant?: string;
    density?: string;
  }>()

  const emit = defineEmits(['update:modelValue'])

  // Create a writable computed to act as a proxy for v-model
  const localValue = computed({
    get: () => props.modelValue ?? '',
    set: (val: string) => emit('update:modelValue', val)
  })

  // Optional: still here if you want to manually emit
  const updateValue = (value: string) => {
    emit('update:modelValue', value)
  }
  </script>