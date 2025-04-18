<script setup lang="ts">
// import { defineEmits } from 'vue';
import { VNumberInput } from 'vuetify/labs/VNumberInput'

// ✅ Destructure props directly (fixes ESLint warning)
const {
  modelValue = 0,
  label = 'Leadership style',
  placeholder = '12',
  width = 200,
  density = 'compact',
  reverse = false,
  hideInput = false,
  inset = true,
  rounded = true
} = defineProps<{
  modelValue?: number;
  label?: string;
  placeholder?: string;
  width?: string | number;
  density?: 'default' | 'compact' | 'comfortable';
  reverse?: boolean;
  hideInput?: boolean;
  inset?: boolean;
  variant?: string;
  rounded?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const updateValue = (value: number) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <v-number-input
    :reverse="reverse"
    :label="label"
    :hide-input="hideInput"
    :inset="inset"
    :rounded="rounded"
    :density="density"
    :width="width"
    class="v-number-input"
    :placeholder="placeholder"
    :model-value="modelValue"
    @update:model-value="updateValue"
  />
</template>
