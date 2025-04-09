<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
          :ref="(el) => setRowRef(item.id, el)"
          @contextmenu.prevent="openContextMenu($event, item)"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </v-table>

    <v-menu
      v-model="contextMenu.visible"
      :activator="contextMenu.activator"
      location="end top"
      :close-on-content-click="true"
    >
      <v-list>
        <v-list-item @click="editItem(contextMenu.row)">
          <v-list-item-title>Edit {{ contextMenu.row?.name }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="deleteItem(contextMenu.row)">
          <v-list-item-title>Delete {{ contextMenu.row?.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Alpha' },
  { id: 2, name: 'Beta' },
  { id: 3, name: 'Gamma' }
])

// Used to track refs for each row
const rowRefs = ref<Record<number, HTMLElement>>({})

function setRowRef(id: number, el: HTMLElement | null) {
  if (el) {
    rowRefs.value[id] = el
  }
}

const contextMenu = ref({
  visible: false,
  row: null as any,
  activator: null as HTMLElement | null
})

function openContextMenu(event: MouseEvent, row: any) {
  contextMenu.value.row = row
  contextMenu.value.activator = rowRefs.value[row.id]
  contextMenu.value.visible = true
}

function editItem(row: any) {
  alert(`Edit ${row.name}`)
  contextMenu.value.visible = false
}

function deleteItem(row: any) {
  alert(`Delete ${row.name}`)
  contextMenu.value.visible = false
}
</script>
