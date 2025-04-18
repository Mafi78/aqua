export default class Migrations {
  static migs = {
    init: {
      dbUp: [
        {
          db: 'Pref',
          sql: 'CREATE TABLE Settings (      SETT_ID INTEGER NOT NULL UNIQUE,      SETT_NAME TEXT(100),      SETT_VALUE TEXT(255)    )',
          iter: 1
        },
        { db: 'Pref', sql: 'INSERT INTO Settings VALUES (1, "height", "900")', iter: 2 },
        { db: 'Pref', sql: 'INSERT INTO Settings VALUES (2, "width", "1200")', iter: 3 },
        { db: 'Pref', sql: 'INSERT INTO Settings VALUES (3, "xpos", "50")', iter: 4 },
        { db: 'Pref', sql: 'INSERT INTO Settings VALUES (4, "ypos", "50")', iter: 5 },
        { db: 'Pref', sql: 'INSERT INTO Settings VALUES (5, "db_version", "1.0.0")', iter: 6 },
        { db: 'Pref', sql: 'INSERT INTO Settings VALUES (6, "DisplayMode", "system")', iter: 7 },
        /* { db: 'Pref', sql: 'INSERT INTO BlahSettings VALUES (4, "Error needed", "error")' }, */
        {
          db: 'Pref',
          sql: 'CREATE TABLE ReleaseNotes ( RELN_ID INTEGER NOT NULL UNIQUE, RELN_DESC TEXT(1000), RELN_NUM TEXT(12), RELN_DATE TEXT(10), RELN_DBUP_ID TEXT(9), RELN_INCLUDED INTEGER)', iter: 8
        },
        // Enable Foreign Key
        {
          db: 'Data',
          sql: 'PRAGMA foreign_keys = ON', iter: 9
        },
        /* Databases */
        {
          db: 'Data',
          sql: 'CREATE TABLE Databases (             DABA_ID INTEGER PRIMARY KEY AUTOINCREMENT,            DABA_NAME TEXT NOT NULL,            DABA_DESCRIPTION TEXT,            DABA_VERSION TEXT,            DABA_CREATED_AT TEXT,            DABA_LAST_EDITED_AT TEXT,            DABA_LAST_EDITED_BY INTEGER,            DABA_INHERITED_FROM_ID INTEGER,            DABA_NOTES TEXT          )', iter: 10
        } /*,
        {
          db: 'Data',
          sql: 'INSERT INTO TimeCustomer ( CUST_ID, CUST_NAME, CUST_DESC, CUST_CREATEDDATE) VALUES (0, "Please pick a Customer", "Picker-Entry", "1978-16-11")'
        } */,
        {
          db: 'Data',
          sql: 'CREATE TABLE Entity_Category (            ENCA_ID INTEGER PRIMARY KEY AUTOINCREMENT,            ENCA_NAME TEXT,            ENCA_DESCRIPTION TEXT,            ENCA_LOCKED INTEGER DEFAULT (0)          )', iter: 11
        },
        {
          db: 'Data',
          sql: 'INSERT INTO Entity_Category          (ENCA_ID, ENCA_NAME, ENCA_DESCRIPTION, ENCA_LOCKED)          VALUES(0, "Countries", "Länder", 0)', iter: 12
        },
        {
          db: 'Data',
          sql: 'INSERT INTO Entity_Category          (ENCA_ID, ENCA_NAME, ENCA_DESCRIPTION, ENCA_LOCKED)          VALUES(1, "People", "Personen", 0)', iter: 13
        }, /*
        {
          db: 'Data',
          sql: 'CREATE TABLE Entity_Characteristics (            ENCH_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,            ENCH_NOTES TEXT,            ENCH_SHARED_UNDERSTANDING REAL NOT NULL,            ENCH_PERFORMANCE_FEEDBACK REAL NOT NULL,            ENCH_INFLUENCE_NARRATIVE REAL NOT NULL,            ENCH_LEADERSHIP_STYLE REAL NOT NULL,            NCH_DECISIONMAKING_APPROACH REAL NOT NULL,            ENCH_RELATIONSHIP_FOUNDATION REAL NOT NULL,            ENCH_CONFLICT_RESOLUTION REAL NOT NULL,            ENCH_TIME_MANAGEMENT REAL NOT NULL,            ENCH_CREATED_AT TEXT,            ENCH_LAST_EDITED_AT TEXT,            ENCH_LAST_EDITED_BY TEXT          )', iter: 14
        } */
        {
          db: 'Data',
          sql: 'CREATE TABLE Entity_Characteristics ( ENCH_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ENCH_ENTI_ID INTEGER, ENCH_NOTES TEXT, ENCH_SHARED_UNDERSTANDING REAL NOT NULL, ENCH_PERFORMANCE_FEEDBACK REAL NOT NULL, ENCH_INFLUENCE_NARRATIVE REAL NOT NULL, ENCH_LEADERSHIP_STYLE REAL NOT NULL, ENCH_DECISIONMAKING_APPROACH REAL NOT NULL, ENCH_RELATIONSHIP_FOUNDATION REAL NOT NULL, ENCH_CONFLICT_RESOLUTION REAL NOT NULL, ENCH_TIME_MANAGEMENT REAL NOT NULL, ENCH_CREATED_AT TEXT, ENCH_LAST_EDITED_AT TEXT, ENCH_LAST_EDITED_BY TEXT, CONSTRAINT Characteristics_EntitiesFK FOREIGN KEY (ENCH_ENTI_ID) REFERENCES Entities(ENTI_ID) ON DELETE CASCADE ON UPDATE RESTRICT)', iter: 14
        },
        {
          db: 'Data',
          sql: 'CREATE TABLE Entities (            ENTI_ID INTEGER PRIMARY KEY AUTOINCREMENT,            ENTI_NAME TEXT,            ENTI_CATEGORY_ID INTEGER DEFAULT (0),            ENTI_LOCKED INTEGER DEFAULT (0),            ENTI_CREATED_AT TEXT,            ENTI_LAST_EDITED_AT TEXT,            ENTI_LAST_EDITED_BY TEXT,            ENTI_NOTES TEXT,            ENTI_DB_ID INTEGER,            CONSTRAINT Entities_Entity_Category_FK FOREIGN KEY (ENTI_CATEGORY_ID) REFERENCES Entity_Category(ENCA_ID) ON DELETE SET DEFAULT ON UPDATE RESTRICT,            CONSTRAINT Entities_Databases_FK FOREIGN KEY (ENTI_DB_ID) REFERENCES Databases(DABA_ID) ON DELETE CASCADE ON UPDATE RESTRICT         )', iter: 15
        } /*,
        {
          db: 'Data',
          sql: 'INSERT INTO TimeProject ( PROJ_ID, PROJ_NAME, PROJ_DESC, PROJ_CREATEDDATE, PROJ_CUST_ID) VALUES (0, "Please pick a Project", "Picker-Entry", "1978-16-11", 0)'
        } */,
        {
          db: 'Data',
          sql: 'CREATE TABLE Scenario (            SCEN_ID INTEGER PRIMARY KEY AUTOINCREMENT,            SCEN_NAME TEXT,            SCEN_DB_ID INTEGER,            SCEN_ENTI_ID1 INTEGER,            SCEN_ENTI_ID2 INTEGER,            SCEN_CREATED_AT TEXT,            SCEN_LAST_EDITED_BY TEXT,            SCEN_LAST_EDITED_AT TEXT,            SCEN_NOTES TEXT,            CONSTRAINT Scenario_Databases_FK FOREIGN KEY (SCEN_DB_ID) REFERENCES Databases(DABA_ID) ON DELETE CASCADE ON UPDATE RESTRICT,            CONSTRAINT Scenario_Entities_FK FOREIGN KEY (SCEN_ENTI_ID1) REFERENCES Entities(ENTI_ID) ON DELETE SET NULL ON UPDATE RESTRICT,            CONSTRAINT Scenario_Entities_FK_1 FOREIGN KEY (SCEN_ENTI_ID2) REFERENCES Entities(ENTI_ID) ON DELETE SET NULL ON UPDATE RESTRICT          )', iter: 16
        } /*,
        {
          db: 'Data',
          sql: 'INSERT INTO TimeActivity ( AKTI_ID, AKTI_NAME, AKTI_DESC, AKTI_CREATEDDATE, AKTI_SPRO_ID) VALUES (0, "Please pick a Activity", "Picker-Entry", "1978-16-11", 0)'
        } */
      ]
    },
    always: {
      dbUp: [
        {
          db: 'Data',
          sql: 'PRAGMA foreign_keys = ON', iter: 17
        }
        /* ,
        {
          db: 'Pref',
          sql: 'INSERT OR IGNORE INTO ReleaseNotes VALUES (1, "First major Release. Includes Basic functionality", "1.0.1", "2024-05-26", "100000001", 0)', iter: 18
        },
        {
          db: 'Pref',
          sql: 'INSERT OR IGNORE INTO ReleaseNotes (RELN_ID, RELN_DESC, RELN_NUM, RELN_DATE, RELN_DBUP_ID, RELN_INCLUDED) VALUES (2, "Second minor Release. Includes Basic functionality", "1.0.2", "2023-12-30", "100000002", 0)', iter: 19
        },
        {
          db: 'Pref',
          sql: 'INSERT OR IGNORE INTO ReleaseNotes (RELN_ID, RELN_DESC, RELN_NUM, RELN_DATE, RELN_DBUP_ID, RELN_INCLUDED) VALUES (3, "Second minor Release. Includes Basic functionality", "1.0.3", "2025-03-25", "100000003", 0)', iter: 20
        } */
      ]
    },
    /* you have to set the property values in the always section as well to be able to get seen ! */
    /*
    '100000001': {
      dbUp: [
        { db: 'Pref', sql: 'UPDATE SETTINGS SET SETT_VALUE = "1.0.1" WHERE SETT_ID = 5', iter: 21 },
        {
          db: 'Pref',
          sql: 'INSERT INTO Settings VALUES (7, "Feature in 1.0.1", "1.0.1 Feature Setting")', iter: 22
        },
        {
          db: 'Pref',
          sql: 'UPDATE ReleaseNotes set RELN_INCLUDED = 1 where RELN_DBUP_ID = "100000001"', iter: 23
        }
      ]
    },
    '100000002': {
      dbUp: [
        { db: 'Pref', sql: 'UPDATE SETTINGS SET SETT_VALUE = "1.0.2" WHERE SETT_ID = 5', iter: 24 },
        {
          db: 'Pref',
          sql: 'INSERT INTO Settings VALUES (8, "Feature in 1.0.2", "1.0.2 Feature Setting")', iter: 25
        },
        {
          db: 'Pref',
          sql: 'UPDATE ReleaseNotes set RELN_INCLUDED = 1 where RELN_DBUP_ID = "100000002"', iter: 26
        }
      ]
    },
    '100000003': {
      dbUp: [
        { db: 'Pref', sql: 'UPDATE SETTINGS SET SETT_VALUE = "1.0.3" WHERE SETT_ID = 5', iter: 27 },
        {
          db: 'Data',
          sql: 'PRAGMA foreign_keys = OFF', iter: 27
        },
        {
          db: 'Data',
          sql: 'CREATE TABLE Entity_Characteristics_New ( ENCH_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ENCH_ENTI_ID INTEGER, ENCH_NOTES TEXT, ENCH_SHARED_UNDERSTANDING REAL NOT NULL, ENCH_PERFORMANCE_FEEDBACK REAL NOT NULL, ENCH_INFLUENCE_NARRATIVE REAL NOT NULL, ENCH_LEADERSHIP_STYLE REAL NOT NULL, ENCH_DECISIONMAKING_APPROACH REAL NOT NULL, ENCH_RELATIONSHIP_FOUNDATION REAL NOT NULL, ENCH_CONFLICT_RESOLUTION REAL NOT NULL, ENCH_TIME_MANAGEMENT REAL NOT NULL, ENCH_CREATED_AT TEXT, ENCH_LAST_EDITED_AT TEXT, ENCH_LAST_EDITED_BY TEXT, CONSTRAINT Characteristics_EntitiesFK FOREIGN KEY (ENCH_ENTI_ID) REFERENCES Entities(ENTI_ID) ON DELETE CASCADE ON UPDATE RESTRICT)', iter: 28
        },
        {
          db: 'Data',
          sql: 'INSERT INTO Entity_Characteristics_New (ENCH_ID, ENCH_ENTI_ID, ENCH_NOTES, ENCH_SHARED_UNDERSTANDING, ENCH_PERFORMANCE_FEEDBACK, ENCH_INFLUENCE_NARRATIVE, ENCH_LEADERSHIP_STYLE, ENCH_DECISIONMAKING_APPROACH, ENCH_RELATIONSHIP_FOUNDATION, ENCH_CONFLICT_RESOLUTION, ENCH_TIME_MANAGEMENT, ENCH_CREATED_AT, ENCH_LAST_EDITED_AT, ENCH_LAST_EDITED_BY) SELECT ENCH_ID, NULL, ENCH_NOTES, ENCH_SHARED_UNDERSTANDING, ENCH_PERFORMANCE_FEEDBACK, ENCH_INFLUENCE_NARRATIVE, ENCH_LEADERSHIP_STYLE, NCH_DECISIONMAKING_APPROACH, ENCH_RELATIONSHIP_FOUNDATION, ENCH_CONFLICT_RESOLUTION, ENCH_TIME_MANAGEMENT, ENCH_CREATED_AT, ENCH_LAST_EDITED_AT, ENCH_LAST_EDITED_BY FROM Entity_Characteristics', iter: 29
        },
        {
          db: 'Data',
          sql: 'drop table Entity_Characteristics', iter: 30
        },
        {
          db: 'Data',
          sql: 'ALTER TABLE Entity_Characteristics_New RENAME TO Entity_Characteristics', iter: 31
        },
        {
          db: 'Data',
          sql: 'PRAGMA foreign_keys = ON', iter: 32
        },
        {
          db: 'Pref',
          sql: 'UPDATE ReleaseNotes set RELN_INCLUDED = 1 where RELN_DBUP_ID = "100000003"', iter: 33
        },
      ]
    }
      */
  }
}
