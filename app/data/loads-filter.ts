export const loadsFilterData = {
  filterControls: {
    showFilter: 'Show Loads Filter',
    hideFilter: 'Hide Loads Filter',
    clearFilter: 'Clear Loads Filter'
  },
  id: {
    clearable: true,
    min: null,
    disabled: false,
    required: false,
    rowClasses: '',
    isRow: true,
    classes: 'col-sm-6 col-md-2 mb-1 mb-md-0',
    label: 'ID',
    property: 'id',
    labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
    inputClasses: 'col-8 col-md-12 px-0 pr-3',
    validPattern: '[a-zA-Z_]+',
    placeHolder: 'Filter by ID, case insensitive'
  },
  formed: {
    clearable: true,
    disabled: false,
    required: false,
    foldable: true,
    classes: 'col-sm-6 col-md-2 mb-1 mb-md-0',
    label: 'Formed',
    property: 'formedAfter,formedBefore',
    labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
    inputClasses: 'col-8 col-md-12 px-0 pr-3',
    inputStartClasses: 'col-6 float-left pl-0 app-pr-05',
    inputEndClasses: 'col-6 float-left app-pl-05 pr-0',
    placeHolderStart: 'After Date',
    placeHolderEnd: 'Before Date'
  },
  selects: [
    {
      clearable: true,
      disabled: false,
      required: false,
      classes: 'col-sm-6 col-md-2 mb-1 mb-md-0',
      rowClasses: '',
      label: 'From',
      property: 'fromDepartment',
      labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
      inputClasses: 'col-8 col-md-12 px-0 pr-3',
      stackId: 'departments'
    },
    {
      clearable: true,
      disabled: false,
      required: false,
      classes: 'col-sm-6 col-md-2 mb-1 mb-md-0',
      rowClasses: '',
      label: 'To',
      property: 'toDepartment',
      labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
      inputClasses: 'col-8 col-md-12 px-0 pr-3',
      stackId: 'departments'
    },
    {
      clearable: true,
      disabled: false,
      required: false,
      classes: 'col-sm-6 col-md-2 mb-1 mb-md-0',
      rowClasses: '',
      label: 'Service',
      property: 'service',
      labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
      inputClasses: 'col-8 col-md-12 px-0 pr-3',
      stackId: 'services'
    },
    {
      clearable: true,
      disabled: false,
      required: false,
      classes: 'col-sm-6 col-md-2 mb-1 mb-md-0',
      rowClasses: '',
      label: 'Packaging',
      property: 'packaging',
      labelClasses: 'col-4 col-md-12 px-0 pt-2 d-md-none',
      inputClasses: 'col-8 col-md-12 px-0 pr-3',
      stackId: 'packagings'
    }
  ]
}
