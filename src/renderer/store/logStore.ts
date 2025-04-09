import { defineStore /*, Pinia */ } from 'pinia'
import { ref, computed } from 'vue';
import { LogStoreObject } from '@/main/utils/IPCBaseModules';

export const useLogStore = defineStore('log', {
  // 🟢 State: Holds an array of LogStoreObjects
  state: () => ({
    logs: [] as LogStoreObject[],
    aktZaehler : 0,
    aktSequence: 0
  }),

  // 🟡 Getters: Computed properties for retrieving logs
  getters: {
    getAllLogs: (state) => state.logs,
    getErrorLogs: (state) => state.logs.filter(log => log.errorType === "error"),
    getInfoLogs: (state) => state.logs.filter(log => log.errorType === "info"),
    getLogById: (state) => (id: number) => state.logs.find(log => log.errorId === id),
  },

  // 🔴 Actions: Functions to modify the state
  actions: {
    // Add a new log
    addLog(errorText: string, errorIcon: string) {
      this.aktZaehler = this.aktZaehler + 1;
      this.aktSequence = this.aktSequence + 1;
      const newLog = new LogStoreObject(
        this.aktSequence,  // Unique ID based on timestamp
        new Date(),
        errorText
      );
      this.logs.push(newLog);
    },

    addLogInfoText(msg: string) {
      this.aktZaehler = this.aktZaehler + 1;
      this.aktSequence = this.aktSequence + 1;
      const newLog = new LogStoreObject(
        this.aktSequence,  // Unique ID based on timestamp
        new Date(),
        msg
      );
      newLog.errorType = "info";
      this.logs.push(newLog);
    },

    addLogWarningText(msg: string) {
      this.aktZaehler = this.aktZaehler + 1;
      this.aktSequence = this.aktSequence + 1;
      const newLog = new LogStoreObject(
        this.aktSequence,  // Unique ID based on timestamp
        new Date(),
        msg
      );
      newLog.errorType = "warning";
      this.logs.push(newLog);
    },

    addLogErrorText(msg: string) {
      this.aktZaehler = this.aktZaehler + 1;
      this.aktSequence = this.aktSequence + 1;
      const newLog = new LogStoreObject(
        this.aktSequence,  // Unique ID based on timestamp
        new Date(),
        msg
      );
      this.logs.push(newLog);
    },

    // Delete a log by ID
    deleteLog(errorId: number) {
      this.logs = this.logs.filter(log => log.errorId !== errorId);
      this.aktZaehler = this.aktZaehler - 1;
    },

     // Deletes all entries
     clearLog() {
      this.logs = [];
      this.aktZaehler = 0;
      this.aktSequence = 0;
    },

    // Edit a log entry
    editLog(errorId: number, newText: string, newIcon: string) {
      const log = this.logs.find(log => log.errorId === errorId);
      if (log) {
        log.errorText = newText;
        log.errorIcon = newIcon;
      }
    },
  },
});

export const useLogStoreOld = defineStore('log', () => {

  const logElems = ref<Array<LogStoreObject>>([
  ]);
  const aktZaehler = ref(0);

  // Getter: Get all navigation elements
  const getAllLogs = computed(() => logElems.value);

  // Setter: Add a new navigation element
  const addLogElemObj = (elem: LogStoreObject) : number => {
    aktZaehler.value = aktZaehler.value + 1;
    elem.errorId = aktZaehler.value;
    elem.errorDate = new Date();
    logElems.value.push(elem);
    return aktZaehler.value;
  };

  const addLogElemText = (msg: string) : number => {
    aktZaehler.value = aktZaehler.value + 1;
    const elem = new LogStoreObject(
      aktZaehler.value, new Date(), msg);
    logElems.value.push(elem);
    return aktZaehler.value;
  };

  // Setter: Remove a navigation element by ID
  const removeLogElem = (id: number) => {
    logElems.value = logElems.value.filter(elem => elem.errorId !== id);
    aktZaehler.value = aktZaehler.value - 1;
  };

  const clearLog = () => {
    logElems.value = [];
    aktZaehler.value = 0;
  };

  // Setter: Edit a navigation element by ID
  const editNaviElem = (id: number, updatedElem: LogStoreObject) => {
    const index = logElems.value.findIndex(elem => elem.errorId === id);
    if (index !== -1) {
      logElems.value[index] = { ...logElems.value[index], ...updatedElem };
    }
  };

  const editNaviElemViaText = (title: string, updatedElem: LogStoreObject) => {
    const index = logElems.value.findIndex(elem => elem.errorText === title);
    if (index !== -1) {
      logElems.value[index] = { ...logElems.value[index], ...updatedElem };
    }
  };

  // Getter: Get a navigation element by ID
  const getNaviElemViaText = (title: string) => {
    return logElems.value.find(elem => elem.errorText === title);
  };

  /*
  const getNaviElemViaId = (id: number) : LogStoreObject  => {
    return logElems.value.find(elem => elem.errorId === id);
  };
  */



  return { logElems, getAllLogs, addLogElemObj, addLogElemText, editNaviElem, editNaviElemViaText, getNaviElemViaText, /* getNaviElemViaId, */ removeLogElem, clearLog };
});