<script setup lang="ts">
import { BasicApp } from '@/renderer/components/layout'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import { VButtonRound } from '@/renderer/components/formelements'

const { availableLocales } = useI18n()


const languages = ref(['en'])

onMounted((): void => {
  languages.value = availableLocales
})
// export default {};
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
          Run Scenario
          <!--v-breadcrumbs :items="['DATABASE NAME', 'V.x.y', 'DERIVED FROM', 'DATABASE NAME', 'V.y.z']">
      </v-breadcrumbs-->
        </v-col>
        <!--Top Right><-->
        <v-col cols="2">
          <!--v-btn density="comfortable" icon="mdi-content-save-outline" :ripple="true">
            <v-icon color="black"></v-icon>
            <v-tooltip activator="parent" location="top">Save</v-tooltip>
          </v-btn-->
          <VButtonRound>{{ $t('formelements.buttons.save') }}</VButtonRound>
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
      <v-row class="mb-3" no-gutters>
        <v-col cols="5" class="bg-red">
          Database Content
          <!-- here the subcontainer begins -->
          <v-container>
            <v-row style="min-height: 50px" class="bg-indigo">
              <v-col cols="12"> Entries in Database </v-col>
            </v-row>
            <v-row style="min-height: 550px" class="bg-orange">
              <v-col cols="12">
                <v-table density="compact">
                  <thead>
                    <tr>
                      <th class="text-left"> Entity </th>
                      <th class="text-left"> Edit </th>
                      <th class="text-left"> Lock </th>
                      <th class="text-left"> Export </th>
                      <th class="text-left"> Delete </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> #1 </td>
                      <td>
                        <v-btn
                          density="compact"
                          icon="mdi-file-edit-outline"
                          variant="tonal"
                        ></v-btn>
                      </td>
                      <td> <v-checkbox></v-checkbox> </td>
                      <td> <v-checkbox></v-checkbox> </td>
                      <td>
                        <v-btn
                          density="compact"
                          icon="mdi-trash-can-outline"
                          variant="tonal"
                        ></v-btn>
                      </td>
                    </tr>
                    <tr>
                      <td> #2 </td>
                      <td>
                        <v-btn
                          density="compact"
                          icon="mdi-file-edit-outline"
                          variant="tonal"
                        ></v-btn>
                      </td>
                      <td> <v-checkbox></v-checkbox> </td>
                      <td> <v-checkbox></v-checkbox> </td>
                      <td>
                        <v-btn
                          density="compact"
                          icon="mdi-trash-can-outline"
                          variant="tonal"
                        ></v-btn>
                      </td>
                    </tr>
                    <tr>
                      <td> #3 </td>
                      <td>
                        <v-btn
                          density="compact"
                          icon="mdi-file-edit-outline"
                          variant="tonal"
                        ></v-btn>
                      </td>
                      <td> <v-checkbox></v-checkbox> </td>
                      <td> <v-checkbox></v-checkbox> </td>
                      <td>
                        <v-btn
                          density="compact"
                          icon="mdi-trash-can-outline"
                          variant="tonal"
                        ></v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
            <v-row style="min-height: 75px" class="bg-indigo">
              <v-col cols="12">
                <v-btn density="comfortable" icon="mdi-table-plus" variant="tonal">
                  <v-icon color="black"></v-icon>
                  <v-tooltip activator="parent" location="top">Add entry</v-tooltip>
                </v-btn>
                <v-btn density="comfortable" icon="mdi-file-export" variant="tonal">
                  <v-icon color="black"></v-icon>
                  <v-tooltip activator="parent" location="top"
                    >New database from selection</v-tooltip
                  >
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          <!-- here the subcontainer ends -->
        </v-col>
        <v-col cols="3" class="bg-green">
          Edit Data
          <!-- here the subcontainer begins -->
          <v-container>
            <v-row style="min-height: 50px" class="bg-indigo">
              <v-col cols="12"> Characteristics </v-col>
            </v-row>
            <v-row style="min-height: 550px" class="bg-orange">
              <v-col cols="12">
                <v-table density="compact">
                  <thead>
                    <tr>
                      <th class="text-left"> Characteristic </th>
                      <th class="text-left"> Value </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Shared understanding </td>
                      <td> <v-text-field density="compact" label="Label">22</v-text-field></td>
                    </tr>
                    <tr>
                      <td> Performance feedback </td>
                      <td> 55 </td>
                    </tr>
                    <tr>
                      <td> Influencing narrative </td>
                      <td> 76 </td>
                    </tr>
                    <tr>
                      <td> Leadership style </td>
                      <td> 12 </td>
                    </tr>
                    <tr>
                      <td> Decision-making approach </td>
                      <td> 45 </td>
                    </tr>
                    <tr>
                      <td> Relationship foundation </td>
                      <td> 88 </td>
                    </tr>
                    <tr>
                      <td> Conflict resolution </td>
                      <td> 32 </td>
                    </tr>
                    <tr>
                      <td> Time management </td>
                      <td> 5 </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
            <v-row style="max-height: 75px" class="bg-indigo">
              <v-col cols="12">
                <!-- v-textarea
                :model-value="value"
                label="Notes"
                rows="1"
                no-resize
                bg-color="white"
              ></v-textarea -->
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="4" class="bg-yellow">
          Scenario Map
          <v-container>
            <v-row style="min-height: 50px" class="bg-indigo">
              <v-col cols="12"> Scenarios based on this Database </v-col>
            </v-row>
            <v-row style="min-height: 550px" class="bg-orange">
              <v-col cols="12">
                <v-table density="compact">
                  <thead>
                    <tr>
                      <th class="text-left"> Scenario </th>
                      <th class="text-left"> Latest Edit </th>
                      <th class="text-left"> Update with tracking </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> Scenario 1 </td>
                      <td> 19.04.2024</td>
                      <td> <v-btn density="compact" icon="mdi-update" variant="tonal"></v-btn> </td>
                    </tr>
                    <tr>
                      <td> Scenario 2 </td>
                      <td> 21.02.2024</td>
                      <td> <v-btn density="compact" icon="mdi-update" variant="tonal"></v-btn> </td>
                    </tr>
                    <tr>
                      <td> Scenario 3 </td>
                      <td> 12.03.2024</td>
                      <td> <v-btn density="compact" icon="mdi-update" variant="tonal"></v-btn> </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
            <v-row style="min-height: 75px" class="bg-indigo">
              <v-col cols="12"> Placeholder </v-col>
            </v-row>
          </v-container>
          <!-- here the subcontainer ends -->
        </v-col>
      </v-row>
    </v-container>
    <!--/v-main-->
  </BasicApp>
</template>
