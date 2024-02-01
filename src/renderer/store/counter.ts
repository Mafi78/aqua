import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0
  }),
  getters: {
    getCounter: (state): number => state.counter
  },
  actions: {
    counterIncrease(amount: number) {
      this.counter += amount
    }
  }
})

export const storeLeftMenuBar = defineStore('leftCounter', {
  state: () => ({
    leftStateCollapsed: false,
    leftStateVisible: true,
    leftWidth: 251
  }),
  getters: {
    // not necessary - can also be handled via access to state direct
    getCounter: (state): boolean => state.leftStateCollapsed
  },
  actions: {
    toggleLMBCollapsed(/* stateVis: boolean */) {
      // this.leftState = !stateVis
      this.leftStateCollapsed = !this.leftStateCollapsed
    },
    toggleLMBVisibility(/* stateVis: boolean */) {
      // this.leftState = !stateVis
      this.leftStateVisible = !this.leftStateVisible
    },
    changeLMBWidth(lmbWidth: number) {
      if (lmbWidth >= 250 && lmbWidth <= 600) {
        // this.leftState = !stateVis
        this.leftWidth = lmbWidth
      }
    }
  }
})
