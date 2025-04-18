import { app, BrowserWindow,
  RenderProcessGoneDetails /*, nativeImage */ } from 'electron'
import Constants from './utils/Constants'
import IPCs from './IPCs'
// import icpHandlers from './ipc-handlers';
import {
  DBQueryInObject,
  DBValueOutObject,
  EnumDbNames,
  EnumDbDMLTypes,
  EnumRetStatus,
  dbPrefTabSettings
  /* SQLBaseModule */
} from './utils/SqlBaseModule'
import SqlFuncs from './utils/SqlFuncs'
import GeneralFuncs from './utils/GeneralFuncs'
import Migrations from './migrations/Migrations'

const { writeFileSync, existsSync, readFileSync, createWriteStream, mkdirSync } = require('fs')
const path = require('path')
const os = require('os')

const exitApp = (mainWindow: BrowserWindow): void => {
  // end all running objects
  if (Constants.dbPrefObject.open && Constants.dbDataObject.open) {
    Constants.dbPrefObject.close()
    Constants.dbDataObject.close()
  }
  GeneralFuncs.appendErrorLog('Application stopped')

  // save settings in preference file
  /* GeneralFuncs.savePreferenceFile('')

  // this cannot be done here - it has to be done in the savePReferenceFile function
  // Constants.logErrorObject.end()

  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.hide()
  }
  mainWindow.destroy()

  app.exit()
  */
  GeneralFuncs.savePreferenceFileAndQuit('', mainWindow)
}

