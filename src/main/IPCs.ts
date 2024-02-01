import { BrowserWindow, ipcMain, shell } from 'electron'
import Constants from './utils/Constants'
import SqlFuncs from './utils/SqlFuncs'
import GeneralFuncs from './utils/GeneralFuncs'
import { DBQueryInObject, EnumDbNames, EnumDbDMLTypes } from './utils/SqlBaseModule'

/*
 * IPC Communications
 * */
export default class IPCs {
  static initialize(window: BrowserWindow): void {
    // Get application version
    ipcMain.on('msgRequestGetVersion', () => {
      console.log('Request get Version is called')
      window.webContents.send('msgReceivedVersion', Constants.APP_VERSION)
    })

    // Open url via web browser
    ipcMain.on('msgOpenExternalLink', async (event, url: string) => {
      console.log('Hurra 2!!')
      await shell.openExternal(url)
    })

    // Manage Constants call
    ipcMain.on('msgRequestConstant', (event) => {
      const retObj = {
        APP_NAME: Constants.APP_NAME,
        APP_VERSION: Constants.APP_VERSION,
        IS_DEV_ENV: Constants.IS_DEV_ENV,
        IS_MAC: Constants.IS_MAC,
        DEFAULT_WEB_PREFERENCES: Constants.DEFAULT_WEB_PREFERENCES,
        APP_INDEX_URL_DEV: Constants.APP_INDEX_URL_DEV,
        APP_INDEX_URL_PROD: Constants.APP_INDEX_URL_PROD,
        prefFile: Constants.prefFile,
        dbPrefSettings: Constants.dbPrefSettings,
        dbDataSettings: Constants.dbDataSettings
        /*
        : Constants.,
        : Constants.,
        : Constants.,
        : Constants.,
        : Constants.,
        : Constants.,
        */
      }
      window.webContents.send('msgReceivedConstant', retObj)
      // window.webContents.send('msgReceivedConstant', Constants.APP_NAME)
    })

    // Manage SQL queries against Data DB
    ipcMain.on('msgRequestSQLData', (event, sqlStatement: string) => {
      const Para1 = new DBQueryInObject()
      Para1.sInDBName = EnumDbNames.Data
      Para1.sInQueryType = EnumDbDMLTypes.Select
      Para1.sInQuerySql = sqlStatement

      SqlFuncs.getData(Para1)
        .then((rows) => {
          window.webContents.send('msgReceivedSQL', rows.retObject)
        })
        .catch((err) => {
          GeneralFuncs.appendErrorLogAndAppNotification(err.retMessage, window)
          window.webContents.send('msgReceivedSQL', err.retMessage)
          // window.webContents.send('msgReceivedError', err.retMessage)
        })
    })

    // Manage SQL queries against Preferences DB
    ipcMain.on('msgRequestSQLPref', (event, sqlStatement: string) => {
      const Para1 = new DBQueryInObject()
      Para1.sInDBName = EnumDbNames.Pref
      Para1.sInQueryType = EnumDbDMLTypes.Select
      Para1.sInQuerySql = sqlStatement

      SqlFuncs.getData(Para1)
        .then((rows) => {
          window.webContents.send('msgReceivedSQL', rows.retObject)
        })
        .catch((err) => {
          GeneralFuncs.appendErrorLogAndAppNotification(err.retMessage)
          window.webContents.send('msgReceivedSQL', err.retMessage)
        })
    })

    // Clean the Error entries
    ipcMain.on('msgRequestCleanErrors', () => {
      // console.log('Request get Version is called')
      Constants.ErrorsOccurredInApp = ''
      window.webContents.send('msgReceivedError', Constants.ErrorsOccurredInApp)
    })
  }
}
