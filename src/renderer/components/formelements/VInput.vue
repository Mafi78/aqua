<template>
    <div class="input-container">
        <label v-if="label">{{ label }}</label>
        <input
            ref="inputRef"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
    </div>
</template>

<script setup lang="ts">
    // import { defineProps, defineEmits } from 'vue';
    import { ref } from 'vue'

    defineProps<{
        modelValue: string;
        type?: string;
        placeholder?: string;
        label?: string;
    }>();

    defineEmits(['update:modelValue']);

    const inputRef = ref<HTMLInputElement | null>(null)

    defineExpose({
        focus: () => inputRef.value?.focus()
    })
</script>

<style scoped>
    .input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
    label {
        margin-bottom: 5px;
        font-size: 14px;
        color: #333;
    }
    input {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
</style>