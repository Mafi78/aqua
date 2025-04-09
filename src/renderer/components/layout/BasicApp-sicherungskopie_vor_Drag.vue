<script setup lang="ts">
import HeaderLayout from '@/renderer/components/layout/HeaderLayout.vue'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { handleRoute, naviElems } from '@/renderer/utils'
import { storeLeftMenuBar } from '@/renderer/store/counter'
import { storeToRefs } from 'pinia'

const { toggleLMBCollapsed } = storeLeftMenuBar()
const { leftStateCollapsed } = storeToRefs(storeLeftMenuBar())
const router = useRouter()
const drawer = ref(true)
const leftMenuWidth = ref(250)

// v-bottomsheet Eigenschaften
const sheet = ref(false)
const tiles = [
  { img: 'keep.png', title: 'Keep' },
  { img: 'inbox.png', title: 'Inbox' },
  { img: 'hangouts.png', title: 'Hangouts' },
  { img: 'messenger.png', title: 'Messenger' },
  { img: 'google.png', title: 'Google+' }
]

const naviElemFiltered = computed(() => naviElems.filter((naviElem) => naviElem.visible === true))

const toggleBottomVisibility = (): void => {
  sheet.value = !sheet.value
}
</script>

<template>
  <v-app>
    <HeaderLayout />

    <!-- rail -->
    <!-- v-model="drawer" :width="leftMenuWidth" -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="leftStateCollapsed"
      permanent
      :width="leftMenuWidth"
    >
      <v-list>
        <v-list-item
          prepend-avatar="/images/Manfred_Schwarz.png"
          title="Manfred Schwarz"
          subtitle="manfred.schwarz@gmail.com"
        >
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-folder"
          title="Hauptschirm"
          value="/"
          @click="handleRoute('/', router)"
        >
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Zweitschirm"
          value="/second"
          @click="handleRoute('/second', router)"
        >
        </v-list-item>
      </v-list-->
      <v-list>
        <v-list-item
          v-for="(item, index) in naviElemFiltered"
          :key="index"
          :value="index"
          :prepend-icon="item.icon"
          :title="item.title"
          @click="handleRoute(item.action, router)"
        >
          <!-- v-list-item-title>{{ item.title }}</v-list-item-title -->
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer location="right" width="199px">
      <v-list>
        <!-- v-list-item title="Drawer right - Mist..."></v-list-item -->
        <v-list-item title="Links verstecken" @click.stop="drawer = !drawer"></v-list-item>
        <!-- v-list-item title="Links ein/ausklappen" @click.stop="rail = !rail"></v-list-item -->
        <v-list-item title="Links ein/ausklappen" @click.stop="toggleLMBCollapsed()"></v-list-item>
      </v-list>

      <div class="text-center">
        <v-btn
          color="purple"
          size="x-large"
          text="Click Me"
          @click.stop="toggleBottomVisibility()"
        ></v-btn>
      </div>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>

    <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-list-subheader>Open in</v-list-subheader>

        <v-list-item
          v-for="tile in tiles"
          :key="tile.title"
          :prepend-avatar="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
          :title="tile.title"
          @click="sheet = false"
        >
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </v-app>
</template>
