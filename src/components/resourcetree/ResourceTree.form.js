import baseEditForm from '../base/Base.form';

import ResourceTreeEditDisplay from './editForm/ResourceTree.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: ResourceTreeEditDisplay
    }
  ], ...extend);
}
