<template>
  <v-btn :color="color" :disabled="disabled" @click="handleClick">
    {{ label }}
  </v-btn>
</template>

<script setup lang="ts">
// import { defineProps } from 'vue';

const props = defineProps<{
  label: string;
  color?: string;
  disabled?: boolean;
  onclick: (param?: any) => void;
  clickparam?: any;
}>();

const handleClick = () => {
  if (props.onclick) {
    props.onclick(props.clickparam);
  }
};
</script>