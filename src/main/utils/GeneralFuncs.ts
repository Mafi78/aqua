/* eslint-disable  */
import Constants from './Constants'
import { app, BrowserWindow} from 'electron'
// import { DBValueOutObject, DBQueryInObject, EnumDbNames, EnumRetStatus } from './SqlBaseModule'
//import { Database } from 'sqlite3'

export default class generalFuncs {
  // this has to be called one time at the beginnin for every DB
  static demoFunc(Para1: string) {}

  static appendErrorLog(lineContent: string) {
    let tsDate: Date = new Date()
    let dateStr =
      tsDate.getFullYear() +
      '-' +
      (tsDate.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      tsDate.getDate().toString().padStart(2, '0') +
      ' ' +
      tsDate.getHours().toString().padStart(2, '0') +
      ':' +
      tsDate.getMinutes().toString().padStart(2, '0') +
      ':' +
      tsDate.getSeconds().toString().padStart(2, '0')
    Constants.logErrorObject.write(dateStr + ';' + lineContent + '\n\r')
  }

  static test(lineContent: string) {
    this.appendErrorLog(lineContent)
    
  }

  static appendErrorLogAndAppNotification(lineContent: string, addWindow: any = null) {
    generalFuncs.appendErrorLog(lineContent)
    Constants.ErrorsOccurredInApp += lineContent + ';'
    if (addWindow !== null) {
      // addWindow.webContents.send('msgReceivedError', Constants.ErrorsOccurredInApp)
      addWindow.webContents.send('msgReceivedError', lineContent)
    }
  }

  /* outdated */
  static savePreferenceFile(prefFilePath: string) {
    const { writeFile, readFile } = require('fs')
    const path = require('path')

    const prefFileName = path.join(Constants.logBasePath, Constants.emsPrefFileName)

    generalFuncs.appendErrorLog("savePreferenceFile 1");

    readFile(prefFileName, (error, data) => {
      if (error) {
        // console.log(error)
        //Constants.logErrorObject.
        this.appendErrorLog("savePreferenceFiles Error: " + error)
        return
      }
      try {
        const parsedData = JSON.parse(data)
        parsedData.lastSaved = new Date()

        this.appendErrorLog("savePreferenceFile 2");

        writeFile(prefFileName, JSON.stringify(parsedData, null, 2), (err) => {
          // writeFile(prefFileName, JSON.stringify(Constants.prefFile, null, 2), (err) => {
          if (err) {
            //console.log('Failed to write updated data to file')
            this.appendErrorLog('Es gab einen Fehler beim Schreiben der .json Datei ' + err)
            Constants.logErrorObject.end()
            return
          }
          this.appendErrorLog("savePreferenceFile 3");
          this.appendErrorLog('Updated file successfully')
          console.log('Updated file successfully')
          Constants.logErrorObject.end()
        })
      } catch (error) {
        this.appendErrorLog('Error while writing preference file: ' + error)
        //console.log('Error while writing preference file: ' + error)
        Constants.logErrorObject.end()
      } finally {
        
      }
      
    })
  }

  static savePreferenceFileAndQuit(prefFilePath: string, mainWindow: BrowserWindow) {
    const { writeFile, readFile } = require('fs')
    const path = require('path')

    const prefFileName = path.join(Constants.logBasePath, Constants.emsPrefFileName)

    generalFuncs.appendErrorLog("savePreferenceFile 1");

    readFile(prefFileName, (error, data) => {
      if (error) {
        // console.log(error)
        //Constants.logErrorObject.
        this.appendErrorLog("savePreferenceFiles Error: " + error)
        return
      }
      try {
        const parsedData = JSON.parse(data)
        parsedData.lastSaved = new Date()

        this.appendErrorLog("savePreferenceFile 2");

        writeFile(prefFileName, JSON.stringify(parsedData, null, 2), (err) => {
          // writeFile(prefFileName, JSON.stringify(Constants.prefFile, null, 2), (err) => {
          if (err) {
            //console.log('Failed to write updated data to file')
            this.appendErrorLog('Es gab einen Fehler beim Schreiben der .json Datei ' + err)
            Constants.logErrorObject.end()
            return
          }
          this.appendErrorLog('Updated file ' + prefFileName + ' successfully')
          // console.log('Updated file successfully')
          Constants.logErrorObject.end()
        })
      } catch (error) {
        this.appendErrorLog('Error while writing preference file: ' + error)
        //console.log('Error while writing preference file: ' + error)
        Constants.logErrorObject.end()
      } finally {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.hide()
        }
        mainWindow.destroy()

        //Constants.logErrorObject.end()
      
        app.exit()
      }
      
    })
  }

  static checkPrefFileChangedUpdates(defPrefTry: any, defPref: any): boolean {
    let defChanged = false

    if (defPrefTry.logBasePath === undefined) {
      defPrefTry.logBasePath = defPref.logBasePath
      defChanged = true
    }
    if (defPrefTry.logErrorPath === undefined) {
      defPrefTry.logErrorPath = defPref.logErrorPath
      defChanged = true
    }
    if (defPrefTry.appWidth === undefined) {
      defPrefTry.appWidth = defPref.appWidth
      defChanged = true
    }
    if (defPrefTry.appHeight === undefined) {
      defPrefTry.appHeight = defPref.appHeight
      defChanged = true
    }
    if (defPrefTry.appXPos === undefined) {
      defPrefTry.appXPos = defPref.appXPos
      defChanged = true
    }
    if (defPrefTry.appYPos === undefined) {
      defPrefTry.appYPos = defPref.appYPos
      defChanged = true
    }

    return defChanged
  }
}
