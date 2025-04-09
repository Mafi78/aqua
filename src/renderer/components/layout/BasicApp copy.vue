<script setup lang="ts">
import HeaderLayout from '@/renderer/components/layout/HeaderLayout.vue'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { handleRoute, naviElems } from '@/renderer/utils'
// import { storeLeftMenuBar } from '@/renderer/store/counter'
// import { storeToRefs } from 'pinia'

// const { toggleLMBCollapsed, toggleLMBVisibility /* , changeLMBWidth */ } = storeLeftMenuBar()
// const { leftStateCollapsed, leftStateVisible, leftWidth } = storeToRefs(storeLeftMenuBar())
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
// const color = ref('red')
const vRail = ref(false)

const receivedError = ref('')

/*
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
*/

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
// const sheet = ref(false)
/*
const tiles = [
  { img: 'keep.png', title: 'Keep' },
  { img: 'inbox.png', title: 'Inbox' },
  { img: 'hangouts.png', title: 'Hangouts' },
  { img: 'messenger.png', title: 'Messenger' },
  { img: 'google.png', title: 'Google+' }
]
*/

const naviElemFiltered = computed(() => naviElems.filter((naviElem) => naviElem.visible === true))

/*
const toggleBottomVisibility = (): void => {
  sheet.value = !sheet.value
}
*/
</script>

<template>
  <v-app>
    <HeaderLayout />

    <v-layout class="rounded rounded-md">
      <v-navigation-drawer
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        theme="dark"
        permanent
        :rail="vRail"
      >
        <!-- v-list nav>
            <v-list-item prepend-icon="mdi-file-cabinet" title="Access Scenario" value="AccessScenario" @click.stop="vRail = !vRail"></v-list-item>
            <v-list-item prepend-icon="mdi-movie-open" title="Run a Scenario" value="RunScenario" @click.stop="vRail = !vRail"></v-list-item>
            <v-list-item prepend-icon="mdi-run-fast" title="Prepare on-the-go" value="OnTheGo"  @click.stop="vRail = !vRail"></v-list-item>
            <v-list-item prepend-icon="mdi-database-edit" title="Work on a Database" value="WorkOnDatabase"  @click.stop="vRail = !vRail"></v-list-item>
            <v-list-item prepend-icon="mdi-book-open-outline" title="Access Documentation" value="AccessDocumentation" ></v-list-item>
            <v-list-item prepend-icon="mdi-handshake" title="Culture Hints" value="CultureHints" ></v-list-item>
          </v-list -->
        <v-list>
          <v-list-item
            v-for="(item, index) in naviElemFiltered"
            :key="index"
            :value="index"
            :prepend-icon="item.icon"
            :title="item.title"
            @click="handleRoute(item.action, router)"
          >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <slot />
      </v-main>
    </v-layout>

    <!-- v-system-bar height="6" style="padding: 0px 0px 0px; margin: 14px 0px 0px">
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
      </v-slider>
    </v-system-bar -->

    <!-- v-navigation-drawer
      v-model="leftStateVisible"
      :rail="leftStateCollapsed"
      permanent
      :width="leftWidth"
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in naviElemFiltered"
          :key="index"
          :value="index"
          :prepend-icon="item.icon"
          :title="item.title"
          @click="handleRoute(item.action, router)"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer location="right" width="199px">
      <v-list>
        <v-list-item title="Links verstecken" @click.stop="toggleLMBVisibility()"></v-list-item>
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
    </v-bottom-sheet -->
  </v-app>
</template>
