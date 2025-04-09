<script setup lang="ts">
import { BasicApp } from '@/renderer/components/layout'

import { useRoute /*, useRouter */ } from 'vue-router'
const route: any = useRoute()
const titleKey: string = (route?.meta?.titleKey || 'title.main') as string
</script>

<template>
  <BasicApp>
    <!--v-main class="d-flex " -->
    <!-- align-center justify-center -->
    <!--Main Content-->
    <v-container class="white">
      <v-row class="mb-3" height="50">
        <!--Top Left><-->
        <v-col cols="10">
          {{ $t(titleKey) }} benutzer Key {{ titleKey }}
          <!--v-breadcrumbs :items="['DATABASE NAME', 'V.x.y', 'DERIVED FROM', 'DATABASE NAME', 'V.y.z']">
          </v-breadcrumbs-->
        </v-col>
        <!--Top Right><-->
        <v-col cols="2">
          <v-btn density="comfortable" icon="mdi-content-save-outline" :ripple="true">
            <v-icon color="black"></v-icon>
            <v-tooltip activator="parent" location="top">Save</v-tooltip>
          </v-btn>
          <v-btn density="comfortable" icon="mdi-content-duplicate" :ripple="true">
            <v-icon color="black"></v-icon>
            <v-tooltip activator="parent" location="top">Clone</v-tooltip>
          </v-btn>
          <v-btn density="comfortable" icon="mdi-exit-to-app" :ripple="true">
            <v-icon color="black"></v-icon>
            <v-tooltip activator="parent" location="top">Exit to Home</v-tooltip>
          </v-btn>
        </v-col>
      </v-row>
      To be continued
    </v-container>
    <!--/v-main-->
  </BasicApp>
</template>
