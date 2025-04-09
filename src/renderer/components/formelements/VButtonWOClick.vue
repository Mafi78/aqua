<template>
  <v-btn :color="color" :disabled="disabled" @click="handleClick">
    {{ label }}
  </v-btn>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  color?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const handleClick = () => {
  emit('click')
}
</script>
