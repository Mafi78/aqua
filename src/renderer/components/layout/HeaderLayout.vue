<script setup lang="ts">
import { ref, onMounted /* ,computed */ } from 'vue'
const receivedError = ref('')

onMounted((): void => {
  window.mainApi.receive('msgReceivedError', (event: Event, text: string) => {
    receivedError.value = text
  })
})
</script>

<style scoped>
.v-btn {
  opacity: 0.4;
}
.active {
  opacity: 1 !important;
}
</style>
