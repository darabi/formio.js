export default [
  {
    weight: 0,
    input: true,
    inputType: 'text',
    label: 'JSON URL',
    key: 'url',
    type: 'textfield',
    description: 'The URL which provides a root JSON object for the tree.',
    tooltip: 'The server-side URL of a JSON tree, i.e. a JSON object with at least an id, a title and a children attribute',
  },
  {
    weight: 0,
    input: true,
    inputType: 'text',
    label: 'ID Attribute',
    description: 'The object ID property path',
    tooltip: 'The property path (possibly with a ".") within each JSON object which should be treated as the object ID.',
    key: 'idAttribute',
    type: 'textfield',
    validate: {
      required: true,
    }
  },
  {
    weight: 0,
    input: true,
    inputType: 'text',
    label: 'Title Attribute',
    description: 'The object title property path, to be shown as the visible label of each tree node',
    tooltip: 'The property path (possibly with a ".") within each JSON object which should be treated as the title.',
    key: 'titleAttribute',
    type: 'textfield',
    validate: {
      required: true,
    }
  },
  {
    weight: 0,
    input: true,
    inputType: 'text',
    label: 'Children Attribute',
    description: 'The children property path which contains an array of children objects, the next level of the tree',
    tooltip: 'The property path (possibly with a ".") within each JSON object which should be treated as the children of the current node',
    key: 'childrenAttribute',
    type: 'textfield',
    validate: {
      required: true,
    }
  },
  {
    weight: 0,
    type: 'checkbox',
    label: 'Show root node',
    tooltip: 'If checked, the retrieved root node is shown in the selection, otherwise only its children are shown.',
    key: 'showRootNode',
    input: true
  },
  {
    weight: 0,
    type: 'checkbox',
    label: 'Select root nodes',
    defaultValue: false,
    tooltip: 'If checked, the default is a fully checked tree for the case recursiveSelect == true, if !recursiveSelect, only the first level is checked.',
    key: 'checkRootNodes',
    input: true
  },
  {
    weight: 0,
    type: 'checkbox',
    label: 'Hide choices',
    defaultValue: false,
    tooltip: 'If checked, the text field showing the selected choices is hidden and only the tree shows them.',
    key: 'hideChoices',
    input: true
  },
  {
    weight: 0,
    type: 'checkbox',
    label: 'Recursive children selection',
    defaultValue: true,
    tooltip: 'If checked, a change of selection recursively toggles the checkboxes in the visible children subtree.',
    key: 'recursiveSelect',
    input: true
  },
  {
    type: 'number',
    input: true,
    key: 'expandLevel',
    label: 'Expand tree',
    defaultValue: 0,
    weight: 18,
    description: 'Enter -1 if you want the tree to appear fully expanded, 0 when only the top node(s) should be shown, and increase by one for each additional level to be expanded.',
    tooltip: 'Use this to have the tree expanded when it is shown.',
  },
  {
    weight: 0,
    type: 'checkbox',
    label: 'Inline tree',
    tooltip: 'If checked, tree is shown in the form itself, otherwise a button opens a modal dialog showing the tree.',
    key: 'inlineTree',
    input: true
  },
  {
    weight: 0,
    type: 'textfield',
    label: 'Select Dialog Title',
    tooltip: 'When inlineTree is true, the value of this field is shown as the title of the modal dialog showing the tree.',
    key: 'selectDialogTitle',
    input: true
  },
  {
    weight: 0,
    type: 'textfield',
    label: 'Dialog button CSS class',
    tooltip: 'When inlineTree is false, the value of this field is used as the CSS class of the button which shows the tree.',
    key: 'dialogButtonCss',
    defaultValue: 'fa fa-pencil-square-o',
    input: true
  },
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
  },
  {
    weight: 55,
    type: 'number',
    input: true,
    key: 'maxSelections',
    label: 'Max Selections',
    defaultValue: 0,
    tooltip: 'The maximum number of elements that can be selected. 0 for infinity.'
  },

];