export const createMainWindow = async (mainWindow: BrowserWindow): Promise<BrowserWindow> => {
  // const icon = require('../renderer/public/images/logo-64.png');
  // instantiate the Main Window
  mainWindow = new BrowserWindow({
    title: Constants.APP_NAME,
    // icon: nativeImage.createFromDataURL(icon.default),
    show: false,
    width: Constants.IS_DEV_ENV ? 1500 : 1200,
    height: 650,
    useContentSize: true,
    webPreferences: Constants.DEFAULT_WEB_PREFERENCES,
  })

  // take care of the menu
  mainWindow.setMenu(null)

  // HANDLE the Events ....
  // event close
  // mainWindow.on('close', (event: Event): void => {
  mainWindow.on('close', async (event: Event): Promise<void> => {
    event.preventDefault()

    // DONE: Save the changed x, y and width and heigt values from Constantts.tempSettings to DB Pref
    if (Constants.dbPrefObject.open) {
      try {
        const _myReqPref = new DBQueryInObject()
        _myReqPref.sInDBName = EnumDbNames.Pref
        _myReqPref.sInQueryType = EnumDbDMLTypes.Update
        _myReqPref.aInParameter = [Constants.tempSettings.appHeight.toString(), 'height']
        _myReqPref.sInQuerySql = 'Update Settings set SETT_VALUE=? where SETT_NAME=?'
        await SqlFuncs.executeSQL(_myReqPref)
        _myReqPref.aInParameter = [Constants.tempSettings.appWidth.toString(), 'width']
        await SqlFuncs.executeSQL(_myReqPref)
        _myReqPref.aInParameter = [Constants.tempSettings.appXPos.toString(), 'xpos']
        await SqlFuncs.executeSQL(_myReqPref)
        _myReqPref.aInParameter = [Constants.tempSettings.appYPos.toString(), 'ypos']
        await SqlFuncs.executeSQL(_myReqPref)
      } catch (error) {
        console.log(error)
      }
    }

    exitApp(mainWindow)
  })

  // event resized
  mainWindow.on('resize', (event: Event): void => {
    const mainWSize = mainWindow.getSize()
    // console.log('resized to: ' + mainWSize)
    Constants.tempSettings.appWidth = mainWSize[0]
    Constants.tempSettings.appHeight = mainWSize[1]

    mainWindow.webContents.send(
      'msgReceivedAppSizeChanged',
      Constants.tempSettings.appWidth,
      Constants.tempSettings.appHeight
    )
  })

  // event moved
  mainWindow.on('moved', (event: Event): void => {
    const mainWPos = mainWindow.getPosition()
    // console.log('resized to: ' + mainWPos)
    Constants.tempSettings.appXPos = mainWPos[0]
    Constants.tempSettings.appYPos = mainWPos[1]
  })

  // event frame finish load
  mainWindow.webContents.on('did-frame-finish-load', (): void => {
    if (Constants.IS_DEV_ENV) {
      mainWindow.webContents.openDevTools()
    }

    // initialize width of app
    const mainWSize = mainWindow.getSize()
    // console.log('resized to: ' + mainWSize)
    Constants.tempSettings.appWidth = mainWSize[0]
    Constants.tempSettings.appHeight = mainWSize[1]

    mainWindow.webContents.send(
      'msgReceivedAppSizeChanged',
      Constants.tempSettings.appWidth,
      Constants.tempSettings.appHeight
    )
  })

  // event ready o show
  mainWindow.once('ready-to-show', (): void => {
    mainWindow.setAlwaysOnTop(true)
    mainWindow.show()
    mainWindow.focus()
    mainWindow.setAlwaysOnTop(false)
  })
  // END of Event Handlers

  // different handlings of urls
  if (Constants.IS_DEV_ENV) {
    await mainWindow.loadURL(Constants.APP_INDEX_URL_DEV)
  } else {
    await mainWindow.loadFile(Constants.APP_INDEX_URL_PROD)
  }

  // Initialize IPC Communication
  // icpHandlers();
  // icpHandlers.IPC_Mains(mainWindow)
  IPCs.initialize(mainWindow)

  // Here the application variables are defined
  // gather information from preference file in Userdata folder ... and preference db location
  const userDataPath = app.getPath('userData')
  const userHomeDir = os.homedir()
  const emsPrefFilename = path.join(userDataPath, Constants.emsPrefFileName)
  const prefFileExists = checkFileExistsSync(emsPrefFilename)
  const emsErrorLogFilename = path.join(userDataPath, 'logError.log')
  const errLogFileExists = checkFileExistsSync(emsErrorLogFilename)
  let defPref = {
    generalDbPaths: path.join(userHomeDir, 'Aqua/dbpath'),
    dbPrefName: 'Aqua_Pref.db',
    dbDataName: 'Aqua_Data.db',
    logBasePath: userDataPath,
    logErrorPath: emsErrorLogFilename,
    /*
    appWidth: 900,
    appHeight: 1200,
    appXPos: 50,
    appYPos: 50,
*/
    lastSaved: new Date()
  }
  // END OF the applciation variables

  // handle the Errorlog - every Error will end up here
  if (!errLogFileExists) {
    try {
      writeFileSync(emsErrorLogFilename, '', 'utf8')
      console.log('Data successfully saved to disk')
    } catch (error) {
      console.log('An error has occurred ', error)
    }
  }
  Constants.logErrorObject = createWriteStream(emsErrorLogFilename, { flags: 'a' })
  Constants.logBasePath = userDataPath
  Constants.logErrorPath = emsErrorLogFilename
  GeneralFuncs.appendErrorLog('Application started')
  console.log('Logfilenames are setup')

  // handle the Preference file - where general settings (where are the DB files saved, where is the log file - saved)
  if (prefFileExists) {
    // define the variables
    let defChanged = false
    let defPrefTry = null

    try {
      // read it
      const data = readFileSync(emsPrefFilename)
      console.log('Content Pref File', JSON.parse(data))
      defPrefTry = JSON.parse(data)

      // handle entries here that are new in the defPref Object
      defChanged = GeneralFuncs.checkPrefFileChangedUpdates(defPrefTry, defPref) // false
    } catch (error) {
      // Put Error to Log
      // GeneralFuncs.appendErrorLogAndAppNotification(error.message, mainWindow)
      GeneralFuncs.appendErrorLog(error.message)
    }

    // if there is any change made - then rewrite the save file
    if (defChanged) {
      try {
        writeFileSync(emsPrefFilename, JSON.stringify(defPref, null, 2), 'utf8')
      } catch (error) {
        // Put Error to Log
        // GeneralFuncs.appendErrorLogAndAppNotification(error.retMessage, mainWindow)
        GeneralFuncs.appendErrorLog(error.retMessage)
      }
    }
    if (Constants.ErrorsOccurredInApp.length === 0) {
      defPref = defPrefTry
    }
  } else {
    // in case of missing file - recreate it and fill it with defaults
    try {
      writeFileSync(emsPrefFilename, JSON.stringify(defPref, null, 2), 'utf8')
      console.log('Data successfully saved to disk')
    } catch (error) {
      console.log('An error has occurred ', error)
    }
  }

  Constants.prefFile = defPref
  Constants.dbPrefSettings.pathAndFilename = path.join(defPref.generalDbPaths, defPref.dbPrefName)
  Constants.dbDataSettings.pathAndFilename = path.join(defPref.generalDbPaths, defPref.dbDataName)
  console.log('Userdata from app.data', userDataPath)

  // check if the file for the sqlite3 Preference db exists
  const dbPrefDBFileExists = checkFileExistsSync(Constants.dbPrefSettings.pathAndFilename)
  // if it is not there - check if you can create the folder for it.
  if (!dbPrefDBFileExists) {
    try {
      // TODO: If the Userfolder should be changeable - then we need to recursively iterate over the path and check if the folder exists
      const firstfolder = path.join(userHomeDir, 'Aqua')
      mkdirSync(firstfolder)
      mkdirSync(defPref.generalDbPaths)
    } catch (error) {
      GeneralFuncs.appendErrorLog /* AndAppNotification */ (
        'Folder for Application-Databases: ' +
          defPref.generalDbPaths +
          ' could not be created automatically - ERROR: ' +
          error /*,
        mainWindow */
      )
    }
  }
  /* this is not needed - both Databases are using the same folder
  const dbDataDBFileExists = checkFileExistsSync(Constants.dbDataSettings.pathAndFilename)
  // if it is not there - check if you can create the folder for it.
  if (!dbDataDBFileExists) {
    mkdirSync(defPref.generalDbPaths)
  }
  */

  // if it exists open the db and check if eversthing is there and what version is available ?

  // try to load preference table out of preference DB
  let resPrefDB: DBValueOutObject = null

  // here the DB conection is initialized
  const _mydbInit = new DBQueryInObject()
  _mydbInit.sInDBName = EnumDbNames.Pref
  Constants.dbPrefObject = SqlFuncs.getDBObject(_mydbInit)
  // check if file exists
  if (!checkFileExistsSync(Constants.dbPrefSettings.pathAndFilename)) {
    GeneralFuncs.appendErrorLog /* AndAppNotification */ (
      'Folder for Preference DB: ' + Constants.dbPrefSettings.pathAndFilename + ' does not exist' /* ,
      mainWindow */
    )
  }

  const _mydbDataInit = new DBQueryInObject()
  _mydbDataInit.sInDBName = EnumDbNames.Data
  Constants.dbDataObject = SqlFuncs.getDBObject(_mydbDataInit)
  if (!checkFileExistsSync(Constants.dbDataSettings.pathAndFilename)) {
    GeneralFuncs.appendErrorLog /* AndAppNotification */ (
      'Folder for Data DB: ' + Constants.dbDataSettings.pathAndFilename + ' does not exist' /* ,
      mainWindow */
    )
  }

  // Check if the Preference DB has to be created
  GeneralFuncs.appendErrorLog( "Check FileExists (" + Constants.dbPrefSettings.pathAndFilename + ") = " + checkFileExistsSync(Constants.dbPrefSettings.pathAndFilename) )
  GeneralFuncs.appendErrorLog( "Check dbPrefDBFileExists = " + dbPrefDBFileExists )
  // if (checkFileExistsSync(Constants.dbPrefSettings.pathAndFilename)) {
  if (!dbPrefDBFileExists) {
    GeneralFuncs.appendErrorLog("Preference DB File does not exist ... it will be created here");
    try {
      await createPrefDb()
    } catch (error) {
      GeneralFuncs.appendErrorLog('Preference Database could not be generated: ' + error);
    }
  }

  try {
    GeneralFuncs.appendErrorLog("Preference DB File will be checked");
    resPrefDB = await checkPrefDb()
  } catch (error) {
    GeneralFuncs.appendErrorLog("Preference DB should be created in exception");
    await createPrefDb();
    GeneralFuncs.appendErrorLogAndAppNotification('Database initialization error: ' + error);
  }

  if (resPrefDB.retStatus === EnumRetStatus.Error) {
    GeneralFuncs.appendErrorLogAndAppNotification(resPrefDB.retMessage)
  }
  // }

  // console.log('Preference DB path:'+ Constants.dbPrefSettings.pathAndFilename);
  // console.log('Data DB path:'+ Constants.dbDataSettings.pathAndFilename);
  GeneralFuncs.appendErrorLog('Preference DB path:'+ Constants.dbPrefSettings.pathAndFilename)
  GeneralFuncs.appendErrorLog('Data DB path:'+ Constants.dbDataSettings.pathAndFilename)

  // only do this when both DBs are available
  // if (checkFileExistsSync(Constants.dbPrefSettings.pathAndFilename) && checkFileExistsSync(Constants.dbDataSettings.pathAndFilename)) {
  if (Constants.dbPrefObject.open && Constants.dbDataObject.open) {
    // run the always branch ... will update the Releasenotes table
    await implementAlwaysBranch()

    // check the Releasenotes if there are more statements to run
    // try to load Releasenotes table out of preference DB
    let resRelNotes: DBValueOutObject = null
    resRelNotes = await checkRelNotesTable()
    if (resRelNotes.retStatus === EnumRetStatus.Error) {
      GeneralFuncs.appendErrorLogAndAppNotification(resRelNotes.retMessage)
    }
    // run all relevant releasenotes
    await implementReleaseNotes(resRelNotes)

    // After all db insertions (maybe from an update) check the pref db again
    resPrefDB = await checkPrefDb()

    // apply the settings of the preference file
    const dbPrefTabSettingsArray: dbPrefTabSettings[] = resPrefDB.retObject
    /*
    const test = dbPrefTabSettingsArray.filter( (i) : dbPrefTabSettings => {
      if( i.SETT_ID === 1) { return i }
    });
    let blah : dbPrefTabSettings = null;
    blah = test[0];
    console.log(blah.SETT_ID);
    */
    const wHeight: dbPrefTabSettings = dbPrefTabSettingsArray.filter((i): dbPrefTabSettings => {
      if (i.SETT_NAME === 'height') {
        return i
      }
    })[0]
    const wWidth: dbPrefTabSettings = dbPrefTabSettingsArray.filter((i): dbPrefTabSettings => {
      if (i.SETT_NAME === 'width') {
        return i
      }
    })[0]
    const wXPos: dbPrefTabSettings = dbPrefTabSettingsArray.filter((i): dbPrefTabSettings => {
      if (i.SETT_NAME === 'xpos') {
        return i
      }
    })[0]
    const wYPos: dbPrefTabSettings = dbPrefTabSettingsArray.filter((i): dbPrefTabSettings => {
      if (i.SETT_NAME === 'ypos') {
        return i
      }
    })[0]

    // const prefHeigth = 60;
    mainWindow.setSize(Number(wWidth.SETT_VALUE), Number(wHeight.SETT_VALUE))
    mainWindow.setPosition(Number(wXPos.SETT_VALUE), Number(wYPos.SETT_VALUE))
    /*
    mainWindow.setSize(Constants.prefFile.appWidth, Constants.prefFile.appHeight)
    mainWindow.setPosition(Constants.prefFile.appXPos, Constants.prefFile.appYPos)
    */
  }

  let withOrWithoutErrors = ''
  if (Constants.ErrorsOccurredInApp.length === 0) {
    withOrWithoutErrors = ' without errors.'
    mainWindow.webContents.send(
      'msgReceivedLogEntries', /*
      Constants.tempSettings.appWidth, */
      "Main Runner erfolgreich gelaufen - without errors"
    )
  } else {
    withOrWithoutErrors = ' with errors: ' + Constants.ErrorsOccurredInApp
    mainWindow.webContents.send(
      'msgReceivedError', /*
      Constants.tempSettings.appWidth, */
      "Main Runner erfolgreich gelaufen - with errors: " + Constants.ErrorsOccurredInApp
    )
  }
  console.log('MainRunner.createMainWindow finished ' + withOrWithoutErrors, resPrefDB)

  return mainWindow
}

