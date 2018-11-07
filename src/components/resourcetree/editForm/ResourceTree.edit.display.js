export default [
  {
    label: 'Resource',
    key: 'resource',
    type: 'select',
    input: false,
    dataSrc: 'url',
    data: {
      url: '/form?type=resource&limit=4294967295'
    },
    template: '<span>{{ item.title }}</span>',
    validate: {
      custom: 'tabs = _.filter(form.components, {key: "tabs"})[0].components; display = _.filter(tabs, {key: "display"})[0].components; children = _.filter(display, {key: "childrenField"})[0]; children.data.url = "/form/" + data.resource + "/components" ; valid = true'
    },
    valueProperty: '_id',
    weight: 50,
    tooltip: 'The resource to be used with this field.'
  },
  {
    label: 'Children field',
    key: 'childrenField',
    type: 'select',
    dataSrc: 'url',
    data: {
      url: '/form/'
    },
    template: '<span>{{ item.key }}</span>',
    valueProperty: 'key',
    weight: 51,
    tooltip: 'The field of the resource which contains an array of child resources in the hierarchy.',
    mask: false,
    tableView: true,
    input: true,
    refreshOn: 'resource'
  },
  {
    type: 'tags',
    input: true,
    key: 'selectFields',
    label: 'Select Fields',
    tooltip: 'The properties on the resource to return as part of the options. If left blank, all properties will be returned.',
    placeholder: 'Enter the fields to select.',
    weight: 52
  },
  {
    type: 'tags',
    input: true,
    key: 'searchFields',
    label: 'Search Fields',
    tooltip: 'A list of search filters based on the fields of the resource. See the <a target=\'_blank\' href=\'https://github.com/travist/resourcejs#filtering-the-results\'>ResourceTree.js documentation</a> for the format of these filters.',
    placeholder: 'The fields to query on the server',
    weight: 53
  },
  {
    type: 'textarea',
    input: true,
    key: 'template',
    label: 'Item Template',
    editor: 'ace',
    as: 'html',
    rows: 3,
    weight: 54,
    tooltip: 'The HTML template for the result data items.'
  }
];
