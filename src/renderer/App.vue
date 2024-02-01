<script setup lang="tsx">
// import { CleanLayout } from '@/renderer/components/layout'
import { onMounted, ref, onRenderTriggered } from 'vue'
import { useRouter } from 'vue-router'

const routStr = ref('oha')

onMounted((): void => {
  console.log('on mounted in App.vue is called')
  const router = useRouter()
  const currentPathObject = router.currentRoute.value
  console.log('App.Vue Mount Path: ', currentPathObject)
  routStr.value = currentPathObject.fullPath
  console.log('on mounted in App.vue is finished')
})

onRenderTriggered((): void => {
  console.log('onUpdated in App.vue is called')
  const router = useRouter()
  const currentPathObject = router.currentRoute.value
  console.log('App.Vue Update Path: ', currentPathObject)
  routStr.value = currentPathObject.fullPath
  console.log('onUpdated in App.vue is finished')
})
</script>

<template>
  <router-view />
</template>

<style>
html {
  overflow-y: auto !important;
  user-select: none;
}
html,
body {
  width: 100%;
  height: 100%;
}
/* Do not force capitalization of button text */
.v-btn {
  text-transform: unset !important;
}
</style>
