<script setup lang="tsx">
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import { openExternal } from '@/renderer/utils'
import { useCounterStore } from '@/renderer/store/counter'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
// import ManiSecure from 'ManiSecure'
import ThirdScreen from '@/renderer/screens/ThirdScreen.vue'
// import {
/* DBQueryInObject, EnumDbNames, EnumDbDMLTypes */ /* SQLBaseModule */
// } from '@/main/utils/SqlBaseModule'
// import {  /* DBQueryInObject, EnumDbNames, EnumDbDMLTypes */ SQLBaseModule
// } from './../../main/utils/SqlBaseModule'
// import DBValueOutObject from '@/main/utils/SqlBaseModule'

import { useRouter } from 'vue-router'

const { locale, availableLocales } = useI18n()

const { counterIncrease } = useCounterStore()
const { counter } = storeToRefs(useCounterStore())

const theme = useTheme()
const languages = ref(['en'])
const appVersion = ref('Unknown')
const sqlResult = ref('Unknown')
const constantResult = ref('Unknown')

const routStr = ref('Unknown')

const firstname = ref('')
// const lastname = ref('')
// const email = ref('')

onMounted((): void => {
  const router = useRouter()
  const currentPathObject = router.currentRoute.value
  console.log('Route Object', currentPathObject)
  routStr.value = currentPathObject.fullPath

  // console.log('on mounted is called');
  languages.value = availableLocales

  // Hier steht ein fetter Fehler
  // Get application version from package.json version string (Using IPC communication)
  window.mainApi.receive('msgReceivedVersion', (event: Event, version: string) => {
    // console.log('msgReceivedVersion is called');
    appVersion.value = version
  })
  window.mainApi.send('msgRequestGetVersion')

  window.mainApi.receive('msgReceivedSQL', (event: Event, sqlRes: /* DBValueOutObject */ any) => {
    sqlResult.value = sqlRes

    // console.log(sqlRes);
    /*
    if (sqlRes.retStatus === 0 /* EnumRetStatus.OK * /) {
      sqlResult.value = sqlRes.retArray.toString()
    } else {
      sqlResult.value = sqlRes.retMessage
    }
    */
  })

  window.mainApi.receive(
    'msgReceivedConstant',
    (event: Event, constantRes: /* DBValueOutObject */ any) => {
      console.log('ReturnWert constantRes: ', constantRes)
      constantResult.value = constantRes
    }
  )

  // console.log('on mounted is finished');
})

const handleChangeTheme = (): void => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const handleChangeLanguage = (val): void => {
  locale.value = val
}

const handleOpenDocument = async (): Promise<void> => {
  await openExternal('https://vutron.jooy2.com')
}

const handleOpenGitHub = async (): Promise<void> => {
  await openExternal('https://github.com/jooy2/vutron')
}

const handleSQL = async (): Promise<void> => {
  console.log('handleSQL soll aufgerufen werden')
  /*
  const _myReq = new SQLBaseModule.DBQueryInObject()
  _myReq.sInDBName = SQLBaseModule.EnumDbNames.Data
  _myReq.sInQueryType = SQLBaseModule.EnumDbDMLTypes.Select
  _myReq.sInQuerySql = 'SELECT * FROM ' + firstname.value
  */
  window.mainApi.send('msgRequestSQLData', 'SELECT * FROM ' + firstname.value)
}

const handleConstants = async (): Promise<void> => {
  console.log('handleConstants soll aufgerufen werden')
  window.mainApi.send('msgRequestConstant')
}

const handleCountIncrease = (): void => {
  counterIncrease(1)
}
</script>

