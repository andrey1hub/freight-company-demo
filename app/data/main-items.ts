export const mainItemsData = {
  static: {
    header: 'Database summary'
  },
  text: [
    [
      {
        classes: 'col-sm-6',
        label: 'Department',
        supSign: '',
        unitsType: '',
        valueId: 'currentDepartment',
        hasTitle: true
      },
      {
        classes: 'col-sm-6',
        label: 'Loads count',
        supSign: '',
        unitsType: '',
        valueId: 'totalInStorage',
        hasTitle: false
      }
    ],
    [
      {
        classes: 'col-sm-6 mb-sm-2',
        label: 'Loads weight',
        supSign: '',
        unitsType: 'weight',
        valueId: 'totalWeight',
        hasTitle: false
      },
      {
        classes: 'col-sm-6 mb-1 mb-sm-2',
        label: 'Loads volume',
        supSign: '3',
        unitsType: 'volume',
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
