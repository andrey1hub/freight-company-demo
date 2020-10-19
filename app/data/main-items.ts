export const mainItemsData = {
  static: [
    [
      {
        classes: 'col-sm-6',
        label: 'Department',
        supSign: '',
        units: '',
        valueId: 'currentDepartment',
        hasTitle: true
      },
      {
        classes: 'col-sm-6',
        label: 'Loads count',
        supSign: '',
        units: '',
        valueId: 'totalInStorage',
        hasTitle: false
      }
    ],
    [
      {
        classes: 'col-sm-6 mb-sm-2',
        label: 'Loads weight',
        supSign: '',
        units: 'kg',
        valueId: 'totalWeight',
        hasTitle: false
      },
      {
        classes: 'col-sm-6 mb-1 mb-sm-2',
        label: 'Loads volume',
        supSign: '3',
        units: 'm',
        valueId: 'totalVolume',
        hasTitle: false
      }
    ]
  ],
  selectable: [
    {
      label: 'Count by department',
      valuesId: 'totalByDepartment',
      optionsId: 'departments'
    },
    {
      label: 'Count by service',
      valuesId: 'totalByService',
      optionsId: 'services'
    },
    {
      label: 'Count by packaging',
      valuesId: 'totalByPackaging',
      optionsId: 'packagings'
    }
  ]
}
