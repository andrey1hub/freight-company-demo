export const loadsgenForm = {
  formedSpanDescription: ['Default span:', '30 days before current or end (if set) date'],
  formedSpan: {
    foldable: false,
    classes: 'col-md-12',
    label: 'Formed Span',
    labelStartSuffix: 'Start',
    labelEndSuffix: 'End',
    labelClasses: 'col-4 col-sm-3 col-md-2 px-0 pt-2',
    inputClasses: 'col-8 col-sm-9 col-md-10 px-0',
    inputStartClasses: 'col-sm-6 mb-1 mb-sm-0 px-0 pr-sm-2 float-sm-left',
    inputEndClasses: 'col-sm-6 px-0 pl-sm-1 float-sm-left',
    placeHolderStart: 'Start Date',
    placeHolderEnd: 'End Date'
  },
  inputs: [
    {
      classes: 'col-sm-6 mb-3 mb-sm-0',
      label: 'Quantity',
      disabled: false,
      required: false,
      min: 1,
      validPattern: '[0-9]+',
      marginReset: true,
      isRow: true,
      labelClasses: 'col-4 col-md-3 px-0 pt-2',
      inputClasses: 'col-8 col-md-9 px-0',
      placeHolder: 'Default: 100'
    },
    {
      classes: 'col-sm-6',
      label: 'Db Id Prefix',
      disabled: false,
      required: false,
      min: null,
      validPattern: '[a-zA-Z]+',
      marginReset: false,
      isRow: true,
      labelClasses: 'col-4 col-md-3 px-0 pt-2',
      inputClasses: 'col-8 col-md-9 px-0 pl-sm-2',
      placeHolder: 'Default: demo'
    }
  ]
}
