export const loadsFilterData = {
  id: {
    min: null,
    disabled: false,
    required: false,
    marginReset: false,
    isRow: true,
    classes: 'col-md-6 mb-1 mb-md-0',
    label: 'ID',
    labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
    inputClasses: 'col-8 col-md-12 px-0 pr-sm-3',
    validPattern: '[a-zA-Z_]+',
    placeHolder: 'Filter by ID, case insensitive'
  },
  formed: {
    classes: 'col-md-6',
    label: 'Formed',
    labelStartSuffix: 'After',
    labelEndSuffix: 'Before',
    labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
    inputClasses: 'col-8 col-md-12 px-0 pr-sm-3',
    inputStartClasses: 'mb-1',
    inputEndClasses: 'mb-1 mb-md-0',
    placeHolderStart: 'After Date',
    placeHolderEnd: 'Before Date'
  },
  selects: [
    {
      disabled: false,
      required: false,
      classes: 'col-md-3 mb-1 mb-md-0',
      marginReset: '',
      label: 'From',
      labelSuffix: 'Department',
      labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
      inputClasses: 'col-8 col-md-12 px-0 pr-md-3',
      stackId: 'departments'
    },
    {
      disabled: false,
      required: false,
      classes: 'col-md-3 mb-1 mb-md-0',
      marginReset: '',
      label: 'To',
      labelSuffix: 'Department',
      labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
      inputClasses: 'col-8 col-md-12 px-0 pr-md-3',
      stackId: 'departments'
    },
    {
      disabled: false,
      required: false,
      classes: 'col-md-3 mb-1 mb-md-0',
      marginReset: '',
      label: 'Service',
      labelSuffix: '',
      labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
      inputClasses: 'col-8 col-md-12 px-0 pr-md-3',
      stackId: 'services'
    },
    {
      disabled: false,
      required: false,
      classes: 'col-md-3 mb-1 mb-md-0',
      marginReset: '',
      label: 'Packaging',
      labelSuffix: '',
      labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
      inputClasses: 'col-8 col-md-12 px-0',
      stackId: 'packagings'
    }
  ]
}
