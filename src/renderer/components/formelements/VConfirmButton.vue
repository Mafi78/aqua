<template>
    <div>
      <VButtonWOClick :label="label" :color="color" :disabled="disabled" @click="openDialog" />

      <VConfirmDialog
        v-model="showDialog"
        :title="confirmTitle"
        :message="confirmMessage"
        :param="param"
        @confirm="handleConfirm"
      />
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  import VButtonWOClick from './VButtonWOClick.vue'
  import VConfirmDialog from './VConfirmDialog.vue'

  defineProps<{
    label: string
    color?: string
    disabled?: boolean
    confirmTitle?: string
    confirmMessage?: string
    param?: unknown
  }>()

  const emit = defineEmits<{
    (e: 'confirmed', param?: unknown): void
  }>()

  const showDialog = ref(false)

  const openDialog = () => {
    showDialog.value = true
  }

  const handleConfirm = (param?: unknown) => {
    emit('confirmed', param)
  }
</script>