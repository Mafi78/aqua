<script setup lang="tsx">
import { onMounted, ref, version } from 'vue'
import { useRouter } from 'vue-router'

const routStr = ref('Unknown')

const vueVersion = version

onMounted((): void => {
  const router = useRouter()
  const currentPathObject = router.currentRoute.value
  console.log('Preferences Update: ', currentPathObject)
  routStr.value = currentPathObject.fullPath
})
</script>

<template>
  <v-container>
    <v-row no-gutters align="center" class="text-center">
      <v-col cols="12" md="5"> Prefernces {{ routStr }} </v-col>
    </v-row>
    <v-row no-gutters align="center" class="text-center">
      <v-col cols="12" md="5"> Vue Version: {{ vueVersion }}</v-col>
    </v-row>
    <v-row no-gutters align="center" class="text-center">
      <v-col cols="12" md="5"> Hier kommt der Content hin ... </v-col>
    </v-row>
  </v-container>
</template>
