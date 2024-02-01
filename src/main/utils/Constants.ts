import { join } from 'path'
import { name, version } from '../../../package.json'

export default class Constants {
  /* Here the infos from the preference file is stored
  this is filled on app startup and it is saved on app shutdown in a file */
  static prefFile = {
    generalDbPaths: '',
    dbPrefName: '',
    dbDataName: '',
    logBasePath: '',
    logErrorPath: '',
/*
    appWidth: 1500,
    appHeight: 800,
    appXPos: 100,
    appYPos: 100,
*/
    lastSaved: new Date()
  }

  // From here in the rest of the constants / variables are used
  // Display app name (uppercase first letter)
  static APP_NAME = name.charAt(0).toUpperCase() + name.slice(1)

  static APP_VERSION = version

  static IS_DEV_ENV = process.env.NODE_ENV === 'development'

  static IS_MAC = process.platform === 'darwin'

  static DEFAULT_WEB_PREFERENCES = {
    nodeIntegration: false,
    contextIsolation: true,
    enableRemoteModule: false,
    preload: join(__dirname, '../preload/index.js')
  }

  static APP_INDEX_URL_DEV = 'http://localhost:5173/index.html'
  static APP_INDEX_URL_PROD = join(__dirname, '../index.html')

  static dbPrefSettings = {
    pathAndFilename: '',
    connectionStatus: ''
  }

  static dbDataSettings = {
    pathAndFilename: '',
    connectionStatus: ''
  }

  // Name of the Preference persisting file
  static emsPrefFileName = 'aquaPref.json'

  // Here are the db-Objects stored
  static dbPrefObject = null
  static dbDataObject = null

  // logfile base and all filenames are saved here
  static logBasePath = ''
  static logErrorPath = ''
  static logErrorObject = null

  // make a place where all errors are stored
  static ErrorsOccurredInApp = ''

  // temporary things to store
  static tempSettings = {
    appWidth: 1500,
    appHeight: 800,
    appXPos: 100,
    appYPos: 100,
  }
}
