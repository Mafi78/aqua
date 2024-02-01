import { app, WebContents, RenderProcessGoneDetails } from 'electron'
import Constants from './utils/Constants'
// import GeneralFuncs from './utils/GeneralFuncs'
import { createErrorWindow, createMainWindow } from './MainRunner'
import { macOSDisableDefaultMenuItem } from './utils/Menus'
import { installExtension, VUEJS_DEVTOOLS } from 'electron-extension-installer'

let mainWindow
let errorWindow

app.on('ready', async () => {
  if (Constants.IS_DEV_ENV) {
    await installExtension(VUEJS_DEVTOOLS, {
      loadExtensionOptions: {
        allowFileAccess: true
      }
    })
  }
  macOSDisableDefaultMenuItem()

  mainWindow = createMainWindow(mainWindow)
})

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow(mainWindow)
  }
})

app.on('window-all-closed', () => {
  mainWindow = null
  errorWindow = null

  if (!Constants.IS_MAC) {
    app.quit()
  }
})

app.on(
  'render-process-gone',
  (event: Event, webContents: WebContents, details: RenderProcessGoneDetails) => {
    errorWindow = createErrorWindow(errorWindow, mainWindow, details)
  }
)

process.on('uncaughtException', () => {
  errorWindow = createErrorWindow(errorWindow, mainWindow)
})

process.traceProcessWarnings = true
