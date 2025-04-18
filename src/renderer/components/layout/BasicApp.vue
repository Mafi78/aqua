<script setup lang="ts">
// import HeaderLayout from '@/renderer/components/layout/HeaderLayout.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed /*, watch */ } from 'vue'
import { handleRoute /* , naviElems */ } from '@/renderer/utils'

import { useNavStore } from '@/renderer/store/navStore'
import { useLogStore } from '@/renderer/store/logStore'
// import { LogStoreObject } from '@/main/utils/IPCBaseModules'

const navStore = useNavStore();
const logStore = useLogStore();

// const { toggleLMBCollapsed, toggleLMBVisibility /* , changeLMBWidth */ } = storeLeftMenuBar()

const router = useRouter()

const AppWidth = ref(0)
const AppHeight = ref(0)
const vRail = ref(false)

const receivedError = ref('')


const showErrorsDialog = ref(false); // Controls ErrorDialog visibility

/*
const naviElemFiltered = computed(() => naviElems.filter((naviElem) => naviElem.visible === true))
*/

// const logObjects = computed(() => logStore.getAllLogs);
const logObjectsError = computed(() => logStore.getErrorLogs);
const logObjectsInfo = computed(() => logStore.getInfoLogs);
// const logObjects = computed(() => logStore.getErrorLogs);

/*
watch(naviElemFiltered, (newValue, oldValue) => {
  // debugger
  testAusgabe.value = `naviElemFiltered changed from "${oldValue}" to "${newValue}"`;
  console.log(`naviElemFiltered changed from "${oldValue}" to "${newValue}"`);
});
*/

onMounted((): void => {
  // Hier wird abgefangen was passiert wenn sich die Groesse des Fenster aendert
  window.mainApi.receive(
    'msgReceivedAppSizeChanged',
    (event: Event, width: number, height: number) => {
      // console.log('msgReceivedVersion is called');
      AppWidth.value = width
      AppHeight.value = height
    }
  )

  // Hier werden die Error Meldungen abgefangen
  window.mainApi.receive(
    'msgReceivedError',
    (event: Event, text: string) => {
      console.log('msgReceivedError in BasicApp is called');
      receivedError.value = text
      logStore.addLogErrorText(text);
  })
  try {
    //  setBorderWidth(this)
    //  setEvents(this)
  } catch (error) {}

  // Hier werden die Log Einträge aufgefangen
  window.mainApi.receive(
    'msgReceivedLogEntries',
    (event: Event, logText: string) => {
      // console.log('msgReceivedVersion is called');
      logStore.addLogInfoText(logText);
    }
  )

})

const removeLogItem = async (logId : number): Promise<void> => {
  logStore.deleteLog(logId);
}

// End dragable

// const naviElemFiltered = computed(() => navStore.getNaviElems.filter((naviElem) => naviElem.visible === true))
</script>

<template>
  <v-app>
    <!--HeaderLayout /-->
    <v-layout class="rounded rounded-md fill-height" >
      <v-navigation-drawer
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        theme="dark"
        permanent
        :rail="vRail"
        app
      >
        <v-list>
          <!-- v-for="(item /*, index */ ) in navStore.getNaviElemsFiltered"  -->
          <v-list-item
            v-for="(item) in navStore.getNaviElemsFiltered"
            :key="item.id"
            :value="item.id"
            :prepend-icon="item.icon"
            :title="item.title"
            @click="handleRoute(item.action, router)"
          >
          </v-list-item>
        </v-list>
        <v-divider></v-divider>

        <v-divider></v-divider>
        <v-list v-if="logObjectsInfo.length>0" style="max-height: 200px" class="overflow-y-auto">
          <v-list-item
            v-for="(logItem, index) in logObjectsInfo" :key="index"
            :value="index">
            <input v-model="logItem.errorId" placeholder="ID" />
            <input v-model="logItem.errorText" placeholder="Text" />
            <input v-model="logItem.errorType" placeholder="Type" />
            <v-btn @click="removeLogItem(logItem.errorId)">Remove</v-btn>
          </v-list-item>
        </v-list>
        <template #append>
          <div class="pa-2">
            <v-btn
              v-if="logObjectsError.length>0"
              class="ma-2"
              @click="showErrorsDialog = true"
            >
              <v-icon
                icon="mdi-alert-outline"
                start
              ></v-icon>
              Error
            </v-btn>
            <v-btn
              v-if="logObjectsInfo.length>0"
              class="ma-2"
            >
              <v-icon
                icon="mdi-information"
                start
              ></v-icon>
              Info
            </v-btn>

          </div>
        </template>
      </v-navigation-drawer>

      <v-main class="scrollable-main" >
        <slot />
      </v-main>

      <!-- Insert Dialog start here -->
      <!-- max-width="500px" -->
      <v-dialog v-model="showErrorsDialog" >
        <v-card>
          <!-- Header -->
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Errors</span>
            <v-btn icon="mdi-close" variant="text" @click="showErrorsDialog = false"></v-btn>
          </v-card-title>

          <!-- List Items -->
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(logItem, index) in logObjectsError" :key="index"
                :value="index">
                <input v-model="logItem.errorId" placeholder="ID" style="width:30px"/>
                <input v-model="logItem.errorText" placeholder="Text" style="width:90%"/>
                <!-- input v-model="logItem.errorType" placeholder="Type" /-->
                <v-btn
                  style="width:50px"
                  @click="removeLogItem(logItem.errorId)"
                >Remove</v-btn>
              </v-list-item>
            </v-list>
          </v-card-text>

          <!-- Footer -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <span class="text-caption">This is the footer text.</span>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-layout>
  </v-app>
</template>


<style scoped>
  .fill-height {
    height: 100vh !important;
  }

  .scrollable-main {
    overflow: auto;
    height: calc(100vh - 0px); /* Adjust based on your toolbar height */
  }
</style>