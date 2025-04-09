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
          // window.webContents.send('msgReceivedSQL', err.retMessage)
          window.webContents.send('msgReceivedError', err.retMessage)
        })
    })

    // Manage SQL queries against Data DB
    ipcMain.on('msgRequestSQLDataPara', (event, sqlInsertObj: DBQueryInObject, referenceString: string) => {
      sqlInsertObj.sInDBName = EnumDbNames.Data
      sqlInsertObj.sInQueryType = EnumDbDMLTypes.Select
      // sqlInsertObj.sInQuerySql = sqlStatement

      SqlFuncs.getData(sqlInsertObj)
        .then((rows) => {
          window.webContents.send('msgReceivedSQL', rows.retObject, referenceString)
        })
        .catch((err) => {
          GeneralFuncs.appendErrorLogAndAppNotification(err.retMessage, window)
          // window.webContents.send('msgReceivedSQL', err.retMessage)
          window.webContents.send('msgReceivedError', err.retMessage, referenceString)
        })
    })

    // Manage insert statements against Data DB when a DBQueryInObject is delivered
    ipcMain.on('msgDeleteSQLDataPara', (event, sqlInsertObj: DBQueryInObject) => {
      sqlInsertObj.sInDBName = EnumDbNames.Data
      sqlInsertObj.sInQueryType = EnumDbDMLTypes.Delete
      let retIPCEvent : string = 'msgReceivedDelete'
      if (sqlInsertObj.sInIPCResponse !== undefined) {
        retIPCEvent = sqlInsertObj.sInIPCResponse
      }
      // let retIPCEventError : string = 'msgReceivedDeleteError'
      let retIPCEventError : string = 'msgReceiveGeneralError'
      if (sqlInsertObj.sInIPCResponseError !== undefined) {
        retIPCEventError = sqlInsertObj.sInIPCResponseError
      }

      SqlFuncs.executeSQL(sqlInsertObj)
        .then((rows) => {
          window.webContents.send(retIPCEvent, rows.retObject)
        })
        .catch((err) => {
          GeneralFuncs.appendErrorLogAndAppNotification(err.retErrorMessage)
          window.webContents.send(retIPCEventError, err /* .retMessage */)
        })
    })

    // Manage insert statements against Data DB when a DBQueryInObject is delivered
    ipcMain.on('msgInsertSQLDataPara', (event, sqlInsertObj: DBQueryInObject, referenceString: string) => {
      sqlInsertObj.sInDBName = EnumDbNames.Data
      sqlInsertObj.sInQueryType = EnumDbDMLTypes.Insert
      let retIPCEvent : string = 'msgReceivedInsert'
      if (sqlInsertObj.sInIPCResponse !== undefined) {
        retIPCEvent = sqlInsertObj.sInIPCResponse
      }
      // let retIPCEventError : string = 'msgReceivedInsertError'
      let retIPCEventError : string = 'msgReceiveGeneralError'
      if (sqlInsertObj.sInIPCResponseError !== undefined) {
        retIPCEventError = sqlInsertObj.sInIPCResponseError
      }

      SqlFuncs.executeSQL(sqlInsertObj)
        .then((rows) => {
          window.webContents.send(retIPCEvent, rows.retObject, referenceString)
        })
        .catch((err) => {
          GeneralFuncs.appendErrorLogAndAppNotification(err.retErrorMessage + " " + sqlInsertObj.aInParameter + " " + sqlInsertObj.sInQuerySql)
          window.webContents.send(retIPCEventError, err /* .retMessage */, referenceString)
        })
    })

    // Manage insert statements against Data DB
    ipcMain.on('msgInsertSQLData', (event, SqlInsertStmt: string) => {
      const Para1 = new DBQueryInObject()
      Para1.sInDBName = EnumDbNames.Data
      Para1.sInQueryType = EnumDbDMLTypes.Insert
      Para1.sInQuerySql = SqlInsertStmt

      SqlFuncs.executeSQL(Para1)
        .then((rows) => {
          window.webContents.send('msgReceivedInsert', rows.retObject)
        })
        .catch((err) => {
          GeneralFuncs.appendErrorLogAndAppNotification(err.retMessage)
          window.webContents.send('msgReceivedInsert', err.retMessage)
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
