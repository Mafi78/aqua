<script setup lang="tsx">
import HeaderLayout from '@/renderer/components/layout/HeaderLayout.vue'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { handleRoute, naviElems } from '@/renderer/utils'
import { storeLeftMenuBar } from '@/renderer/store/counter'
import { storeToRefs } from 'pinia'

const { toggleLMBCollapsed, toggleLMBVisibility, changeLMBWidth } = storeLeftMenuBar()
const { leftStateCollapsed, leftStateVisible, leftWidth } = storeToRefs(storeLeftMenuBar())
const router = useRouter()
// const drawer = ref(true)
// const leftMenuWidth = ref(250)

// Dragable
/*
const navigation = ref({
  shown: true,
  width: 200,
  borderSize: 3
})
*/
const AppWidth = ref(0)
const AppHeight = ref(0)
const color = ref('red')

const receivedError = ref('')

const setSliderValue = (val) => {
  if (val >= 250 && val <= 600) {
    // leftWidth.value = val;
    changeLMBWidth(val)
    // console.log(`END Event ${val}`);
    color.value = 'green'
  } else {
    color.value = 'red'
  }
}

onMounted((): void => {
  window.mainApi.receive(
    'msgReceivedAppSizeChanged',
    (event: Event, width: number, height: number) => {
      // console.log('msgReceivedVersion is called');
      AppWidth.value = width
      AppHeight.value = height
    }
  )

  window.mainApi.receive('msgReceivedError', (event: Event, text: string) => {
    // console.log('msgReceivedVersion is called');
    receivedError.value = text
  })
  try {
    //  setBorderWidth(this)
    //  setEvents(this)
  } catch (error) {}
})
// End dragable

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

    <v-system-bar height="6" style="padding: 0px 0px 0px; margin: 14px 0px 0px">
      <!--
        step="10"
        show-ticks="always"
        tick-size="4"
        hint="Jetzt komm ich"
        @change="setSliderValue"
      -->
      <v-slider
        v-model="leftWidth"
        min="0"
        :max="AppWidth"
        style="padding: 0px 0px 0px; margin: 0px 0px 0px"
        thumb-label="always"
        :color="color"
        step="1"
        @end="setSliderValue"
      >
        <!--template #append>
          <v-text-field
            v-model="leftWidth"
            hide-details
            single-line
            density="compact"
            type="number"
            style="width: 70px"
          ></v-text-field>
        </template-->
      </v-slider>
      <!--v-icon icon="mdi-message" class="me-2"></v-icon>

        <span>10 unread messages</span>

        <v-spacer></v-spacer>

        <v-btn icon="mdi-minus" variant="text"></v-btn>

        <v-btn
          icon="mdi-checkbox-blank-outline"
          variant="text"
          class="ms-2"
        ></v-btn>

        <v-btn icon="mdi-close" variant="text" class="ms-2"></v-btn-->
    </v-system-bar>

    <!-- rail -->
    <!-- v-model="drawer" :width="leftMenuWidth" -->
    <v-navigation-drawer
      v-model="leftStateVisible"
      :rail="leftStateCollapsed"
      permanent
      :width="leftWidth"
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
        <v-list-item>
          LeftWidth: {{ leftWidth }} AppWidth: {{ AppWidth }} AppHeight: {{ AppHeight }}
        </v-list-item>
        <v-list-item>
          {{ receivedError }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer location="right" width="199px">
      <v-list>
        <!-- v-list-item title="Drawer right - Mist..."></v-list-item -->
        <v-list-item title="Links verstecken" @click.stop="toggleLMBVisibility()"></v-list-item>
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
