<template>
  <BasicApp>
    <v-container>
      <v-row align="center">
        <v-col cols="auto" >
          <v-btn @click="btnClickCloseDetail">
            <v-icon left>mdi-arrow-left</v-icon>
            Close DB Details ({{ routeNaviObj.extraInfo.localValue }})
          </v-btn>
        </v-col>
        <!-- v-col cols="auto">
          <span class="text-h6">{{ $t(titleKey) }}Hello, Vuetify!</span>
          {{ routeNaviObj }}
          [{{ sqlResultEntities }},
          {{ sqlResultReferenceString }},
          Erfolgsmeldung {{ erfolgsmeldung }}]
        </v-col -->
      </v-row>
    </v-container>
    <!-- h2> {{ $t(titleKey) }} Work on DB Detail !!</h2 -->
    <v-container>

      <v-row class="mb-3">

        <!-- Left Column: Database Entities -->
        <v-col cols="5" class="bg-red pa-2">
          <!-- Database Entries Information -->
          This Database contains {{ sqlResultEntities.length }} entit(y/ies). Last ID inserted: {{ sqlInsertLastId }}
          <!-- Table to display entities and actions -->
          <v-table height="400px" fixed-header>
            <thead>
                <tr>
                    <th style="width: 250px; padding-bottom: 5px; background-color: #f5f5f5;" class="text-left">Entity # and Name</th>
                    <th style="width: 40px; padding-bottom: 5px; background-color: #f5f5f5;" class="text-center">Edit</th>
                    <th style="width: 80px; padding-bottom: 5px; background-color: #f5f5f5;" class="text-center">Actions
                        <div style="display: flex; justify-content: space-around;"> <!-- Flexbox for icons -->
                            <v-btn icon="mdi-check-bold"  class="pa-1"  style="margin-right: 3px;">
                              <v-icon color="black" size="small"></v-icon>
                              <v-tooltip activator="parent" location="top">Select all</v-tooltip>
                            </v-btn>
                            <v-btn icon="mdi-close-circle-outline"  class="pa-1"  style="margin-right: 3px;">
                              <v-icon color="black" size="small"></v-icon>
                              <v-tooltip activator="parent" location="top">Deselect all</v-tooltip>
                            </v-btn>
                            <v-btn icon="mdi-file-export" class="pa-1" >
                              <v-icon color="black" size="small"></v-icon>
                              <v-tooltip activator="parent" location="top">Export selected</v-tooltip>
                            </v-btn>
                          </div>
                    </th>
                    <th style="width: 40px; padding-bottom: 5px; background-color: #f5f5f5;" class="text-center">Delete</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <!-- tr>
                    <td>Entity #1</td>
                    <td class="text-center"><v-btn icon="mdi-file-edit-outline" density="comfortable" variant="plain"></v-btn><v-tooltip activator="parent" location="start">Edit entry</v-tooltip></td>
                    <td style="height: 60px;" class="checkbox-cell"><v-checkbox-btn inline></v-checkbox-btn><v-tooltip activator="parent" location="start">Select entry</v-tooltip></td>
                    <td class="text-center"><v-btn icon="mdi-trash-can-outline" density="comfortable" variant="plain"></v-btn><v-tooltip activator="parent" location="start">Delete entry</v-tooltip></td>
                </tr -->
                <tr v-for="(item, index) in sqlResultEntities" :key="index" @click="btnClickShowEntityDetail( item)">
                  <td>
                    Entity #{{ index + 1 }} {{ item.ENTI_NAME }}
                  </td>
                  <td class="text-center">
                    <v-btn icon="mdi-file-edit-outline" density="comfortable" variant="plain"></v-btn><v-tooltip activator="parent" location="start">Edit entry</v-tooltip>
                  </td>
                  <td style="height: 60px;" class="checkbox-cell">
                    <v-checkbox-btn inline></v-checkbox-btn><v-tooltip activator="parent" location="start">Select entry</v-tooltip>
                  </td>
                  <td class="text-center">
                    <!-- v-btn icon="mdi-trash-can-outline" density="comfortable" variant="plain"></v-btn><v-tooltip activator="parent" location="start">Delete entry</v-tooltip -->
                    <VButton
                      label="Delete"
                      color="primary"
                      :clickparam="{ id: item.ENTI_ID, message: 'Delete Entity' + item.ENTI_ID }"
                    :onclick="btnClickDeleteEntityDetail"
                  />
                  </td>
                </tr>
            </tbody>
            </v-table>

          <!-- Static Footer Section -->
          <div class="static-footer">
            <v-btn class="add-entry-button" @click="showDialogEntities = true">Add new entry</v-btn>
          </div>
        </v-col>

        <!-- Middle Column: Characteristics and Values -->
        <v-col cols="3" class="bg-green pa-2">
            Characteristic and Value

          <!-- Table to display/edit characteristics and values -->
          <!-- Compact density, fixed header -->
          <v-table density="compact" class="custom-bordered-table" height="600px" fixed-header>
            <thead>
                <tr>
                    <th style="width: 210px; padding-bottom: 5px; background-color: #f5f5f5;" class="text-center">Entity name here</th>
                </tr>
            </thead>
            <!-- Add scrollable body -->
            <tbody class="scrollable-body">
              <tr v-for="(item, index) in sqlResultCharacteristic" :key="index">
                <td class="custom-text-field">
                  {{ item.ENCH_SHARED_UNDERSTANDING }}
                </td>
              </tr>
            <!-- Example characteristic rows -->
            <!-- tr>
              <td class="custom-text-field">
                <v-number-input
                      label="Shared understanding"
                      inset
                      variant="outlined"
                      rounded
                      density="compact"
                      width="200"
                      class="v-number-input"
                      placeholder="22"
                    ></v-number-input>
              </td>
            </tr -->
            </tbody>
          </v-table>
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
                  <th style="width: 100px; padding-bottom: 5px; background-color: #f5f5f5;" class="text-center">Update</th>
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
                      <v-btn icon density="comfortable" variant="plain"  class="mr-2">
                        <v-icon></v-icon>
                      </v-btn>

                      <!-- Update Button -->
                      <v-btn icon density="comfortable" variant="plain" >
                        <v-icon color="grey" >mdi-update</v-icon>
                      </v-btn>
                </td>
              </tr>
              <tr>
                <td style="width: 100px">Scenario 2</td>
                <td style="width: 100px">26.04.2024</td>
                <td style="width: 100px" class="td-flex-center">
                      <!-- Lock Button -->
                      <v-btn icon density="comfortable" variant="plain" class="mr-2">
                        <v-icon><mdi-lock></mdi-lock></v-icon>
                      </v-btn>

                      <!-- Update Button -->
                      <v-btn icon density="comfortable" variant="plain" >
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
                      <v-btn icon density="comfortable" variant="plain" >
                        <v-icon color="grey" >mdi-update</v-icon>
                      </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>

          <!-- Toggleable Notes Section -->
          <v-btn  icon density="comfortable" variant="flat">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <span> Notes</span>
          <v-expand-transition>
            <div class="mt-4">
              <v-textarea
                label="Add your notes here"
                rows="2"
                bg-color="white"
                outlined
                auto-grow
              ></v-textarea>
            </div>
          </v-expand-transition>
        </v-col>
      </v-row>

      <!-- Insert Dialog Entities start here -->
      <v-dialog v-model="showDialogEntities" max-width="500px">
        <v-card color="white"> <!-- This makes the background white -->
          <v-card-title>
            <span class="text-h5">Insert New Entity</span>
          </v-card-title>

          <v-card-text>
            <v-form ref="form">
              <VInput v-model="entitynName" type="text" placeholder="Enter Entity Name" />
              <!--VInput v-model="email" type="email" placeholder="Enter DB description" / -->
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" @click="showDialogEntities = false">Cancel</v-btn>
            <v-btn color="primary" @click="btnClickSendInsertDataEntity">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Insert Dialog ends here -->
    </v-container>
  </BasicApp>
