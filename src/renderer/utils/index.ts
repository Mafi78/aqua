

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
  static naviElems = [
    { title: 'Overview', action: '/', icon: 'mdi-folder', visible: true },
    { title: 'Zeiterfassung', action: '/timeinput', icon: 'mdi-account-multiple', visible: false },
    { title: 'neues Sidebarelement', action: '/second', icon: 'mdi-abacus', visible: false },
    {
      title: 'Stammdatenpflege',
      action: '/masterdata',
      icon: 'mdi-account-multiple',
      visible: false
    },
    { title: 'Einstellungen', action: '/preferences', icon: 'mdi-camera', visible: false },
    { title: 'Test', action: '/test', icon: 'mdi-fire-alert', visible: false },
    { title: 'Second', action: '/second', icon: 'mdi-fire-alert', visible: false },
    { title: 'Access Scenario', action: '/accessscenario', icon: 'mdi-file-cabinet', visible: true },
    { title: 'Run a Scenario', action: '/runscenario', icon: 'mdi-movie-open', visible: true },
    { title: 'Prepare on the go', action: '/prepareonthego', icon: 'mdi-run-fast', visible: true },
    { title: 'Work on DB', action: '/workondb', icon: 'mdi-database-edit', visible: true },
    { title: 'Access Docu', action: '/accessdocu', icon: 'mdi-book-open-outline', visible: true },
    { title: 'Culture Hints', action: '/culturehints', icon: 'mdi-handshake', visible: true }
  ]
}

export const { getCurrentLocale, openExternal, handleRoute, naviElems } = Utils
