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
}

export class DBValueOutObject {
  public retArray: {}
  public retObject: []
  public retStatus: number
  public retMessage: string
}

export interface dbPrefTabSettings {
  SETT_ID: number
  SETT_NAME: string
  SETT_VALUE: string
}

/*
export module SQLBaseModule {
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
    public aInParameter: []
  }

  export class DBValueOutObject {
    public retArray: {}
    public retObject: []
    public retStatus: number
    public retMessage: string
  }
}

*/
