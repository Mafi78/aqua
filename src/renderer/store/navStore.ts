import { defineStore /*, Pinia */ } from 'pinia'
import { ref, computed } from 'vue';
import { PiniaStoreNaviObject } from '@/main/utils/IPCBaseModules';

export const useNavStore = defineStore('nav', () => {
  // Reactive state: Array of navigation elements
  // const naviElems = ref<Array<{ id: number; title: string; action: string; icon: string; visible:boolean }>>([
  const naviElems = ref<Array<PiniaStoreNaviObject>>([
    { id: 1, title: 'Overview', action: '/', icon: 'mdi-folder', visible: true, extraInfo: { localKey: '', localValue: '' } },
    { id: 2, title: 'Zeiterfassung', action: '/timeinput', icon: 'mdi-account-multiple', visible: false, extraInfo: { localKey: '', localValue: '' } },
    { id: 3, title: 'neues Sidebarelement', action: '/second', icon: 'mdi-abacus', visible: false, extraInfo: { localKey: '', localValue: '' } },
    {
      id: 4, title: 'Stammdatenpflege',
      action: '/masterdata',
      icon: 'mdi-account-multiple',
      visible: false, extraInfo: { localKey: '', localValue: '' }
    },
    { id: 5, title: 'Einstellungen', action: '/preferences', icon: 'mdi-camera', visible: false, extraInfo: { localKey: '', localValue: '' } },
    { id: 6, title: 'Test', action: '/test', icon: 'mdi-fire-alert', visible: false, extraInfo: { localKey: '', localValue: '' } },
    { id: 7, title: 'Second', action: '/second', icon: 'mdi-fire-alert', visible: false, extraInfo: { localKey: '', localValue: '' } },
    {
      id: 8, title: 'Access Scenario',
      action: '/accessscenario',
      icon: 'mdi-file-cabinet',
      visible: true, extraInfo: { localKey: '', localValue: '' }
    },
    { id: 9, title: 'Run a Scenario', action: '/runscenario', icon: 'mdi-movie-open', visible: true, extraInfo: { localKey: '', localValue: '' } },
    { id: 10, title: 'Prepare on the go', action: '/prepareonthego', icon: 'mdi-run-fast', visible: true, extraInfo: { localKey: '', localValue: '' } },
    { id: 11, title: 'Work on DB', action: '/workondb', icon: 'mdi-database-edit', visible: true, extraInfo: { localKey: '', localValue: '' } },
    { id: 12, title: 'Work on DB Detail', action: '/workondbdetail', icon: 'mdi-database-edit', visible: false, extraInfo: { localKey: '', localValue: '' }},
    { id: 13, title: 'Access Docu', action: '/accessdocu', icon: 'mdi-book-open-outline', visible: true, extraInfo: { localKey: '', localValue: '' } },
    { id: 14, title: 'Culture Hints', action: '/culturehints', icon: 'mdi-handshake', visible: true, extraInfo: { localKey: '', localValue: '' } },
    { id: 15, title: 'Tooltip Test', action: '/test2', icon: 'mdi-fire-alert', visible: false, extraInfo: { localKey: '', localValue: '' } },
  ]);

  // Getter: Get all navigation elements
  const getNaviElems = computed(() => naviElems.value);

  // this is used to show only the visible objects
  const getNaviElemsFiltered = computed(() =>
    naviElems.value.filter((naviElem) => naviElem.visible === true)
  );


  // Setter: Add a new navigation element
  const addNaviElem = (elem: PiniaStoreNaviObject) => {
    naviElems.value.push(elem);
  };

  // Setter: Remove a navigation element by ID
  const removeNaviElem = (id: number) => {
    naviElems.value = naviElems.value.filter(elem => elem.id !== id);
  };

  // Setter: Edit a navigation element by ID
  const editNaviElem = (id: number, updatedElem: PiniaStoreNaviObject) => {
    const index = naviElems.value.findIndex(elem => elem.id === id);
    if (index !== -1) {
      naviElems.value[index] = { ...naviElems.value[index], ...updatedElem };
    }
  };

  const editNaviElemViaText = (title: string, updatedElem: PiniaStoreNaviObject) => {
    const index = naviElems.value.findIndex(elem => elem.title === title);
    if (index !== -1) {
      naviElems.value[index] = { ...naviElems.value[index], ...updatedElem };
    }
  };

  // Getter: Get a navigation element by ID
  const getNaviElemViaText = (title: string) => {
    return naviElems.value.find(elem => elem.title === title);
  };

  // const getNaviElemViaId = (id: number) : PiniaStoreNaviObject /* | undefined */ => {
    const getNaviElemViaId = (id: number) : PiniaStoreNaviObject /* | undefined */ => {
    return naviElems.value.find(elem => elem.id === id) as PiniaStoreNaviObject;
  };

  /*
  const getNaviElemViaText : PiniaStoreNaviObject = (title: string) => {
    const index = naviElems.value.findIndex(elem => elem.title === title);
    if (index !== -1) {
      return naviElems.value[index];
    }
  };
  */

  return { naviElems, getNaviElems, getNaviElemsFiltered, addNaviElem, editNaviElem, editNaviElemViaText, getNaviElemViaText, getNaviElemViaId, removeNaviElem };
});