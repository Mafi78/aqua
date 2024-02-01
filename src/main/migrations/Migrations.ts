export default class Migrations {
  static migs = {
    init: {
      dbUp: [
        {
          db: 'Pref',
          sql: 'CREATE TABLE Settings (      SETT_ID INTEGER NOT NULL UNIQUE,      SETT_NAME TEXT(100),      SETT_VALUE TEXT(255)    )'
        },
        { db: 'Pref', sql: 'INSERT INTO Settings VALUES (1, "height", "900")' },
        { db: 'Pref', sql: 'INSERT INTO Settings VALUES (2, "width", "1200")' },
        { db: 'Pref', sql: 'INSERT INTO Settings VALUES (3, "xpos", "50")' },
        { db: 'Pref', sql: 'INSERT INTO Settings VALUES (4, "ypos", "50")' },
        { db: 'Pref', sql: 'INSERT INTO Settings VALUES (5, "db_version", "1.0.0")' },
        { db: 'Pref', sql: 'INSERT INTO Settings VALUES (6, "DisplayMode", "system")' },
        { db: 'Pref', sql: 'INSERT INTO BlahSettings VALUES (4, "Error needed", "error")' },
        {
          db: 'Pref',
          sql: 'CREATE TABLE ReleaseNotes ( RELN_ID INTEGER NOT NULL UNIQUE, RELN_DESC TEXT(1000), RELN_NUM TEXT(12), RELN_DATE TEXT(10), RELN_DBUP_ID TEXT(9), RELN_INCLUDED INTEGER)'
        },
        // Enable Foreign Key
        {
          db: 'Data',
          sql: 'PRAGMA foreign_keys = ON'
        },
        /* Kunde, Projekte, Aktivitäten */
        {
          db: 'Data',
          sql: 'CREATE TABLE TimeCustomer ( CUST_ID INTEGER PRIMARY KEY, CUST_NAME TEXT(40), CUST_DESC TEXT(1000), CUST_CREATEDDATE TEXT(10))'
        },
        {
          db: 'Data',
          sql: 'INSERT INTO TimeCustomer ( CUST_ID, CUST_NAME, CUST_DESC, CUST_CREATEDDATE) VALUES (0, "Please pick a Customer", "Picker-Entry", "1978-16-11")'
        },
        {
          db: 'Data',
          sql: 'CREATE TABLE TimeCostCenter ( COCE_ID INTEGER PRIMARY KEY, COCE_NAME TEXT(40), COCE_DESC TEXT(1000), COCE_CREATEDDATE TEXT(10))'
        },
        {
          db: 'Data',
          sql: 'INSERT INTO TimeCostCenter ( COCE_ID, COCE_NAME, COCE_DESC, COCE_CREATEDDATE) VALUES (0, "Please pick a Cost-Center", "Picker-Entry", "1978-16-11")'
        },
        {
          db: 'Data',
          sql: 'CREATE TABLE TimeProject ( PROJ_ID INTEGER PRIMARY KEY, PROJ_NAME TEXT(4000), PROJ_DESC TEXT(1000), PROJ_CREATEDDATE TEXT(10), PROJ_CUST_ID INTEGER NOT NULL, PROJ_COCE_ID INTEGER, FOREIGN KEY (PROJ_CUST_ID) REFERENCES TimeCustomer (CUST_ID) ON UPDATE RESTRICT ON DELETE RESTRICT, FOREIGN KEY (PROJ_COCE_ID) REFERENCES TimeCostCenter (COCE_ID) ON UPDATE RESTRICT ON DELETE RESTRICT )'
        },
        {
          db: 'Data',
          sql: 'INSERT INTO TimeProject ( PROJ_ID, PROJ_NAME, PROJ_DESC, PROJ_CREATEDDATE, PROJ_CUST_ID) VALUES (0, "Please pick a Project", "Picker-Entry", "1978-16-11", 0)'
        },
        {
          db: 'Data',
          sql: 'CREATE TABLE TimeSubProject ( SPRO_ID INTEGER PRIMARY KEY, SPRO_NAME TEXT(4000), SPRO_DESC TEXT(1000), SPRO_CREATEDDATE TEXT(10), SPRO_PROJ_ID INTEGER NOT NULL, SPRO_COCE_ID INTEGER, FOREIGN KEY (SPRO_PROJ_ID) REFERENCES TimeProject (PROJ_ID) ON UPDATE RESTRICT ON DELETE RESTRICT, FOREIGN KEY (SPRO_COCE_ID) REFERENCES TimeCostCenter (COCE_ID) ON UPDATE RESTRICT ON DELETE RESTRICT )'
        },
        {
          db: 'Data',
          sql: 'INSERT INTO TimeSubProject ( SPRO_ID, SPRO_NAME, SPRO_DESC, SPRO_CREATEDDATE, SPRO_PROJ_ID) VALUES (0, "Please pick a Sub Project", "Picker-Entry", "1978-16-11", 0)'
        },
        {
          db: 'Data',
          sql: 'CREATE TABLE TimeActivity ( AKTI_ID INTEGER PRIMARY KEY, AKTI_NAME TEXT(40), AKTI_DESC TEXT(500), AKTI_CREATEDDATE TEXT(10), AKTI_TIMEBOOKINGFACTORPERCENT Default 100, AKTI_SPRO_ID INTEGER NOT NULL, AKTI_COCE_ID INTEGER, FOREIGN KEY (AKTI_SPRO_ID) REFERENCES TimeSubProject (SPRO_ID) ON UPDATE RESTRICT ON DELETE RESTRICT, FOREIGN KEY (AKTI_COCE_ID) REFERENCES TimeCostCenter (COCE_ID) ON UPDATE RESTRICT ON DELETE RESTRICT )'
        },
        {
          db: 'Data',
          sql: 'INSERT INTO TimeActivity ( AKTI_ID, AKTI_NAME, AKTI_DESC, AKTI_CREATEDDATE, AKTI_SPRO_ID) VALUES (0, "Please pick a Activity", "Picker-Entry", "1978-16-11", 0)'
        },
        {
          db: 'Data',
          sql: 'CREATE TABLE TimeBookings ( BOKI_ID INTEGER PRIMARY KEY, BOKI_MAINTEXT TEXT(100) NOT NULL, BOKI_DESC TEXT(500), BOKI_DAY_BEGIN TEXT(10) NOT NULL, BOKI_DAY_END TEXT(10), BOKI_TIME_BEGIN TEXT(8), BOKI_TIME_END TEXT(8), BOKI_TIME_TOTAL REAL NOT NULL, BOKI_PAUSE_MIN INTEGER, BOKI_AKTI_ID INTEGER NOT NULL, BOKI_COCE_ID INTEGER, FOREIGN KEY (BOKI_AKTI_ID) REFERENCES TimeActivity (AKTI_ID) ON UPDATE RESTRICT ON DELETE RESTRICT, FOREIGN KEY (BOKI_COCE_ID) REFERENCES TimeCostCenter (COCE_ID) ON UPDATE RESTRICT ON DELETE RESTRICT )'
        }
      ]
    },
    always: {
      dbUp: [
        {
          db: 'Pref',
          sql: 'INSERT OR IGNORE INTO ReleaseNotes VALUES (1, "First major Release. Includes Basic functionality", "1.0.1", "2023-11-26", "100000001", 0)'
        },
        {
          db: 'Pref',
          sql: 'INSERT OR IGNORE INTO ReleaseNotes (RELN_ID, RELN_DESC, RELN_NUM, RELN_DATE, RELN_DBUP_ID, RELN_INCLUDED) VALUES (2, "Second minor Release. Includes Basic functionality", "1.0.2", "2023-12-30", "100000002", 0)'
        }
      ]
    },
    '100000001': {
      dbUp: [
        { db: 'Pref', sql: 'UPDATE SETTINGS SET SETT_VALUE = "1.0.1" WHERE SETT_ID = 5' },
        {
          db: 'Pref',
          sql: 'INSERT INTO Settings VALUES (7, "Feature in 1.0.1", "1.0.1 Feature Setting")'
        },
        {
          db: 'Pref',
          sql: 'UPDATE ReleaseNotes set RELN_INCLUDED = 1 where RELN_DBUP_ID = "100000001"'
        }
      ]
    },
    '100000002': {
      dbUp: [
        { db: 'Pref', sql: 'UPDATE SETTINGS SET SETT_VALUE = "1.0.2" WHERE SETT_ID = 5' },
        {
          db: 'Pref',
          sql: 'INSERT INTO Settings VALUES (8, "Feature in 1.0.2", "1.0.2 Feature Setting")'
        },
        {
          db: 'Pref',
          sql: 'UPDATE ReleaseNotes set RELN_INCLUDED = 1 where RELN_DBUP_ID = "100000002"'
        }
      ]
    }
  }
}
