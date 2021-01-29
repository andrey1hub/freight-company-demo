export const settingsForm = {
  static: {
    header: 'Settings:',
    successSavedMsg: 'Settings are saved',
    successSetupMsg: 'Settings have been set up',
    firstRunMsg: ['Please, set up your department and units system to start using this software!', 'You will not be able to change your choice until you reset database.'],
    bttnSet: 'Set',
    bttnSave: 'Save'
  },
  groupLoads: {
    label: 'Loads',
    checkboxes: [
      {
        disabled: true,
        required: false,
        classes: 'col-6',
        rowClasses: 'mr-0',
        label: 'Navigate by buttons',
        property: 'loadsNavButtons'
      },
      {
        disabled: true,
        required: false,
        classes: 'col-6',
        rowClasses: 'ml-0',
        label: 'Navigate by hotkeys',
        property: 'loadsNavHotkeys'
      }
    ]
  },
  groupLoadsFilter: {
    label: 'Loads Filter',
    checkboxes: [
      {
        disabled: false,
        required: false,
        classes: 'col-6 col-md-3',
        rowClasses: 'mr-0 pt-2 mb-3 mb-md-0',
        label: 'Open initially',
        property: 'showLoadsFilter'
      },
      {
        disabled: false,
        required: false,
        classes: 'col-6 col-md-3',
        rowClasses: 'ml-0 ml-md-n3 mr-md-0 pt-2 mb-3 mb-md-0',
        label: 'Remember query',
        property: 'keepFilterQuery'
      },
      {
        disabled: true,
        required: false,
        classes: 'col-6 col-md-3',
        rowClasses: 'mr-0 mr-md-n3 ml-md-0 pt-2',
        label: 'Query history',
        property: 'keepFilterHistory'
      }
    ],
    historySizePicker: {
      disabled: true,
      required: false,
      property: 'filterHistorySize',
      classes: 'col-6 col-md-3',
      rowClasses: 'ml-0',
      labelClasses: 'col-7 col-sm-8 pl-0 pt-2',
      inputClasses: 'col-5 col-sm-4 px-0',
      label: 'History size',
      min: 1,
      max: 100
    }
  },
  selects: [
    {
      disabled: false,
      required: true,
      classes: 'col-sm-6 mb-3',
      rowClasses: 'mr-sm-0 mr-md-n3',
      label: 'Current department',
      property: 'currentDepartment',
      labelClasses: 'col-5 col-sm-12 col-md-5 px-0 pt-2',
      inputClasses: 'col-7 col-sm-12 col-md-7 px-0 px-md-3',
      stackId: 'departments'
    },
    {
      disabled: false,
      required: false,
      classes: 'col-sm-6 mb-3',
      rowClasses: 'ml-sm-0 ml-md-n3',
      label: 'Units system',
      property: 'unitsSystem',
      labelClasses: 'col-5 col-sm-12 col-md-5 px-0 pl-md-3 pt-2',
      inputClasses: 'col-7 col-sm-12 col-md-7 px-0',
      stackId: 'unitsSystems'
    }
  ]
}
