export const loadsFilterData = {
  filterControls: {
    showFilter: 'Show Loads Filter',
    hideFilter: 'Hide Loads Filter',
    clearFilter: 'Clear Loads Filter'
  },
  id: {
    min: null,
    disabled: false,
    required: false,
    rowClasses: '',
    isRow: true,
    classes: 'col-md-6 mb-1 mb-md-0',
    label: 'ID',
    property: 'id',
    labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
    inputClasses: 'col-8 col-md-12 px-0 pr-sm-3',
    validPattern: '[a-zA-Z_]+',
    placeHolder: 'Filter by ID, case insensitive'
  },
  formed: {
    disabled: false,
    required: false,
    foldable: true,
    classes: 'col-md-6',
    label: 'Formed',
    property: 'formedAfter,formedBefore',
    propertyStart: 'formedAfter',
    propertyEnd: 'formedBefore',
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
      rowClasses: '',
      label: 'From',
      property: 'fromDepartment',
      labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
      inputClasses: 'col-8 col-md-12 px-0 pr-md-3',
      stackId: 'departments'
    },
    {
      disabled: false,
      required: false,
      classes: 'col-md-3 mb-1 mb-md-0',
      rowClasses: '',
      label: 'To',
      property: 'toDepartment',
      labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
      inputClasses: 'col-8 col-md-12 px-0 pr-md-3',
      stackId: 'departments'
    },
    {
      disabled: false,
      required: false,
      classes: 'col-md-3 mb-1 mb-md-0',
      rowClasses: '',
      label: 'Service',
      property: 'service',
      labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
      inputClasses: 'col-8 col-md-12 px-0 pr-md-3',
      stackId: 'services'
    },
    {
      disabled: false,
      required: false,
      classes: 'col-md-3 mb-1 mb-md-0',
      rowClasses: '',
      label: 'Packaging',
      property: 'packaging',
      labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
      inputClasses: 'col-8 col-md-12 px-0',
      stackId: 'packagings'
    }
  ]
}
