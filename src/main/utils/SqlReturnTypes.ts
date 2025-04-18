export interface dbRTDatabase {
  DABA_ID : number
  DABA_NAME : string
  DABA_DESCRIPTION : string
  DABA_VERSION : string
  DABA_CREATED_AT : string
  DABA_LAST_EDITED_AT : string
  DABA_LAST_EDITED_BY : number
  DABA_INHERITED_FROM_ID : number
  DABA_NOTES : string
}

export interface dbRTEntities {
  ENTI_ID: number
  ENTI_NAME: string
  ENTI_CATEGORY_ID: number
  ENTI_LOCKED: number
  ENTI_CREATED_AT: string
  ENTI_LAST_EDITED_AT: string
  ENTI_LAST_EDITED_BY: number
  ENTI_NOTES: string
  ENTI_DB_ID: number
}

export interface dbRTEntitiesCategory {
  ENCA_ID: number
  ENCA_NAME: string
  ENCA_DESCRIPTION: string
  ENCA_LOCKED: number
}

export interface dbRTEntitiesCharacteristic {
  ENCH_ID: number
  ENCH_ENTI_ID: number
  ENCH_NOTES: string
  ENCH_SHARED_UNDERSTANDING: number
  ENCH_PERFORMANCE_FEEDBACK: number
  ENCH_INFLUENCE_NARRATIVE: number
  ENCH_LEADERSHIP_STYLE: number
  ENCH_DECISIONMAKING_APPROACH: number
  ENCH_RELATIONSHIP_FOUNDATION: number
  ENCH_CONFLICT_RESOLUTION: number
  ENCH_TIME_MANAGEMENT: number
  ENCH_CREATED_AT: string
  ENCH_LAST_EDITED_AT: string
  ENCH_LAST_EDITED_BY: string
}

export interface dbRTCombined_EntitiesCat {
  ENTI_NAME: string
  ENTI_LOCKED: number
  ENCA_NAME: string
}