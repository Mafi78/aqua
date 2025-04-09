<template>
  <BasicApp>
    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-btn @click="btnClickCloseDetail">
            <v-icon left>mdi-arrow-left</v-icon>
            {{ $t("WorkOnDBDetails.Title.CloseDBDetail") }} ({{ routeNaviObj.extraInfo.localValue }})
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row class="mb-3">

        <!-- Left Column: Database Entities -->
        <v-col cols="4" class="bg-red pa-2">
          <!-- Database Entries Information -->
          <!-- This Database contains {{ sqlResultEntities.length }} entit(y/ies). Last ID inserted: {{ sqlInsertLastId }} -->
          <!-- Table to display entities and actions -->
          <v-table height="100%" fixed-header>
            <thead>
              <tr>
                <th style="width: 220px; padding-bottom: 5px; background-color: #f5f5f5;" class="text-left">{{ $t("WorkOnDBDetails.Title.Entity") }}</th>
                <!-- th style="width: 40px; padding-bottom: 5px; background-color: #f5f5f5;" class="text-center">{{ $t("WorkOnDBDetails.Title.Edit") }}</th -->
                <th style="width: 80px; padding-bottom: 5px; background-color: #f5f5f5;" class="text-center">{{ $t("WorkOnDBDetails.Title.Action") }}
                  <!-- div style="display: flex; justify-content: space-around;"> < !-- Flexbox for icons -- >
                    <v-btn icon="mdi-check-bold" class="pa-1" style="margin-right: 3px;">
                      <v-icon color="black" size="small"></v-icon>
                      <v-tooltip activator="parent" location="top">Select all</v-tooltip>
                    </v-btn>
                    <v-btn icon="mdi-close-circle-outline" class="pa-1" style="margin-right: 3px;">
                      <v-icon color="black" size="small"></v-icon>
                      <v-tooltip activator="parent" location="top">Deselect all</v-tooltip>
                    </v-btn>
                    <v-btn icon="mdi-file-export" class="pa-1">
                      <v-icon color="black" size="small"></v-icon>
                      <v-tooltip activator="parent" location="top">Export selected</v-tooltip>
                    </v-btn>
                  </div -->
                </th>
                <!-- th style="width: 40px; padding-bottom: 5px; background-color: #f5f5f5;" class="text-center">Delete</th -->
              </tr>
            </thead>
            <tbody class="table-body">
              <tr
                v-for="(item, index) in sqlResultEntities"
                :key="index"
                @click="btnClickShowEntityDetail(item)"
                @contextmenu.prevent.right="showContextMenuEntity(item, $event)"
              >
                <td>
                  Entity #{{ index + 1 }} {{ item.ENTI_NAME }} ({{ item.ENTI_ID }})
                </td>
                <!-- td class="text-center">
                  <v-btn icon="mdi-file-edit-outline" density="comfortable" variant="plain"></v-btn><v-tooltip
                    activator="parent" location="start">Edit entry</v-tooltip>
                </td-->
                <!-- td style="height: 60px;" class="checkbox-cell">
                  <v-checkbox-btn inline></v-checkbox-btn><v-tooltip activator="parent" location="start">Select
                    entry</v-tooltip>
                </td -->
                <td class="text-center">
                  <VButton
                    :label="$t('WorkOnDBDetails.Button.Delete')"
                    color="primary"
                    :clickparam="{ id: item.ENTI_ID, message: 'Delete Entity' + item.ENTI_ID }"
                    :onclick="btnClickDeleteEntityDetail" />
                </td>
              </tr>
            </tbody>
          </v-table>

          <!-- Context Menu for Main table starts here -->
          <v-menu
            v-model="contextMenuEntityLeftTable.visible"
            :activator="contextMenuEntityLeftTable.activator"
            location="end top"
            :close-on-content-click="true"
          >
            <v-list>
              <v-list-item
                @click="btnClickLeftMenuEditEntity(contextMenuEntityLeftTable.row /*.ENTI_ID, contextMenuEntityLeftTable.row.ENTI_NAME*/)"
              >
                <v-list-item-title>
                  Edit {{contextMenuEntityLeftTable.row.ENTI_NAME}}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- Context Menu fpr Main table ends here -->

          <!-- Static Footer Section -->
          <div class="static-footer">
            <v-btn class="add-entry-button" @click="btnClickLeftMenuAddEntity">{{ $t("WorkOnDBDetails.Button.AddNew") }}</v-btn>
          </div>
        </v-col>

        <!-- Middle Column: Characteristics and Values -->
        <v-col cols="3" class="bg-green pa-2">
          {{ $t("WorkOnDBDetails.Title.CharacteristicValues") }}

          <!-- Table to display/edit characteristics and values -->
          <!-- Compact density, fixed header -->
          <div v-if="sqlResultCharacteristic.length > 0">
            <v-table
            density="compact" class="custom-bordered-table" height="600px" fixed-header >
              <thead>
                <tr>
                  <th style="width: 210px; padding-bottom: 5px; background-color: #f5f5f5;" class="text-center">{{ $t("WorkOnDBDetails.Title.EntitySingle") }} {{ compEntityName[0].ENTI_NAME }}
                    </th>
                </tr>
              </thead>
              <!-- Add scrollable body -->
              <tbody class="scrollable-body">
                  <tr>
                    <td>
                      <VNumberInput v-model="sqlResultCharacteristic[0].ENCH_SHARED_UNDERSTANDING" :label="$t('WorkOnDBDetails.Title.KZ1_SU')" />
                    </td>
                </tr>
                <tr>
                  <td>
                    <VNumberInput
                      v-model="sqlResultCharacteristic[0].ENCH_PERFORMANCE_FEEDBACK" :label="$t('WorkOnDBDetails.Title.KZ2_PF')"/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <VNumberInput v-model="sqlResultCharacteristic[0].ENCH_INFLUENCE_NARRATIVE" :label="$t('WorkOnDBDetails.Title.KZ3_IN')" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <VNumberInput v-model="sqlResultCharacteristic[0].ENCH_LEADERSHIP_STYLE" :label="$t('WorkOnDBDetails.Title.KZ4_LS')"/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <VNumberInput v-model="sqlResultCharacteristic[0].ENCH_DECISIONMAKING_APPROACH" :label="$t('WorkOnDBDetails.Title.KZ5_DA')" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <VNumberInput v-model="sqlResultCharacteristic[0].ENCH_RELATIONSHIP_FOUNDATION" :label="$t('WorkOnDBDetails.Title.KZ6_RF')" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <VNumberInput v-model="sqlResultCharacteristic[0].ENCH_CONFLICT_RESOLUTION" :label="$t('WorkOnDBDetails.Title.KZ7_CR')" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <VNumberInput v-model="sqlResultCharacteristic[0].ENCH_TIME_MANAGEMENT" :label="$t('WorkOnDBDetails.Title.KZ8_TM')" />
                  </td>
                </tr>
              </tbody>
            </v-table>
            <div class="pa-2">
              <v-btn
                class="ma-2"
                @click="btnClickOKCharDetail"
              >
                <!-- v-icon
                  icon="mdi-alert-outline"
                  start
                ></v-icon-->
                {{ $t("WorkOnDBDetails.Button.Save") }}
              </v-btn>
              <v-btn
                class="ma-2"
                @click="btnClickCancelCharDetail"
              >
              {{ $t("WorkOnDBDetails.Button.Cancel") }}
              </v-btn>

            </div>
          </div>
        </v-col>

        <!-- Right Column: Scenarios Section -->
        <v-col cols="4" class="bg-yellow pa-2">
          Scenarios based on this database
          <!-- Table to display/edit characteristics and values -->
          <!-- Compact density, fixed header -->
          <v-table density="compact" class="custom-bordered-table mb-4" height="400px" fixed-header>
            <thead>
              <tr>
                <th style="width: 100px; padding-bottom: 5px; background-color: #f5f5f5;">Scenario</th>
                <th style="width: 100px; padding-bottom: 5px; background-color: #f5f5f5;">Last Edited</th>
                <th style="width: 100px; padding-bottom: 5px; background-color: #f5f5f5;" class="text-center">Update
                </th>
              </tr>
            </thead>
            <!-- Add scrollable body -->
            <tbody class="scrollable-body">
              <!-- Example scenarios -->
              <tr>
                <td style="width: 100px">Scenario 1</td>
                <td style="width: 100px">19.04.2024</td>
                <td style="width: 100px" class="td-flex-center">
                  <!-- Lock Button -->
                  <v-btn icon density="comfortable" variant="plain" class="mr-2">
                    <v-icon></v-icon>
                  </v-btn>

                  <!-- Update Button -->
                  <v-btn icon density="comfortable" variant="plain">
                    <v-icon color="grey">mdi-update</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <td style="width: 100px">Scenario 2</td>
                <td style="width: 100px">26.04.2024</td>
                <td style="width: 100px" class="td-flex-center">
                  <!-- Lock Button -->
                  <v-btn icon density="comfortable" variant="plain" class="mr-2">
                    <v-icon><!-- mdi-lock></mdi-lock --></v-icon>
                  </v-btn>

                  <!-- Update Button -->
                  <v-btn icon density="comfortable" variant="plain">
                    <v-icon color="grey">mdi-update</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <td style="width: 100px">Scenario 3</td>
                <td style="width: 100px">15.06.2024</td>
                <td style="width: 100px" class="td-flex-center">
                  <!-- Lock Button -->
                  <v-btn icon density="comfortable" variant="plain" class="mr-2">
                    <v-icon>mdi-lock-open</v-icon>
                  </v-btn>

                  <!-- Update Button -->
                  <v-btn icon density="comfortable" variant="plain">
                    <v-icon color="grey">mdi-update</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>

          <!-- Toggleable Notes Section -->
          <v-btn icon density="comfortable" variant="flat">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <span> Notes: {{ selectedEntity.ENTI_ID }}</span>
          <v-expand-transition>
            <div class="mt-4">
              <!-- v-textarea label="Add your notes here" rows="2" bg-color="white" outlined auto-grow></v-textarea -->
              <VTextarea
                v-if="sqlResultCharacteristic.length > 0"
                v-model="sqlResultCharacteristic[0].ENCH_NOTES"
                label="Add your notes here"
              >
              </VTextarea>
            </div>
          </v-expand-transition>
        </v-col>
      </v-row>

      <!-- Insert/Edit Dialog for Entities (left table) start here -->
      <v-dialog v-model="showDialogEntities" max-width="500px">
        <v-card color="white"> <!-- This makes the background white -->
          <v-card-title>
            <span class="text-h5">{{ $t(showDialogEntitiesTitle) }}</span>
          </v-card-title>

          <v-form ref="form" @submit.prevent="btnClickSendInsertEditDataEntity">
            <v-card-text>
              <VInput ref="formEntityName" v-model="entityName" type="text" placeholder="Enter Entity Name" />
              <!--VInput v-model="email" type="email" placeholder="Enter DB description" / -->
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" @click="showDialogEntities = false">{{ $t("WorkOnDBDetails.Button.Cancel") }}</v-btn>
              <v-btn color="primary" type="submit">{{ $t("WorkOnDBDetails.Button.Save") }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <!-- Insert/Edit Dialog for Entities (left table) ends here -->
    </v-container>
  </BasicApp>
</template>

<script setup lang="ts">
// Hier stehen alle Importe von Komponenten oder Funktionalitäten
import { BasicApp } from '@/renderer/components/layout'
import { VInput, VButton, VNumberInput } from '@/renderer/components/formelements'

import { /* useRoute, */ useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted, reactive, nextTick , computed } from 'vue'
// import { useI18n } from 'vue-i18n'

import { dbRTEntities /* , dbRTEntitiesCharacteristic */ } from './../../../main/utils/SqlReturnTypes'
import { EnumDBStatements, DBQueryInObject, DBValueInsertObject, DBValueOutObject } from './../../../main/utils/SqlBaseModule'
import { PiniaStoreNaviObject } from './../../../main/utils/IPCBaseModules'

import { handleRoute /* , naviElems */ } from '@/renderer/utils'
import { useNavStore } from '@/renderer/store/navStore'
import { useLogStore } from '@/renderer/store/logStore'

// Hier werden alle verwendeten Variablen definiert
const sqlResultEntities: any = ref('Unknown')
const sqlResultReferenceString = ref('Unknown')
const sqlResultCharacteristic: any = ref([])
const sqlInsertResult = ref('Unknown')
const sqlInsertLastId = ref('-')
const erfolgsmeldung = ref('nix initial')
const erfolgsmeldungInsert = ref('nix')

const entityName = ref<string>('');
const formEntityName = ref()
const selectedEntity = ref<dbRTEntities>({} as dbRTEntities);

const showDialogEntities = ref(false); // Controls dialog Entities visibility
const showDialogEntitiesTitle = ref('WorkOnDBDetails.Dialog.TitleInsert');
const showDialogEntitiesInsertOrEdit = ref('Insert');

const navStore = useNavStore();
const logStore = useLogStore();
const router = useRouter()

// computed property -> für den Fall der Namensänderung einer Entity:
const compEntityName = computed(() =>
sqlResultEntities.value.filter(item =>
    item.ENTI_ID === selectedEntity.value.ENTI_ID
  )
)
//
const contextMenuEntityLeftTable = ref({
    visible: false,
    row: {} as any,
    // activator: null as HTMLElement | null
    activator: undefined as HTMLElement | 'parent' | undefined
  })

const routeNaviObj: PiniaStoreNaviObject = (navStore.getNaviElemViaId(12) || {}) as PiniaStoreNaviObject

// Hier werden die IPC Handler definiert
// Shared error handling function
const ipcHandlerErrorMessages = (event: Event, dbValOut: DBValueOutObject, referenceString: string) => {
  console.log('msgReceiveGeneralError in ScreenWorkOnDBDetail is called');
  // receivedError.value = text (if you need reactivity, define receivedError in data)
  logStore.addLogErrorText(dbValOut.retErrorMessage);
};

// Handles the events when an insert took place
const ipcHandlerReceivedInsert = (event: Event, sqlRes: DBValueInsertObject, referenceString: string) => {
  if (referenceString === 'Entity') {
    sqlInsertResult.value = sqlRes.changes + "";
    sqlInsertLastId.value = sqlRes.lastID + "";
    showDialogEntities.value = false;

    if (showDialogEntitiesInsertOrEdit.value === 'Insert') {
      // nachdem eine Entity angelegt wurde, füge auch die DefaultWerte für die Charcteristics ein
      const paraIn = new DBQueryInObject()
      paraIn.sInQuerySql = EnumDBStatements.InsEntCharacteristics
      paraIn.aInParameter = [sqlInsertLastId.value, "-" /* Characteristic Note Text */, "-" /* Username */]
      paraIn.sInIPCResponse = 'msgReceivedInsert'

      window.mainApi.send(
        'msgInsertSQLDataPara',
        paraIn,
        "EntityCategories"
      )
    } else {
      // ansonsten lade die Daten für diese ID nochmal!
      refreshDBDetailEntitiesCharacteristicData(selectedEntity.value.ENTI_ID.toString());
      contextMenuEntityLeftTable.value.visible = false
    }
    // Neuladen der Entity Liste für die DB
    refreshDBDetailEntitiesData(routeNaviObj.extraInfo.localKey);
  } else if (referenceString === 'EntityCategories') {
    // Hier kommen nur die Updates an - Die Inserts werden automatisch gemacht
    refreshDBDetailEntitiesCharacteristicData(selectedEntity.value.ENTI_ID.toString());
  }
}

const ipcHandlerReceivedDelete = (event: Event, sqlRes: string) => {
  sqlInsertResult.value = sqlRes

  console.log("Hat Delete geklappt ..")
  erfolgsmeldungInsert.value = "Deletestatus " + sqlRes

  refreshDBDetailEntitiesData(routeNaviObj.extraInfo.localKey);
}

const ipcHandlerReceivedSQL = (event: Event, sqlRes: any, referenceString: string) => {
  sqlResultReferenceString.value = referenceString
  if (referenceString === 'Entities') {
    sqlResultEntities.value = sqlRes
  } else if (referenceString === 'EntityCategories') {
    sqlResultCharacteristic.value = sqlRes
  }

  erfolgsmeldung.value = "Daten auffrischen hat geklappt"
}
// Hier werden die verwendeten IPC Channel definiert. Pro Channel kann ein Handler zugewiesen werden. Die Variable muß reactive deniert sein
const channels = reactive([
  { name: 'msgReceivedInsert', handler: ipcHandlerReceivedInsert },
  { name: 'msgReceivedDelete', handler: ipcHandlerReceivedDelete },
  { name: 'msgReceivedSQL', handler: ipcHandlerReceivedSQL },
  // Assign the same handler to multiple delete-related channels
  { name: 'msgReceivedInsertError', handler: ipcHandlerErrorMessages },
  { name: 'msgReceiveGeneralError', handler: ipcHandlerErrorMessages },
]);

// hier wird die vue Komponente initialisert
onMounted(() => {
  erfolgsmeldung.value = "Nach onMounted: " + routeNaviObj.extraInfo.localKey;
  // languages.value = availableLocales
  //  check what kind of entries there are
  refreshDBDetailEntitiesData(routeNaviObj.extraInfo.localKey);

  // Hier werden alle IPC-Handler initialisiert
  channels.forEach(({ name, handler }) => window.mainApi.receive(name, handler));
});

// Remove IPC listeners on component unmount (to prevent memory leaks)
onUnmounted(() => {
  // Hier werden alle IPC-Handler in Ruhestand geschickt
  channels.forEach(({ name, handler }) => window.mainApi.removeListener('msgReceivedInsert', null));
});

// This function is called when the user clicks the "Add entity" button in the left area
function btnClickLeftMenuAddEntity() {
  showDialogEntitiesTitle.value = 'WorkOnDBDetails.Dialog.TitleInsert'
  entityName.value = ''
  showDialogEntities.value = true
  showDialogEntitiesInsertOrEdit.value = 'Insert'

  nextTick(() => {
      formEntityName.value?.focus?.()
    })
}

function btnClickLeftMenuEditEntity( row :dbRTEntities/* rowId, rowName */ ) {
  showDialogEntitiesTitle.value = 'WorkOnDBDetails.Dialog.TitleEdit'
  entityName.value = row.ENTI_NAME // rowName
  // entityIDToUpdate.value = row.ENTI_ID //rowId
  selectedEntity.value = row
  showDialogEntities.value = true
  showDialogEntitiesInsertOrEdit.value = 'Edit'

  nextTick(() => {
    formEntityName.value?.focus?.()
  })
}

function showContextMenuEntity(row: any, event: MouseEvent) {
    event.preventDefault();
    contextMenuEntityLeftTable.value.row = row;
    contextMenuEntityLeftTable.value.activator = event.currentTarget as HTMLElement;
    contextMenuEntityLeftTable.value.visible = true;
    nextTick(() => {
      formEntityName.value?.focus?.()
    })
  }

// ab hier kommen die Event (Buttonklick Handler)

// is called when insert or edit an Entity is clicked
const btnClickSendInsertEditDataEntity = () => {
  const paraIn = new DBQueryInObject()
  if (showDialogEntitiesInsertOrEdit.value === 'Insert') {
    // insert a new entity
    paraIn.aInParameter = [entityName.value, "0" /* Category ID */, "Notestext", routeNaviObj.extraInfo.localKey, "1" /* Characteristic ID - will be replaced soon */]
    paraIn.sInQuerySql = EnumDBStatements.InsEntities
    paraIn.sInIPCResponse = 'msgReceivedInsert'
    paraIn.sInIPCResponseError = 'msgReceivedInsertError'
  } else {
    // update the entity
    paraIn.aInParameter = [entityName.value, selectedEntity.value.ENTI_ID.toString()]
    paraIn.sInQuerySql = EnumDBStatements.UpdateEntities
    paraIn.sInIPCResponse = 'msgReceivedInsert'
    paraIn.sInIPCResponseError = 'msgReceiveGeneralError'
  }

  window.mainApi.send(
    'msgInsertSQLDataPara',
    paraIn,
    "Entity"
  )
};

// function that loads the data for the specific DB entry
function refreshDBDetailEntitiesData(dbId: string) {
  const paraIn = new DBQueryInObject()
  paraIn.sInQuerySql = EnumDBStatements.SelEntriesWithDbID;
  paraIn.aInParameter = [routeNaviObj.extraInfo.localKey]

  //  check what kind of entries there are
  window.mainApi.send(
    'msgRequestSQLDataPara',
    paraIn,
    'Entities'
  )
}

// this is called when clicked on the close button
const btnClickCloseDetail = () => {
  let naviobj = new PiniaStoreNaviObject();
  naviobj = navStore.getNaviElemViaId(12);
  naviobj.visible = false;

  let naviobjParent = new PiniaStoreNaviObject();
  naviobjParent = navStore.getNaviElemViaId(11);

  handleRoute(naviobjParent.action, router)
}

const btnClickOKCharDetail = () => {
  const paraIn = new DBQueryInObject()
  // update the entity Characteristics
  paraIn.aInParameter = [sqlResultCharacteristic.value[0].ENCH_NOTES, sqlResultCharacteristic.value[0].ENCH_SHARED_UNDERSTANDING, sqlResultCharacteristic.value[0].ENCH_PERFORMANCE_FEEDBACK, sqlResultCharacteristic.value[0].ENCH_INFLUENCE_NARRATIVE, sqlResultCharacteristic.value[0].ENCH_LEADERSHIP_STYLE, sqlResultCharacteristic.value[0].ENCH_DECISIONMAKING_APPROACH, sqlResultCharacteristic.value[0].ENCH_RELATIONSHIP_FOUNDATION, sqlResultCharacteristic.value[0].ENCH_CONFLICT_RESOLUTION, sqlResultCharacteristic.value[0].ENCH_TIME_MANAGEMENT, sqlResultCharacteristic.value[0].ENCH_ENTI_ID]
  paraIn.sInQuerySql = EnumDBStatements.UpdateEntityCharacteristics
  paraIn.sInIPCResponse = 'msgReceivedInsert'
  paraIn.sInIPCResponseError = 'msgReceiveGeneralError'

  window.mainApi.send(
    'msgInsertSQLDataPara',
    paraIn,
    "EntityCategories"
  )
}

const btnClickCancelCharDetail = () => {
  // refreshDBDetailEntitiesData(entityIDToUpdate.value);
  refreshDBDetailEntitiesCharacteristicData( selectedEntity.value.ENTI_ID.toString() /* entityIDToUpdate.value */ );
}

const btnClickShowEntityDetail = (EntityObj) => {
  selectedEntity.value = EntityObj
  contextMenuEntityLeftTable.value.activator = undefined

  refreshDBDetailEntitiesCharacteristicData(EntityObj.ENTI_ID)
}

function refreshDBDetailEntitiesCharacteristicData(entityId: string) {
  const paraIn = new DBQueryInObject()
  paraIn.sInQuerySql = EnumDBStatements.SelEntityCharacteristicsWithEntityID;
  paraIn.aInParameter = [entityId]

  //  check what kind of entries there are
  window.mainApi.send(
    'msgRequestSQLDataPara',
    paraIn,
    'EntityCategories'
  )
}

// Define a function to handle delete Statement
const btnClickDeleteEntityDetail = (teststr: any) => {
  // Perform form submission logic here
  deleteEntity(teststr.id, teststr.message);
}

function deleteEntity(testid: string, testmsg: string) {
  erfolgsmeldung.value = "Löschen ... " + testid + " " + testmsg;

  const paraIn = new DBQueryInObject()
  paraIn.sInQuerySql = EnumDBStatements.DelEntities
  paraIn.aInParameter = [testid]
  paraIn.sInIPCResponse = 'msgReceivedDelete'
  paraIn.sInIPCResponseError = 'msgReceivedDeleteError'

  window.mainApi.send(
    'msgDeleteSQLDataPara',
    paraIn
  )
}

</script>


<style scoped>
button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>