function checkFileExistsSync(pathWithFilename: string): boolean {
  // Import the filesystem module

  try {
    const fileExists = existsSync(pathWithFilename)
    return fileExists
  } catch (error) {
    GeneralFuncs.appendErrorLog('File: ' + pathWithFilename + ' does not exist')
    return false
  }
}

async function checkRelNotesTable() {
  console.log('checkRelNotesTable - in MainRunner')

  const _myReq = new DBQueryInObject()
  _myReq.sInDBName = EnumDbNames.Pref
  _myReq.sInQueryType = EnumDbDMLTypes.Select
  _myReq.sInQuerySql = 'SELECT * FROM ReleaseNotes where RELN_INCLUDED = 0 ORDER BY RELN_DBUP_ID'

  return SqlFuncs.getData(_myReq)
    .then((rows) => {
      return rows
    })
    .catch(async (err) => {
      return err
    })
}

async function implementReleaseNotes(resRelNotes: any) {
  console.log('implementReleaseNotes - in MainRunner', resRelNotes)

  // call the script with the default preferences here
  const _myReqPref = new DBQueryInObject()
  // _myReqPref.sInDBName = EnumDbNames.Pref
  _myReqPref.sInQueryType = EnumDbDMLTypes.Select
  for (let sqlRelIndex = 0; sqlRelIndex < resRelNotes.retObject.length; sqlRelIndex++) {
    const releaseRow = resRelNotes.retObject[sqlRelIndex]

    _myReqPref.sInQuerySqlArray = Migrations.migs[releaseRow.RELN_DBUP_ID].dbUp

    for (let sqlArIndex = 0; sqlArIndex < _myReqPref.sInQuerySqlArray.length; sqlArIndex++) {
      const element = _myReqPref.sInQuerySqlArray[sqlArIndex]
      _myReqPref.sInQuerySql = element.sql
      _myReqPref.sInDBName = element.db

      GeneralFuncs.appendErrorLog('Implement Releasenotes - Entry in DB ' + element.db + ' Index (' + sqlArIndex + ') "' + element.sql + '"');
      await SqlFuncs.executeSQL(_myReqPref)
    }
  }
}

