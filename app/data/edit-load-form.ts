export const editLoadFormData = {
  static: {
    edit: {
      header: 'Edit load ID: ',
      errMessage: ['Load ID: ', ' not found in DB'],
      bttnSubmit: 'Edit Load'
    },
    new: {
      header: 'Create new load',
      bttnSubmit: 'Create Load'
    }
  },
  status: {
    disabled: false,
    required: true,
    classes: 'col-md-6 mb-sm-3',
    rowClasses: 'mr-md-0',
    label: 'Status',
    property: 'status',
    labelClasses: '',
    inputClasses: '',
    stackId: 'statuses'
  },
  selects: [
    [
      {
        disabled: false,
        required: true,
        classes: 'col-md-6 mb-sm-3',
        rowClasses: 'mr-md-0',
        label: 'From',
        property: 'fromDepartment',
        labelClasses: '',
        inputClasses: '',
        stackId: 'departments'
      },
      {
        disabled: false,
        required: true,
        classes: 'col-md-6 mb-sm-3',
        rowClasses: '',
        label: 'To',
        property: 'toDepartment',
        labelClasses: '',
        inputClasses: '',
        stackId: 'departments'
      }
    ],
    [
      {
        disabled: false,
        required: true,
        classes: 'col-md-6 mb-sm-3',
        rowClasses: 'mr-md-0',
        label: 'Service',
        property: 'service',
        labelClasses: '',
        inputClasses: '',
        stackId: 'services'
      },
      {
        disabled: false,
        required: true,
        classes: 'col-md-6 mb-sm-3',
        rowClasses: '',
        label: 'Packaging',
        property: 'packaging',
        labelClasses: '',
        inputClasses: '',
        stackId: 'packagings'
      }
    ]
  ],
  inputs: [
    {
      classes: 'col-sm-2 mb-sm-3',
      label: 'Length',
      property: 'length',
      disabled: false,
      required: true,
      min: 0.1,
      validPattern: '[0-9]*(?:\.[0-9])?',
      rowClasses: 'mr-sm-0',
      isRow: false,
      labelClasses: '',
      inputClasses: '',
      placeHolder: 'n...n.n, %units%;;;length'
    },
    {
      classes: 'col-sm-2 mb-sm-3',
      label: 'Width',
      property: 'width',
      disabled: false,
      required: true,
      min: 0.1,
      validPattern: '[0-9]*(?:\.[0-9])?',
      rowClasses: 'mr-sm-0',
      isRow: false,
      labelClasses: '',
      inputClasses: '',
      placeHolder: 'n...n.n, %units%;;;length'
    },
    {
      classes: 'col-sm-2 mb-sm-3',
      label: 'Height',
      property: 'height',
      disabled: false,
      required: true,
      min: 0.1,
      validPattern: '[0-9]*(?:\.[0-9])?',
      rowClasses: 'mr-sm-0',
      isRow: false,
      labelClasses: '',
      inputClasses: '',
      placeHolder: 'n...n.n, %units%;;;length'
    },
    {
      classes: 'col-sm-3 mb-sm-3',
      label: 'Weight',
      property: 'weight',
      disabled: false,
      required: true,
      min: 0.1,
      validPattern: '[0-9]*(?:\.[0-9])?',
      rowClasses: 'mr-sm-0',
      isRow: false,
      labelClasses: '',
      inputClasses: '',
      placeHolder: 'n...n.n, %units%;;;weight'
    },
    {
      classes: 'col-sm-3 mb-sm-3',
      label: 'Declared Cost',
      property: 'declaredCost',
      disabled: false,
      required: false,
      min: 0.01,
      validPattern: '[0-9]*(?:\.[0-9][0-9])?',
      rowClasses: '',
      isRow: false,
      labelClasses: '',
      inputClasses: '',
      placeHolder: 'n...n.nn, USD'
    }
  ]
}
