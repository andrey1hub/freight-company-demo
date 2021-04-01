export const appData = {
  appName: 'Freight Company Demo',
  appVersion: 'v1.10.0',
  units: {
    cmkg: {
      length: 'cm',
      volume: 'm',
      weight: 'kg'
    },
    inlb: {
      length: 'in',
      volume: 'in',
      weight: 'lb'
    }
  },
  load: {
    header: ['Load ID: ', ' not found in DB'],
    formed: 'Formed ',
    status: 'Status:',
    cost: 'Declared cost:',
    from: 'From:',
    to: 'To:',
    service: 'Service:',
    packaging: 'Packaging:',
    dimesions: 'Dimesions:',
    weight: 'Weight:',
    bttnEdit: 'Edit',
    bttnDelete: 'Delete',
    confirmHeader: 'Confirm delete of load',
    confirmText: ['Are you sure you want to delete this load?'],
    confirmCancel: 'Cancel',
    confirmDelete: 'Delete'
  },
  loadsList: {
    header: 'Loads',
    id: 'ID:',
    formed: 'Formed:',
    from: 'From:',
    to: 'To:',
    service: 'Service:',
    packaging: 'Packaging:'
  },
  system: {
    header: 'System',
    menu: 'System Menu',
    firstRunText: ['Welcome to ', 'This software uses local storage as a database. Consider this if you are going to use ', ' for managing big amount of data.', 'It does not have backend and server, all computing goes in your browser.']
  },
  systemDb: {
    header: 'Export/Import DB:',
    bttnExport: 'Export',
    bttnImport: 'Import',
    labelImport: 'Choose file',
    exportErrorMsg: 'Error while exporting DB.',
    importErrorMsg: 'Error while importing DB.',
    importSuccessMsg: 'DB imported successfully.',
    dbRevisionMsg: 'Acceptable DB revision: ',
    labelReset: 'Reset DB:',
    bttnReset: 'Reset',
    resetConfirmHeader: 'Confirm reset of DB',
    resetConfirmText: ['Are you sure you want to reset DB?', 'This action will clear all tables of the DB.', 'It is HIGHLY RECOMMENDED to back up (export) DB before doing this.'],
    resetConfirmCancel: 'Cancel',
    resetConfirmOk: 'Reset'
  },
  loadsNav: {
    prevLabel: 'Previous Load',
    nextLabel: 'Next Load'
  }
}
