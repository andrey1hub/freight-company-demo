export const loadsgenForm = {
  static: {
    header: 'Loads Generator:',
    bttnSubmit: 'Generate',
    formedSpanDescription: ['Default span:', ' 30 days before current or end (if set) date']
  },
  formedSpan: {
    disabled: false,
    required: false,
    foldable: false,
    classes: 'col-md-12',
    label: 'Formed span',
    property: 'formedSpanStart,formedSpanEnd',
    propertyStart: 'formedSpanStart',
    propertyEnd: 'formedSpanEnd',
    labelClasses: 'col-4 col-sm-3 col-md-2 px-0 pt-2',
    inputClasses: 'col-8 col-sm-9 col-md-10 px-0',
    inputStartClasses: 'col-sm-6 mb-1 mb-sm-0 px-0 pr-sm-2 float-sm-left',
    inputEndClasses: 'col-sm-6 px-0 pl-sm-1 float-sm-left',
    placeHolderStart: 'Start Date',
    placeHolderEnd: 'End Date'
  },
  inputs: [
    {
      classes: 'col-sm-6 mb-3',
      label: 'Quantity',
      property: 'quantity',
      disabled: false,
      required: false,
      min: 1,
      validPattern: '[0-9]+',
      rowClasses: 'mr-sm-0',
      isRow: true,
      labelClasses: 'col-4 col-md-3 px-0 pt-2',
      inputClasses: 'col-8 col-md-9 px-0',
      placeHolder: 'Default: 100'
    },
    {
      classes: 'col-sm-6 mb-3',
      label: 'DB id prefix',
      property: 'dbIdPrefix',
      disabled: false,
      required: false,
      min: null,
      validPattern: '[a-zA-Z]+',
      rowClasses: '',
      isRow: true,
      labelClasses: 'col-4 col-md-3 px-0 pt-2',
      inputClasses: 'col-8 col-md-9 px-0 pl-sm-2',
      placeHolder: 'Default: demo'
    }
  ]
}
