<script setup lang="ts">
// import { ref } from 'vue'

/*
  const drawer =  ref(true)
  const rail = ref(true)

  const openNewWindow = (): void => {
    console.log("Hmmm ?");
  }
  */
</script>

<template>
  <v-app>
    <v-layout>
      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>