</template>


<script setup lang="ts">
  import { BasicApp } from '@/renderer/components/layout'
  import { VInput, VButton  } from '@/renderer/components/formelements'

  import { /* useRoute, */ useRouter } from 'vue-router'
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'

  import { dbRTDatabase } from './../../../main/utils/SqlReturnTypes'
  import { EnumDBStatements, DBQueryInObject, DBValueInsertObject, DBValueOutObject } from './../../../main/utils/SqlBaseModule'
  import { PiniaStoreNaviObject } from './../../../main/utils/IPCBaseModules'

  import { handleRoute /* , naviElems */ } from '@/renderer/utils'
  import { useNavStore } from '@/renderer/store/navStore'
  import { useLogStore } from '@/renderer/store/logStore'

  // import { storeToRefs } from "pinia";

  // the following two lines were used in order to show the used title
  // const route: any = useRoute()
  // const titleKey: string = (route?.meta?.titleKey || 'title.main') as string
  const languages = ref(['en'])
  const { /* locale, */ availableLocales } = useI18n()
  const sqlResultEntities : any = ref('Unknown')
  const sqlResultReferenceString = ref('Unknown')
  const sqlResultCharacteristic : any = ref('Unknown')
  const sqlInsertResult = ref('Unknown')
  const sqlInsertLastId = ref('-')
  // const constantResult = ref('Unknown')
  const erfolgsmeldung = ref('nix initial')
  const erfolgsmeldungInsert = ref('nix')
  const showDialogEntities = ref(false); // Controls dialog Entities visibility
  const entitynName = ref<string>('');

  const navStore = useNavStore();
  const logStore = useLogStore();
  const router = useRouter()


  // const { naviElems } = storeToRefs(navStore);
  const routeNaviObj: PiniaStoreNaviObject = ( navStore.getNaviElemViaId(12) || {}) as PiniaStoreNaviObject

  onMounted((): void => {
    // const router = useRouter()

    erfolgsmeldung.value = "Nach onMounted: " + routeNaviObj.extraInfo.localKey;
    languages.value = availableLocales

    //  check what kind of entries there are
    refreshDBDetailEntitiesData( routeNaviObj.extraInfo.localKey );

    // this is called when a insert statement is ok
    window.mainApi.receive('msgReceivedInsert', (event: Event, sqlRes: DBValueInsertObject, referenceString: string ) => {
      // sqlInsertResult.value = sqlRes
      /*
      console.log("Hat Insert geklappt ..")
      console.log(sqlRes)
      */
      if (referenceString === 'Entity') {
        sqlInsertResult.value = sqlRes.changes + "";
        sqlInsertLastId.value = sqlRes.lastID + "";
        showDialogEntities.value = false;
      } else if (referenceString === 'EntityCategories') {
        // sqlInsertResult.value = sqlRes
      }
      erfolgsmeldungInsert.value = "Insertstatus " + sqlRes

      refreshDBDetailEntitiesData( routeNaviObj.extraInfo.localKey);
    })

    // this is called when a delete statement is ok
    window.mainApi.receive('msgReceivedDelete', (event: Event, sqlRes: string ) => {
      sqlInsertResult.value = sqlRes

      console.log("Hat Delete geklappt ..")
      erfolgsmeldungInsert.value = "Deletestatus " + sqlRes

      refreshDBDetailEntitiesData( routeNaviObj.extraInfo.localKey );
    })

    // this is called when a select statement is returned. There are multiple calls, those are divided via reference strings when calling the ReceiveSQL
    window.mainApi.receive('msgReceivedSQL', (event: Event, sqlRes: dbRTDatabase, referenceString: string ) => {
      sqlResultReferenceString.value = referenceString
      if (referenceString === 'Entities') {
        sqlResultEntities.value = sqlRes
      } else if (referenceString === 'EntityCategories') {
        sqlResultCharacteristic.value = sqlRes
      }

      erfolgsmeldung.value = "Daten auffrischen hat geklappt"
    })

    // Hier werden die Error Meldungen abgefangen
    window.mainApi.receive(
      /* 'msgReceiveGeneralError' */ 'msgReceivedInsertError',
      (event: Event, dbValOut: DBValueOutObject, referenceString: string ) => {
        console.log('msgReceiveGeneralError in ScreenWorkOnDBDetail is called');
        // receivedError.value = text
        logStore.addLogErrorText(dbValOut.retErrorMessage);
    })
  })

  onUnmounted((): void => {
    window.mainApi.removeListener('msgReceivedInsert', null);
  })

  const btnClickSendInsertDataEntity = () => {
    const paraIn = new DBQueryInObject()
    paraIn.sInQuerySql = EnumDBStatements.InsEntities
    paraIn.aInParameter = [entitynName.value, "0" /* Category ID */ , "Notestext", routeNaviObj.extraInfo.localKey, "1" /* Characteristic ID - will be replaced soon */]
    paraIn.sInIPCResponse = 'msgReceivedInsert'
    paraIn.sInIPCResponseError = 'msgReceivedInsertError'

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

  const btnClickShowEntityDetail = ( EntityObj ) => {
    const paraIn = new DBQueryInObject()
    paraIn.sInQuerySql = EnumDBStatements.SelEntityCharacteristicsWithEntityID;
    paraIn.aInParameter = [EntityObj.ENTI_ID]

    //  check what kind of entries there are
    window.mainApi.send(
      'msgRequestSQLDataPara',
      paraIn,
      'EntityCategories'
    )
  }

  // Define a function to handle delete Statement
  const btnClickDeleteEntityDetail = (teststr : any) => {
    // Perform form submission logic here
    deleteEntity(teststr.id, teststr.message);
  }

  function deleteEntity(testid : string, testmsg: string) {
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