/* eslint-disable no-unused-vars */
export class PiniaStoreNaviObject {
  id: number;
  title: string;
  action: string;
  icon: string;
  visible:boolean;
  extraInfo: {
    localKey: string;
    localValue: string;
  }
/*
  constructor(id: number, title: string, action: string, icon: string, visible: boolean) {
    this.id = id;
    this.title = title;
    this.action = action;
    this.icon = icon;
    this.visible = visible;
  }
*/
}

export class LogStoreObject {
  errorId: number;
  errorDate: Date
  errorText: string;
  errorIcon: string;
  errorType: string; /* possible values are info, warning anderror */

  constructor(errorId: number, errorDate: Date, errorText: string) {
    this.errorId = errorId;
    this.errorDate = errorDate;
    this.errorText = errorText;
    this.errorIcon = "";
    this.errorType = "error";
  }
}