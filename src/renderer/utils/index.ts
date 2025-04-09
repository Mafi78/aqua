export default class Utils {
  static getCurrentLocale(): string {
    return navigator?.language?.split('-')[0] || 'en'
  }

  static async openExternal(url: string): Promise<void> {
    await window.mainApi.send('msgOpenExternalLink', url)
  }

  static handleRoute(path: string, router: any): void {
    router.push(path)
  }

  // https://pictogrammers.github.io/@mdi/font/7.2.96/ please see the actual version in package.json
  // Navigation entries
  // This is old and not used anymore
  /*
  static naviElems = [
    { id: 1, title: 'Overview', action: '/', icon: 'mdi-folder', visible: true },
    { id: 2, title: 'Zeiterfassung', action: '/timeinput', icon: 'mdi-account-multiple', visible: false },
    { id: 3, title: 'neues Sidebarelement', action: '/second', icon: 'mdi-abacus', visible: false },
    {
      id: 4, title: 'Stammdatenpflege',
      action: '/masterdata',
      icon: 'mdi-account-multiple',
      visible: false
    },
    { id: 5, title: 'Einstellungen', action: '/preferences', icon: 'mdi-camera', visible: false },
    { id: 6, title: 'Test', action: '/test', icon: 'mdi-fire-alert', visible: false },
    { id: 7, title: 'Second', action: '/second', icon: 'mdi-fire-alert', visible: false },
    {
      id: 8, title: 'Access Scenario',
      action: '/accessscenario',
      icon: 'mdi-file-cabinet',
      visible: true
    },
    { id: 9, title: 'Run a Scenario', action: '/runscenario', icon: 'mdi-movie-open', visible: true },
    { id: 10, title: 'Prepare on the go', action: '/prepareonthego', icon: 'mdi-run-fast', visible: true },
    { id: 11, title: 'Work on DB', action: '/workondb', icon: 'mdi-database-edit', visible: true },
    { id: 12, title: 'Work on DB Detail', action: '/workondbdetail', icon: 'mdi-database-edit', visible: false },
    { id: 13, title: 'Access Docu', action: '/accessdocu', icon: 'mdi-book-open-outline', visible: true },
    { id: 14, title: 'Culture Hints', action: '/culturehints', icon: 'mdi-handshake', visible: true }
  ]
    */

}

export const { getCurrentLocale, openExternal, handleRoute /*, naviElems */ } = Utils
