<template>
  <BasicApp>
    <h2 >{{ $t(titleKey) }}</h2>
    <v-container>
      <v-row style="min-height: 550px" class="bg-orange">
        <v-col cols="12">
          <!-- Main table starts here -->
          <v-table density="compact">
            <thead>
              <tr>
                <th class="text-left"> {{ $t("WorkOnDB.Title.Index") }}</th>
                <th class="text-left"> {{ $t("WorkOnDB.Title.Name") }}  </th>
                <th class="text-left"> {{ $t("WorkOnDB.Title.Description") }}  </th>
                <th class="text-left"> {{ $t("WorkOnDB.Title.Action") }}  </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in sqlResult"
                :key="index"
                @contextmenu.prevent.right="handleRightClick(item, $event)"
                @click="contextMenu.activator = undefined"
              >
              <!-- :ref="(el) => setRowRef(item.DABA_ID, el)" -->
                <td>{{ index }}. ID = {{ item.DABA_ID }} </td>
                <td>{{ item.DABA_NAME }}</td>
                <td>{{ item.DABA_NOTES }}</td>
                <td>
                  <!-- VButton
                    :label="$t('WorkOnDB.Button.Delete')"
                    color="primary"
                    :clickparam="{ id: item.DABA_ID, message: 'Delete parent' + item.DABA_ID }"
                    :onclick="deleteDBLine"
                  / -->
                  <!-- VButtonWOClick
                    :label="$t('WorkOnDB.Button.Delete')"
                    color="primary"
                    :param="item"
                    :click="openConfirm"
                  / -->
                  <VConfirmButton
                    label="Delete"
                    color="red"
                    :param="item"
                    confirm-title="Confirm Delete"
                    confirm-message="Are you sure you want to delete this item?"
                    @confirmed="deleteDBLine"
                  />
                  <VButton
                    :label="$t('WorkOnDB.Button.Edit')"
                    color="green"
                    :clickparam="{ id: item.DABA_ID, message: /*'Edit from parent' +*/ item.DABA_NAME }"
                    :onclick="editDBLine2"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>

          <!-- VConfirmDialog
            v-model="showConfirmDialog"
            title="Are you sure?"
            message="This action cannot be undone."
            @confirm="handleConfirm"
            @cancel="handleCancel"
          / -->
          <!-- Main table ends here -->
          <!-- Context Menu fpr Main table starts here -->
          <v-menu
            v-model="contextMenu.visible"
            :activator="contextMenu.activator"
            location="end top"
            :close-on-content-click="false"
          >
            <v-list>
              <v-list-item
                @click="btnClickOpenEditDialog(contextMenu.row.DABA_ID, contextMenu.row.DABA_NAME, contextMenu.row.DABA_NOTES)"
              >
                <v-list-item-title>
                  Edit {{contextMenu.row.DABA_NAME}}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- Context Menu fpr Main table ends here -->
        </v-col>
      </v-row>
      <!-- Lower part below the table with buttons - starts here -->
      <v-row style="min-height: 75px" class="bg-indigo">
        <v-col cols="12">
          <v-btn density="comfortable" icon="mdi-table-plus" variant="tonal" @click="btnClickOpenInsertDialog">
            <v-icon color="black"></v-icon>
            <v-tooltip activator="parent" location="top">{{ $t("WorkOnDB.Tooltip.AddEntry") }}</v-tooltip>
          </v-btn>
          <!-- contextMenu }} -->
        </v-col>
      </v-row>
      <!-- Lower part below the table with buttons - ends here -->

      <!-- Insert/Edit Dialog start here -->
      <v-dialog v-model="showDialog" max-width="500px">
        <v-card color="white"> <!-- This makes the background white -->
          <v-card-title>
            <span class="text-h5">{{ $t(showDialogTitle) }}</span>
          </v-card-title>

          <v-form ref="form" @submit.prevent="btnClickSaveDBData">
            <v-card-text>
              <VInput ref="formDbName" v-model="dbName" type="text" placeholder="Enter DB Name" />
              <VInput v-model="dbDescription" type="dbDescription" placeholder="Enter DB description" />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" @click="showDialog = false">{{ $t("WorkOnDB.Button.Cancel") }}</v-btn>
              <v-btn color="primary" type="submit">{{ $t("WorkOnDB.Button.Save") }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <!-- Insert Dialog ends here -->

    </v-container>
  </BasicApp>
</template>


<script setup lang="ts">
  import { BasicApp } from '@/renderer/components/layout'
  import { VInput, VButton, VConfirmButton /*, VButtonWOClick, VConfirmDialog */  } from '@/renderer/components/formelements'

  import { useRoute, useRouter } from 'vue-router'
  import { ref, onMounted, onUnmounted, reactive, nextTick } from 'vue'
  // import { useI18n } from 'vue-i18n'

  import { dbRTDatabase } from './../../../main/utils/SqlReturnTypes'
  import { EnumDBStatements, DBQueryInObject, DBValueOutObject } from './../../../main/utils/SqlBaseModule'
  import { PiniaStoreNaviObject } from './../../../main/utils/IPCBaseModules'

  import { handleRoute /* , naviElems */ } from '@/renderer/utils'
  import { useNavStore } from '@/renderer/store/navStore'
  import { useLogStore } from '@/renderer/store/logStore'

  // const { /* locale, */ availableLocales } = useI18n()
  // const languages = ref(['en'])

  const route: any = useRoute()
  const titleKey: string = (route?.meta?.titleKey || 'title.main') as string
  const routStr = ref('Unknown')
  // const sqlResult = ref('Unknown')
  const sqlResult : any = ref('Unknown')
  const sqlInsertResult = ref('Unknown')
  // const constantResult = ref('Unknown')
  const erfolgsmeldung = ref('nix')
  const erfolgsmeldungInsert = ref('nix')

  const dbName = ref<string>('');
  const dbDescription = ref<string>('');
  const dbIDToUpdate = ref<string>('');
  const formDbName = ref()
  const showDialog = ref(false); // Controls dialog visibility
  const showDialogTitle = ref('WorkOnDB.Dialog.TitleInsert')
  const showDialogInsertOrEdit = ref('Insert')

  const contextMenu = ref({
    x: 0,
    y: 0,
    visible: false,
    row: {} as any,
    // activator: null as HTMLElement | null
    activator: undefined as HTMLElement | 'parent' | undefined
  })
  // Used to track refs for each row
  // const rowRefs = ref<Record<number, HTMLElement>>({})

  // const showConfirmDialog = ref(false)

  const navStore = useNavStore();
  const logStore = useLogStore();
  const router = useRouter()

  // Shared error handling function
  const ipcHandlerErrorMessages = (event: Event, dbValOut: DBValueOutObject, referenceString: string) => {
    // console.log('msgReceiveGeneralError in ScreenWorkOnDB is called');
    // receivedError.value = text (if you need reactivity, define receivedError in data)
    logStore.addLogErrorText(dbValOut.retErrorMessage);
  };

  const ipcHandlerReceivedInsert = (event: Event, sqlRes: string ) => {
    sqlInsertResult.value = sqlRes
    // console.log("Hat Insert geklappt ..")
    // console.log(sqlRes)
    // erfolgsmeldungInsert.value = "Insertstatus " + sqlRes
    contextMenu.value.visible = false;
    refreshDBData();
    showDialog.value = false;
  };

  const ipcHandlerReceivedDelete = (event: Event, sqlRes: string ) => {
    sqlInsertResult.value = sqlRes
    // console.log("Hat Delete geklappt ..")
    erfolgsmeldungInsert.value = "Deletestatus " + sqlRes

    refreshDBData();
  }

  const ipcHandlerReceivedSQL = (event: Event, sqlRes: dbRTDatabase  ) => {
    sqlResult.value = sqlRes
    // console.log(sqlRes)
    erfolgsmeldung.value = "Daten auffrischen hat geklapp"
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

  onMounted((): void => {
    const router = useRouter()
    const currentPathObject = router.currentRoute.value
    // console.log('Route Object', currentPathObject)
    routStr.value = currentPathObject.fullPath
    // languages.value = availableLocales

    //  check what kind of entries there are
    refreshDBData();

    // Hier werden alle IPC-Handler initialisiert
    channels.forEach(({ name, handler }) => window.mainApi.receive(name, handler));
    /*
    // this is called when a insert statement is ok
    window.mainApi.receive('msgReceivedInsert', ipcHandlerReceivedInsert)

    // this is called when a insert statement is ok
    window.mainApi.receive('msgReceivedDelete', ipcHandlerReceivedDelete)

    // this is called when a select statement is ok
    window.mainApi.receive('msgReceivedSQL', ipcHandlerReceivedSQL)
    */
    /*
    window.mainApi.receive(
      'msgReceivedConstant',
      (event: Event, constantRes: /* DBValueOutObject * / any) => {
        console.log('ReturnWert constantRes: ', constantRes)
        constantResult.value = constantRes
      }
    )
    */
  })

  // Remove IPC listeners on component unmount (to prevent memory leaks)
  onUnmounted(() => {
    // Hier werden alle IPC-Handler in Ruhestand geschickt
    channels.forEach(({ name, handler }) => window.mainApi.removeListener('msgReceivedInsert', null));
  });

  const btnClickSaveDBData = () => {
    const paraIn = new DBQueryInObject()
    if (showDialogInsertOrEdit.value === 'Insert') {
      paraIn.aInParameter = [dbName.value, "", "", dbDescription.value]
      paraIn.sInQuerySql = EnumDBStatements.InsDatabase
      paraIn.sInIPCResponse = 'msgReceivedInsert'
      paraIn.sInIPCResponseError = 'msgReceivedInsertError'
    } else {
      paraIn.aInParameter = [dbName.value, dbDescription.value, dbIDToUpdate.value]
      paraIn.sInQuerySql = EnumDBStatements.UpdateDatabase
      paraIn.sInIPCResponse = 'msgReceivedInsert'
      paraIn.sInIPCResponseError = 'msgReceiveGeneralError'
    }

    window.mainApi.send(
      'msgInsertSQLDataPara',
      paraIn
    )
  };

  function refreshDBData() {
    //  check what kind of entries there are
    window.mainApi.send(
      'msgRequestSQLData',
      // EnumDBStatements.SelEntityAndCategories
      EnumDBStatements.SelDatabase
    )
  }

  function deleteData(testid : string, testmsg: string) {
    erfolgsmeldung.value = "Löschen ... " + testid + " " + testmsg;

    const paraIn = new DBQueryInObject()
    paraIn.sInQuerySql = EnumDBStatements.DelDatabase
    paraIn.aInParameter = [testid]
    paraIn.sInIPCResponse = 'msgReceivedDelete'
    paraIn.sInIPCResponseError = 'msgReceivedDeleteError'

    window.mainApi.send(
      'msgDeleteSQLDataPara',
      paraIn
    )
  }

  // is filled from the button click on edit of one entry
  const editDBLine2 = (btnParameter : any) => {
    // Perform action when edit button is clicked here
    editData2(btnParameter.id, btnParameter.message);
  }

  function editData2(testid : string, testmsg: string) {
    /*
    navStore.getNaviElems.filter((naviElem) => naviElem.title === 'Work on DB Detail' )[0].visible = false
    */
    let naviobj = new PiniaStoreNaviObject();
    naviobj = navStore.getNaviElemViaId(12);
    naviobj.visible = true;
    naviobj.icon = 'mdi-database-edit';
    naviobj.title = '  Detail - ' + testmsg + '(' + testid + ')';
    // naviobj.extraInfo.localKey = testid;
    naviobj.extraInfo.localKey = testid;
    naviobj.extraInfo.localValue = testmsg;
    handleRoute(naviobj.action, router)
  }

  /*
  const openConfirm = (btnParameter: any) => {
    // deleteDBLine(btnParameter)
    // showConfirmDialog.value = true
    console.log("Test");
  }

  const handleConfirm = (btnParameter : any) => {
    deleteDBLine(btnParameter)
    // console.log('Confirmed!')
    // e.g., call a delete API
  }

  const handleCancel = () => {
    showConfirmDialog.value = false
    // console.log('Cancelled')
  }
  */

  // Define a function to handle delete Statement
  const deleteDBLine = (btnParameter : any) => {
    // Perform form submission logic here
    deleteData(btnParameter.DABA_ID, btnParameter.DABA_NAME);
  }

  function btnClickOpenInsertDialog() {
    /*
    showDialogTitle.value = 'WorkOnDB.Dialog.TitleInsert'
    dbName.value = ''
    dbDescription.value = ''
    formDbName.value?.focus?.()
    showDialog.value = true
    */
    showDialogTitle.value = 'WorkOnDB.Dialog.TitleInsert'
    dbName.value = ''
    dbDescription.value = ''
    showDialog.value = true
    showDialogInsertOrEdit.value = 'Insert'

    nextTick(() => {
      formDbName.value?.focus?.()
    })
  }

  function btnClickOpenEditDialog(rowId, rowName, rowDescription) {
    /*
    showDialogTitle.value = 'WorkOnDB.Dialog.TitleInsert'
    dbName.value = ''
    dbDescription.value = ''
    formDbName.value?.focus?.()
    showDialog.value = true
    */
    showDialogTitle.value = 'WorkOnDB.Dialog.TitleEdit'
    dbName.value = rowName
    dbDescription.value = rowDescription
    dbIDToUpdate.value = rowId
    showDialog.value = true
    showDialogInsertOrEdit.value = 'Edit'

    nextTick(() => {
      formDbName.value?.focus?.()
    })
  }

  function handleRightClick(row: any, event: MouseEvent) {
    event.preventDefault();
    contextMenu.value.x = event.clientX;
    contextMenu.value.y = event.clientY;
    contextMenu.value.row = row;
    // contextMenu.value.activator = rowRefs.value[row.id];
    // contextMenu.value.activator = event?.currentTarget;
    contextMenu.value.activator = event.currentTarget as HTMLElement;
    contextMenu.value.visible = true;
    /*
    contextMenu.value.visible = false; // Close it first if already open
    requestAnimationFrame(() => {
      contextMenu.value.visible = true; // Open it on next tick
    });
    */
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