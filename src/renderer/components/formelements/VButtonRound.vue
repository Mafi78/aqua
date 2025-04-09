<script setup lang="ts">

</script>

<template>
  <v-btn density="comfortable" icon="mdi-content-save-outline" :ripple="true">
    <v-icon color="black"></v-icon>
    <v-tooltip activator="parent" location="top"><slot /></v-tooltip>
  </v-btn>
</template>

<style scoped>
</style>
