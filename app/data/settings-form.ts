export const settingsForm = {
  static: {
    header: 'Settings:',
    successMessage: 'Settings are saved',
    bttnSubmit: 'Save'
  },
  selects: [
    {
      disabled: false,
      required: true,
      classes: 'col-sm-6 mb-3',
      rowClasses: 'mr-sm-0 mr-md-n3',
      label: 'Current Department',
      property: 'currentDepartment',
      labelClasses: 'col-5 col-sm-12 col-md-5 px-0 pt-2',
      inputClasses: 'col-7 col-sm-12 col-md-7 px-0 px-md-3',
      stackId: 'departments'
    },
    {
      disabled: true,
      required: false,
      classes: 'col-sm-6 mb-3',
      rowClasses: 'ml-sm-0 ml-md-n3',
      label: 'Units System',
      property: 'unitsSystem',
      labelClasses: 'col-5 col-sm-12 col-md-5 px-0 pl-md-3 pt-2',
      inputClasses: 'col-7 col-sm-12 col-md-7 px-0',
      stackId: 'unitsSystems'
    }
  ],
  checkboxes: [
    {
      disabled: false,
      classes: 'col-6 col-md-3 mb-3',
      rowClasses: 'mr-0',
      label: 'Loads filter open initially',
      property: 'showLoadsFilter'
    },
    {
      disabled: true,
      classes: 'col-6 col-md-3 mb-3',
      rowClasses: 'ml-0',
      label: 'Remember Loads filter query',
      property: 'keepFilterQuery'
    },
    {
      disabled: true,
      classes: 'col-6 col-md-3 mb-3',
      rowClasses: 'mr-0',
      label: 'Navigate Loads by buttons',
      property: 'loadsNavButtons'
    },
    {
      disabled: true,
      classes: 'col-6 col-md-3 mb-3',
      rowClasses: 'ml-0',
      label: 'Use hotkeys for buttons',
      property: 'buttonsHotkeys'
    }
  ]
}