async function checkPrefDb() {
  console.log('checkPrefDb - in MainRunner')

  const _myReq = new DBQueryInObject()
  _myReq.sInDBName = EnumDbNames.Pref
  _myReq.sInQueryType = EnumDbDMLTypes.Select
  _myReq.sInQuerySql = 'SELECT * FROM Settings'

  return SqlFuncs.getData(_myReq)
    .then((rows) => {
      return rows
      // hiergehtesWeiter(rows);
    })
    .catch(async (err) => {
      return err
    })
}

async function createPrefDb() {
  console.log('createPrefDb - in MainRunner')

  // call the script with the default preferences here
  const _myReqPref = new DBQueryInObject()
  // _myReqPref.sInDBName = EnumDbNames.Pref
  _myReqPref.sInQueryType = EnumDbDMLTypes.Select
  // _myReqPref.sInQuerySql = 'CREATE TABLE SettingsTemp (      SETT_ID INTEGER,      SETT_NAME TEXT(100),      SETT_VALUE TEXT(255)    )';
  _myReqPref.sInQuerySqlArray = Migrations.migs.init.dbUp

  for (let sqlArIndex = 0; sqlArIndex < _myReqPref.sInQuerySqlArray.length; sqlArIndex++) {
    const element = _myReqPref.sInQuerySqlArray[sqlArIndex]
    _myReqPref.sInQuerySql = element.sql
    _myReqPref.sInDBName = element.db

    GeneralFuncs.appendErrorLog('Create Preference DB - Entry in DB ' + element.db + ' Index (' + sqlArIndex + ') "' + element.sql + '"');
    await SqlFuncs.executeSQL(_myReqPref)
  }
}

