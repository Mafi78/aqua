import { contextBridge, ipcRenderer } from 'electron'
// import Constants from './../main/utils/Constants' // including the Constants file did not work - could no tbe build corectly

// Whitelist of valid channels used for IPC communication (Send message from Renderer to Main)
const mainAvailChannels: string[] = [
  'msgRequestGetVersion',
  'msgOpenExternalLink',
  'msgRequestSQLData',
  'msgRequestSQLPref',
  'msgRequestConstant',
  'msgRequestCleanErrors'
]
const rendererAvailChannels: string[] = [
  'msgReceivedVersion',
  'msgReceivedSQL',
  'msgReceivedConstant',
  'msgReceivedError',
  'msgReceivedAppSizeChanged'
]

contextBridge.exposeInMainWorld('mainApi', {
  send: (channel: string, ...data: any[]): void => {
    if (mainAvailChannels.includes(channel)) {
      ipcRenderer.send.apply(null, [channel, ...data])
    } else {
      /* Constants.logErrorObject.appendErrorLogAndAppNotification(
        `Send failed: Unknown ipc channel name: ${channel}`
      ) */
      throw new Error(`Send failed: Unknown ipc channel name: ${channel}`)
    }
  },
  receive: (channel: string, cbFunc: Function): void => {
    if (rendererAvailChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => cbFunc(event, ...args))
    } else {
      /* Constants.logErrorObject.appendErrorLogAndAppNotification(
        `Receive failed: Unknown ipc channel name: ${channel}`
      ) */
      throw new Error(`Receive failed: Unknown ipc channel name: ${channel}`)
    }
  },
  invoke: async (channel: string, ...data: any[]): Promise<any> => {
    if (mainAvailChannels.includes(channel)) {
      const result = await ipcRenderer.invoke.apply(null, [channel, ...data])
      return result
    }
    /* Constants.logErrorObject.appendErrorLogAndAppNotification(
      `Invoke failed: Unknown ipc channel name: ${channel}`
    ) */
    throw new Error(`Invoke failed: Unknown ipc channel name: ${channel}`)
  }
})
