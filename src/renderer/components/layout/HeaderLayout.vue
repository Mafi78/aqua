<script setup lang="tsx">
// import { /* useRoute, */ useRouter } from 'vue-router'
import { ref, onMounted /* ,computed */ } from 'vue'
// import { handleRoute /*, naviElems */ } from '@/renderer/utils'
// import { storeLeftMenuBar } from '@/renderer/store/counter'

// const router = useRouter()
// const route: any = useRoute()
/*
const titleKey: string = (route?.meta?.titleKey || 'title.main') as string

const { toggleLMBCollapsed } = storeLeftMenuBar()

const naviElemFiltered = computed(() => naviElems.filter((naviElem) => naviElem.visible === true))
*/
const receivedError = ref('')
/*
const dialog = ref(false)

const isCurrentRoute = (path: string): boolean => {
  return path === route.path
}
*/

/*
const naviElems = [
    { title: 'Home', action: '/', icon: 'mdi-folder' },
    { title: 'Zweiteseite', action: '/second', icon: 'mdi-account-multiple' },
    { title: 'Einstellungen', action: '/preferences', icon: '' },
    { title: 'Test', action: '/test', icon: '' },
  ]
*/

// const checkText = ref('Hallo')

/*
const changeVisible = (path: string): void => {
  // console.log(path);
  // checkText.value = path
  handleRoute(path, router)
}

const cleanErrorList = (): void => {
  window.mainApi.send('msgRequestCleanErrors')
}
*/
onMounted((): void => {
  window.mainApi.receive('msgReceivedError', (event: Event, text: string) => {
    receivedError.value = text
  })
})

// const jetztnicht = false
</script>

<!--template>
  <v-app-bar color="primary" dark app fixed-->
    <!--template #prepend>
      <v-app-bar-nav-icon id="menu-activator" @click.stop="toggleLMBCollapsed()">
      </v-app-bar-nav-icon>
    </template-->

    <!--v-app-bar-title>{{ $t(titleKey) }}</v-app-bar-title-->


    <!--v-label>{{ receivedError.length }}</v-label-->

    <!--v-btn :class="{ active: isCurrentRoute('/') }" @click="handleRoute('/', router)">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn :class="{ active: isCurrentRoute('/second') }" @click="handleRoute('/second', router)">
      <v-icon>mdi-heart</v-icon>
    </v-btn-->

    <!--v-btn v-if="receivedError.length > 0">
      <v-icon>mdi-alert</v-icon>
      <v-dialog v-model="dialog" activator="parent" width="auto">
        <v-card>
          <v-card-text>
            {{ receivedError }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialog = false">Close Dialog</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="cleanErrorList()">Clean Errors</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn-->


    <!--v-menu activator="#menu-threedots">
      <v-list>
        <v-list-item
          v-for="(item, index) in naviElemFiltered"
          :key="index"
          :value="index"
          @click="changeVisible(item.action)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu-->
  <!--/v-app-bar>
</template-->

<style scoped>
.v-btn {
  opacity: 0.4;
}
.active {
  opacity: 1 !important;
}
</style>