async function implementAlwaysBranch() {
  console.log('implementAlwaysBranch - in MainRunner')

  // call the script with the default preferences here
  const _myReqPref = new DBQueryInObject()
  // _myReqPref.sInDBName = EnumDbNames.Pref
  _myReqPref.sInQueryType = EnumDbDMLTypes.Select
  _myReqPref.sInQuerySqlArray = Migrations.migs.always.dbUp

  for (let sqlArIndex = 0; sqlArIndex < _myReqPref.sInQuerySqlArray.length; sqlArIndex++) {
    const element = _myReqPref.sInQuerySqlArray[sqlArIndex]
    _myReqPref.sInQuerySql = element.sql
    _myReqPref.sInDBName = element.db

    GeneralFuncs.appendErrorLog('Implement Alwaysbranch - Entry in DB ' + element.db + ' Index (' + sqlArIndex + ') "' + element.sql + '"');
    await SqlFuncs.executeSQL(_myReqPref)
  }
}

export const createErrorWindow = async (
  errorWindow: BrowserWindow,
  mainWindow: BrowserWindow,
  details?: RenderProcessGoneDetails
): Promise<BrowserWindow> => {
  if (!Constants.IS_DEV_ENV) {
    mainWindow?.hide()
  }

  errorWindow = new BrowserWindow({
    title: Constants.APP_NAME + ' Error !!',
    show: false,
    resizable: Constants.IS_DEV_ENV,
    webPreferences: Constants.DEFAULT_WEB_PREFERENCES
  })

  errorWindow.setMenu(null)

  if (Constants.IS_DEV_ENV) {
    await errorWindow.loadURL(`${Constants.APP_INDEX_URL_DEV}#/error`)
  } else {
    await errorWindow.loadFile(Constants.APP_INDEX_URL_PROD, { hash: 'error' })
  }

  errorWindow.on('ready-to-show', (): void => {
    if (!Constants.IS_DEV_ENV && mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.destroy()
    }
    errorWindow.show()
    errorWindow.focus()
  })

  errorWindow.webContents.on('did-frame-finish-load', (): void => {
    if (Constants.IS_DEV_ENV) {
      errorWindow.webContents.openDevTools()
    }
  })

  return errorWindow
}
