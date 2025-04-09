/* eslint-disable no-unused-vars */

export enum EnumRetStatus {
  OK = 0,
  Error = 1,
  Unknown = 99
}

export enum EnumDbNames {
  Pref = 'Pref',
  Data = 'Data',
  None = '??'
}

export enum EnumDbDMLTypes {
  Insert = 'Insert',
  Update = 'Update',
  Delete = 'Delete',
  Select = 'Select'
}
export class DBQueryInObject {
  public sInDBName: string
  public sInQueryType: string
  public sInQuerySql: string
  public sInQuerySqlArray: { db: string; sql: string }[]
  public aInParameter: string[]
  public sInIPCResponse: string
  public sInIPCResponseError: string
}

export class DBValueOutObject {
  public retArray: {}
  public retObject: []
  public retStatus: number
  public retMessage: string
  public retID: string
  public retErrorMessage: string
}

export class DBValueInsertObject {
  public changes: number
  public lastID: number
}


export interface dbPrefTabSettings {
  SETT_ID: number
  SETT_NAME: string
  SETT_VALUE: string
}

export enum EnumDBStatements {
  SelDatabase = "SELECT DABA_ID, DABA_NAME, DABA_DESCRIPTION, DABA_VERSION, DABA_CREATED_AT, DABA_LAST_EDITED_AT, DABA_LAST_EDITED_BY, DABA_INHERITED_FROM_ID, DABA_NOTES FROM Databases",
  SelEntityAndCategories = "SELECT ent.ENTI_NAME, ent.ENTI_LOCKED, cat.ENCA_NAME FROM Entities ent INNER JOIN Entity_Category cat on (ent.ENTI_CATEGORY_ID = cat.ENCA_ID) where ENTI_DB_ID = 0",
  InsDatabase = "INSERT INTO Databases (DABA_NAME, DABA_DESCRIPTION, DABA_VERSION, DABA_CREATED_AT, DABA_LAST_EDITED_AT, DABA_LAST_EDITED_BY, DABA_INHERITED_FROM_ID, DABA_NOTES) VALUES(?, ?, ?, datetime(), datetime(), NULL, NULL, ?)",
  UpdateDatabase = "Update Databases set DABA_NAME=?, DABA_NOTES = ?, DABA_LAST_EDITED_AT = datetime() where DABA_ID = ?",
  InsEntitiesFalsch = "INSERT INTO Entities (ENTI_NAME, ENTI_CATEGORY_ID, ENTI_LOCKED, ENTI_CREATED_AT, ENTI_LAST_EDITED_AT, ENTI_LAST_EDITED_BY, ENTI_NOTES, ENTI_DB_ID, ENTI_CHAR_ID) VALUES ('?', ?, 0, NULL, NULL, NULL, '?', ?, ?)",
  InsEntities = "INSERT INTO Entities (ENTI_NAME, ENTI_CATEGORY_ID, ENTI_LOCKED, ENTI_CREATED_AT, ENTI_LAST_EDITED_AT, ENTI_LAST_EDITED_BY, ENTI_NOTES, ENTI_DB_ID, ENTI_CHAR_ID) VALUES (?, ?, 0, datetime(), datetime(), NULL, ?, ?, ?)",
  UpdateEntities = "Update Entities SET ENTI_NAME=?, ENTI_LAST_EDITED_AT = datetime() WHERE ENTI_ID = ?",
  DelEntities = "DELETE from Entities  where ENTI_ID = ?",
  DelDatabase = "DELETE FROM Databases WHERE DABA_ID = ?",
  SelEntriesWithDbID = "SELECT ENTI_ID, ENTI_NAME, ENTI_CATEGORY_ID, ENTI_LOCKED, ENTI_CREATED_AT, ENTI_LAST_EDITED_AT, ENTI_LAST_EDITED_BY, ENTI_NOTES, ENTI_DB_ID, ENTI_CHAR_ID FROM Entities where ENTI_DB_ID = ?",
  SelEntityCharacteristicsWithEntityID = "SELECT ENCH_ID, ENCH_ENTI_ID, ENCH_NOTES, ENCH_SHARED_UNDERSTANDING, ENCH_PERFORMANCE_FEEDBACK, ENCH_INFLUENCE_NARRATIVE, ENCH_LEADERSHIP_STYLE, ENCH_DECISIONMAKING_APPROACH, ENCH_RELATIONSHIP_FOUNDATION, ENCH_CONFLICT_RESOLUTION, ENCH_TIME_MANAGEMENT, ENCH_CREATED_AT, ENCH_LAST_EDITED_AT, ENCH_LAST_EDITED_BY FROM Entity_Characteristics where ENCH_ENTI_ID = ?",
  InsEntCharacteristics = "INSERT INTO Entity_Characteristics (ENCH_ENTI_ID, ENCH_NOTES, ENCH_SHARED_UNDERSTANDING, ENCH_PERFORMANCE_FEEDBACK, ENCH_INFLUENCE_NARRATIVE, ENCH_LEADERSHIP_STYLE, ENCH_DECISIONMAKING_APPROACH, ENCH_RELATIONSHIP_FOUNDATION, ENCH_CONFLICT_RESOLUTION, ENCH_TIME_MANAGEMENT, ENCH_CREATED_AT, ENCH_LAST_EDITED_AT, ENCH_LAST_EDITED_BY) VALUES(?, ?, 50, 50, 50, 50, 50, 50, 50, 50, datetime(), datetime(), ?);",
  UpdateEntityCharacteristics = "UPDATE Entity_Characteristics SET ENCH_NOTES=?, ENCH_SHARED_UNDERSTANDING=?, ENCH_PERFORMANCE_FEEDBACK=?, ENCH_INFLUENCE_NARRATIVE=?, ENCH_LEADERSHIP_STYLE=?, ENCH_DECISIONMAKING_APPROACH=?, ENCH_RELATIONSHIP_FOUNDATION=?, ENCH_CONFLICT_RESOLUTION=?, ENCH_TIME_MANAGEMENT=?, ENCH_LAST_EDITED_AT = datetime() WHERE ENCH_ENTI_ID = ?"
}