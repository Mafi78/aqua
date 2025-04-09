<template>
    <v-dialog v-model="dialog" max-width="400">
        <v-card>
        <v-card-title class="text-h6">{{ title }}</v-card-title>
        <v-card-text>{{ message }}</v-card-text>

        <v-card-actions>
            <v-spacer />
            <v-btn color="secondary" @click="cancel">Cancel</v-btn>
            <v-btn color="primary" @click="confirm">Confirm</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'

  const props = defineProps<{
    modelValue: boolean
    title?: string
    message?: string
    param?: unknown // This is the dynamic parameter
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'confirm', param?: unknown): void
    (e: 'cancel'): void
  }>()

  const dialog = ref(props.modelValue)

  watch(() => props.modelValue, (val) => {
    dialog.value = val
  })

  watch(dialog, (val) => {
    emit('update:modelValue', val)
  })

  const confirm = () => {
    emit('confirm', props.param)
    dialog.value = false
}

  const cancel = () => {
    emit('cancel')
    dialog.value = false
  }
</script>