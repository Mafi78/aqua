/* eslint-disable  */
import Constants from './Constants'
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

  static appendErrorLogAndAppNotification(lineContent: string, addWindow: any = null) {
    generalFuncs.appendErrorLog(lineContent)
    Constants.ErrorsOccurredInApp += lineContent + ';'
    if (addWindow !== null) {
      addWindow.webContents.send('msgReceivedError', Constants.ErrorsOccurredInApp)
    }
  }

  static savePreferenceFile(prefFilePath: string) {
    const { writeFile, readFile } = require('fs')
    const path = require('path')

    const prefFileName = path.join(Constants.logBasePath, Constants.emsPrefFileName)

    readFile(prefFileName, (error, data) => {
      if (error) {
        // console.log(error)
        //Constants.logErrorObject.
        generalFuncs.appendErrorLogAndAppNotification(error)
        return
      }
      const parsedData = JSON.parse(data)
      parsedData.lastSaved = new Date()
      writeFile(prefFileName, JSON.stringify(parsedData, null, 2), (err) => {
        // writeFile(prefFileName, JSON.stringify(Constants.prefFile, null, 2), (err) => {
        if (err) {
          //console.log('Failed to write updated data to file')
          generalFuncs.appendErrorLogAndAppNotification('')
          return
        }
        console.log('Updated file successfully')
      })
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
