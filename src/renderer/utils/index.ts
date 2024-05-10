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
    { title: 'Zeiterfassung', action: '/timeinput', icon: 'mdi-account-multiple', visible: true },
    { title: 'neues Sidebarelement', action: '/second', icon: 'mdi-abacus', visible: true },
    {
      title: 'Stammdatenpflege',
      action: '/masterdata',
      icon: 'mdi-account-multiple',
      visible: true
    },
    { title: 'Einstellungen', action: '/preferences', icon: 'mdi-camera', visible: true },
    { title: 'Test', action: '/test', icon: 'mdi-fire-alert', visible: true },
    { title: 'Second', action: '/second', icon: 'mdi-fire-alert', visible: true }
  ]
}

export const { getCurrentLocale, openExternal, handleRoute, naviElems } = Utils
