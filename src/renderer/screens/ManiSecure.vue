<template>
  <span>
    Mani-Secure - Hier könnte Ihre Werbung stehen
    <div id="layoutSidenav">
      <div id="layoutSidenav_content"> </div>
    </div>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <!--img src="..." class="rounded me-2" alt="..."-->
          <strong id="toastHeader" class="me-auto">Bootstrap</strong>
          <!--small>gerade eben</small-->
          <!--button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button-->
        </div>
        <div id="toastMessage" class="toast-body"> Hello, world! This is a toast message. </div>
      </div>
    </div>
  </span>
</template>

<script setup lang="tsx">
import { onMounted /*, watch */ } from 'vue'

// const name = "SecureMani";

/*
    const reloadSchuleData = async () => {
        // TODO - eventually take care of the page settings
        var retObjSchule = await useFetch(logToken.value, 'pages/schule');
        //debugger;
        store.dispatch('setSchulenA', JSON.stringify(retObjSchule.retData.data.data));
    }

    const reloadKategorienData = async () => {
        // TODO - eventually take care of the page settings
        var retObjKategorien = await useFetch(logToken.value, 'admin/kategorie');
        //debugger;
        store.dispatch('setKategorienA', JSON.stringify(retObjKategorien.retData.data.data));
    }

    const reloadSchuljahreData = async () => {
        // TODO - eventually take care of the page settings
        var retObjSchuljahre = await useFetch(logToken.value, 'admin/schuljahr');
        //console.log("🚀 ~ file: Secure.vue:75 ~ reloadSchuljahreData ~ retObjSchuljahre:", retObjSchuljahre)
        //debugger;
        store.dispatch('setSchuljahreA', JSON.stringify(retObjSchuljahre.retData.data.data));
    }

    const reloadAktSJahrSchuelerData = async () => {
        // TODO - eventually take care of the page settings
        var tmpObject = {
            "filterActSelectedYear" : "yes"
        };
        var retObjAktSJahrSchueler = await useFetch(logToken.value, 'pages/schuelerReadParam', 'post', tmpObject );
        //debugger;
        store.dispatch('setAktSJahrSchuelerA', JSON.stringify(retObjAktSJahrSchueler.retData.data.data));
    }
*/

onMounted(async () => {
  try {
    console.log('gemounted ManiSecure')
    // console.log("Secure.vue - This is the stored user-Object -> " + JSON.stringify( userAsObj.value) ); //.value.first_name);
  } catch (e) {
    console.log('Secure - Exception in Secure:' + e)
  }
})

// helper functions
// for the settings functionality

/*
    const createDefaultSetting = (name) => {
        let jsonHelper;
        switch (name) {

            case "pages":
                jsonHelper = {
                        "alg_doku": {
                            "sorting" : "asc",
                            "paging" : 1
                        }
                    };
            break;

            default:
                break;
        }

        return jsonHelper;
    }
    */
</script>