<template>
  <!--ManiSecure></ManiSecure-->
  <ThirdScreen></ThirdScreen>
  <v-container>
    <v-row no-gutters align="center" class="text-center">
      <v-col cols="12" md="5">
        <img
          id="main-logo"
          alt="logo"
          draggable="false"
          class="ma-auto h-auto w-75"
          src="/images/vutron-logo.webp"
        />
      </v-col>
    </v-row>
    <v-row class="my-4">
      <v-col cols="12" md="7">
        <h2 class="my-4">{{ $t('desc.welcome-title') }}</h2>
        <p>{{ $t('desc.welcome-desc') }}</p>
        <p class="my-4"
          >App Version: <strong>{{ appVersion }}</strong></p
        >
        Nimm das {{ routStr }}
        <v-row class="my-4">
          <v-col cols="4">
            <v-btn icon color="primary" @click="handleConstants">
              {{ $t('menu.constants') }}
              <v-tooltip activator="parent" location="bottom">
                {{ $t('menu.constants') }}
              </v-tooltip>
            </v-btn>
            <p class="my-4">
              Constant-Result: <strong>{{ constantResult }}</strong>
            </p>
          </v-col>
          <v-col cols="4">
            <v-btn icon color="primary" @click="handleSQL">
              {{ $t('menu.sql') }}
              <v-tooltip activator="parent" location="bottom">
                {{ $t('menu.sql') }}
              </v-tooltip>
            </v-btn>
            <p class="my-4">
              SQL-Result: <strong>{{ sqlResult }}</strong>
            </p>
          </v-col>
        </v-row>
        <v-row class="my-4">
          <v-col cols="3">
            <v-btn icon color="primary" @click="handleChangeTheme">
              <v-icon icon="mdi-brightness-6" />
              <v-tooltip activator="parent" location="bottom">
                {{ $t('menu.change-theme') }}
              </v-tooltip>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-badge id="counter-badge" color="blue" :content="counter">
              <v-btn id="btn-counter" icon color="primary" @click="handleCountIncrease">
                <v-icon icon="mdi-plus-circle" />
                <v-tooltip activator="parent" location="bottom">
                  {{ $t('menu.increase-count') }}
                </v-tooltip>
              </v-btn>
            </v-badge>
          </v-col>
          <v-col cols="3">
            <v-btn icon color="primary" @click="handleOpenDocument">
              <v-icon icon="mdi-file-document" />
              <v-tooltip activator="parent" location="bottom">
                {{ $t('menu.documentation') }}
              </v-tooltip>
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn icon color="primary" @click="handleOpenGitHub">
              <v-icon icon="mdi-github" />
              <v-tooltip activator="parent" location="bottom">
                {{ $t('menu.github') }}
              </v-tooltip>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <!--v-col cols="4" md="4"-->
          <v-col cols="12" md="4">
            <v-combobox
              v-model="firstname"
              label="Tabelleninhalt anzeigen"
              required
              placeholder="Bitte eine Tabelle auswählen"
              :items="[
                'Create an Error',
                'TimeCustomer',
                'TimeCostCenter',
                'TimeProject',
                'TimeSubProject',
                'TimeActivity',
                'TimeBookings'
              ]"
            >
            </v-combobox>

            <!--v-text-field
              v-model="firstname"
              label="SQL Table"
              required
              placeholder="Products"
            ></v-text-field>
          </v-col>

          <v-col cols="4" md="4">
            <v-text-field v-model="lastname" label="Last name" hide-details required></v-text-field>
          </v-col>

          <v-col cols="4" md="4">
            <v-text-field v-model="email" label="E-mail" hide-details required></v-text-field-->
          </v-col>
        </v-row>
        <v-row class="my-4">
          <v-col cols="6">
            <v-select
              id="select-language"
              :model-value="locale"
              density="compact"
              :label="$t('menu.change-language')"
              :items="languages"
              @update:model-value="handleChangeLanguage"
            >
              {{ $t('menu.change-language') }}
            </v-select>
          </v-col>
          <!-- v-col cols="6">
            <v-btn icon color="primary" @click="handleSQL">
              SQL
              <v-tooltip activator="parent" location="bottom">
                {{ $t('menu.sql') }}
              </v-tooltip>
            </v-btn>
            <p class="my-4">
              SQL-Result: <strong>{{ sqlResult }}</strong>
            </p>
          </v-col -->
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
