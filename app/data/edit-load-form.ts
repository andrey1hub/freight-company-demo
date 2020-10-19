export const editLoadFormData = {
  status: {
    disabled: false,
    required: true,
    classes: 'col-md-6 mb-sm-3',
    marginReset: 'mr-md-0',
    label: 'Status',
    labelSuffix: '',
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
        marginReset: 'mr-md-0',
        label: 'From',
        labelSuffix: 'Department',
        labelClasses: '',
        inputClasses: '',
        stackId: 'departments'
      },
      {
        disabled: false,
        required: true,
        classes: 'col-md-6 mb-sm-3',
        marginReset: 'ml-md-0',
        label: 'To',
        labelSuffix: 'Department',
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
        marginReset: 'mr-md-0',
        label: 'Service',
        labelSuffix: '',
        labelClasses: '',
        inputClasses: '',
        stackId: 'services'
      },
      {
        disabled: false,
        required: true,
        classes: 'col-md-6 mb-sm-3',
        marginReset: 'ml-md-0',
        label: 'Packaging',
        labelSuffix: '',
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
      disabled: false,
      required: true,
      min: 0.1,
      validPattern: '[0-9]*(?:\.[0-9])?',
      marginReset: true,
      isRow: false,
      labelClasses: '',
      inputClasses: '',
      placeHolder: 'n...n.n, cm'
    },
    {
      classes: 'col-sm-2 mb-sm-3',
      label: 'Width',
      disabled: false,
      required: true,
      min: 0.1,
      validPattern: '[0-9]*(?:\.[0-9])?',
      marginReset: true,
      isRow: false,
      labelClasses: '',
      inputClasses: '',
      placeHolder: 'n...n.n, cm'
    },
    {
      classes: 'col-sm-2 mb-sm-3',
      label: 'Height',
      disabled: false,
      required: true,
      min: 0.1,
      validPattern: '[0-9]*(?:\.[0-9])?',
      marginReset: true,
      isRow: false,
      labelClasses: '',
      inputClasses: '',
      placeHolder: 'n...n.n, cm'
    },
    {
      classes: 'col-sm-3 mb-sm-3',
      label: 'Weight',
      disabled: false,
      required: true,
      min: 0.1,
      validPattern: '[0-9]*(?:\.[0-9])?',
      marginReset: true,
      isRow: false,
      labelClasses: '',
      inputClasses: '',
      placeHolder: 'n...n.n, kg'
    },
    {
      classes: 'col-sm-3 mb-sm-3',
      label: 'Declared Cost',
      disabled: false,
      required: false,
      min: 0.01,
      validPattern: '[0-9]*(?:\.[0-9][0-9])?',
      marginReset: false,
      isRow: false,
      labelClasses: '',
      inputClasses: '',
      placeHolder: 'n...n.nn, USD'
    }
  ]
}
