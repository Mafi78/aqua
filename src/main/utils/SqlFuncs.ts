/* eslint-disable  */
// import { systemPreferences } from 'electron'
import Constants from './Constants'
import GeneralFuncs from './GeneralFuncs'
import {
  DBValueOutObject,
  DBQueryInObject,
  EnumDbNames,
  EnumRetStatus /* SQLBaseModule */
} from './SqlBaseModule'
import { Database } from 'sqlite3'

export default class sqlFuncs {
  // this has to be called one time at the beginnin for every DB
  static getDBObject(Para1inside: DBQueryInObject) {
    const sqlite3 = require('sqlite3')
    // is only used for development
    if (Constants.IS_DEV_ENV) {
      sqlite3.verbose()
    }
    let db = null

    // check which DB should be used
    if (Para1inside.sInDBName == EnumDbNames.Pref) {
      db = new sqlite3.Database(Constants.dbPrefSettings.pathAndFilename)
    } else if (Para1inside.sInDBName == EnumDbNames.Data) {
      db = new sqlite3.Database(Constants.dbDataSettings.pathAndFilename)
    }

    // enable logging for SQL queries
    if (Constants.IS_DEV_ENV) {
      db.on('trace', (data) => {
        console.log('What SQL is used: ' + data)
      })
    }

    return db
  }

  // static async getData(Para1inside: DBQueryInObject): Promise<any> {
  static async getData(Para1inside: DBQueryInObject): Promise<DBValueOutObject> {
    console.log('Para1_inside:')
    console.log(Para1inside)
    console.log('DBStatement', Para1inside.sInQuerySql)

    // check which DB should be used
    //const sqlite3 = require('sqlite3')
    let db = null
    if (Para1inside.sInDBName == EnumDbNames.Pref) {
      db = Constants.dbPrefObject
    } else if (Para1inside.sInDBName == EnumDbNames.Data) {
      db = Constants.dbDataObject
    }

    // execute the statement
    return new Promise<DBValueOutObject>((resolve, reject) => {
      db.all(Para1inside.sInQuerySql, (err, rows) => {
        let dbRetObj = new DBValueOutObject()
        if (err) {
          dbRetObj.retMessage = err.message + ' for SQL ' + Para1inside.sInQuerySql
          dbRetObj.retStatus = EnumRetStatus.Error
          GeneralFuncs.appendErrorLogAndAppNotification(dbRetObj.retMessage)
          reject(dbRetObj)
        } else {
          dbRetObj.retStatus = EnumRetStatus.OK
          dbRetObj.retObject = rows
          resolve(dbRetObj)
        }
      })
    })
  }

  // static async executeSQLSingle(Para1inside: DBQueryInObject): Promise<DBValueOutObject> {
  static async executeSQL(Para1inside: DBQueryInObject): Promise<DBValueOutObject> {
    // console.log(Para1inside)
    /*
    // no arrays are allowed to pass anymore :(
    if (Para1inside.sInQuerySql != null) {
      console.log('DBStatement executeSQL: ', Para1inside.sInQuerySql)
    } else {
      console.log('DBStatement executeSQLArray passed (hopefully)')
    }
    */

    let db = null
    if (Para1inside.sInDBName == EnumDbNames.Pref) {
      db = Constants.dbPrefObject
    } else if (Para1inside.sInDBName == EnumDbNames.Data) {
      db = Constants.dbDataObject
    }

    // check if ParameterArray is null
    if (Para1inside.aInParameter === null || Para1inside.aInParameter === undefined) {
      // call it without any passed parameters
      return new Promise<DBValueOutObject>((resolve, reject) => {
        db.exec(Para1inside.sInQuerySql, (err) => {
          let dbRetObj = new DBValueOutObject()
          if (err != null) {
            dbRetObj.retMessage = err.message + ' for SQL ' + Para1inside.sInQuerySql
            dbRetObj.retStatus = EnumRetStatus.Error
            GeneralFuncs.appendErrorLogAndAppNotification(dbRetObj.retMessage)
            //reject(dbRetObj);
            resolve(dbRetObj)
          } else {
            // else case is the normal behaviour - no exceptions happened
            dbRetObj.retStatus = EnumRetStatus.OK
            // dbRetObj.retObject = rows;
            resolve(dbRetObj)
          }
        })
      })

    } else {
      // call it with parameters
      return new Promise<DBValueOutObject>((resolve, reject) => {
        const params = ['value1', 'value2']
        db.run(Para1inside.sInQuerySql, Para1inside.aInParameter, (err) => {
          let dbRetObj = new DBValueOutObject()
          if (err != null) {
            dbRetObj.retMessage = err.message + ' for SQL ' + Para1inside.sInQuerySql
            dbRetObj.retStatus = EnumRetStatus.Error
            GeneralFuncs.appendErrorLogAndAppNotification(dbRetObj.retMessage)
            //reject(dbRetObj);
            resolve(dbRetObj)
          } else {
            // else case is the normal behaviour - no exceptions happened
            dbRetObj.retStatus = EnumRetStatus.OK
            // dbRetObj.retObject = rows;
            resolve(dbRetObj)
          }
        })
      })

    }

  }
}

export const { getDBObject, getData, executeSQL /* , testIt */ } = sqlFuncs
