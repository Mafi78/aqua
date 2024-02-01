<script setup lang="tsx">
// import { HeaderLayout } from '@/renderer/components/layout'
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(true)

const openNewWindow = (): void => {
  console.log('Hmmm ?')
}
</script>

<template>
  <v-app>
    <v-layout>
      <!-- HeaderLayout / -->

      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          >
            <!-- v-slot:append-->
            <!-- template >
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            >
            </v-btn>
          </template -->
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-folder"
            title="My Files"
            value="myfiles"
            @click="openNewWindow"
          ></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"
            ><a target="_blank" href="second">Test</a></v-list-item
          >
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer location="right" width="199px">
        <v-list>
          <v-list-item title="Drawer right - verdammte Sch..."></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>
