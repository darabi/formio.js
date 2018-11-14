import $ from 'jquery';
import _ from 'lodash';

window.jQuery = $;
window.$ = $;
import 'bootstrap/js/dist/modal';
import treeview from './bootstrap-treeview';
import Formio from '../../Formio';
import SelectComponent from '../select/Select';
import TagsComponent from '../tags/Tags';

export default class ResourceTreeComponent extends TagsComponent {
  static schema(...extend) {
    return SelectComponent.schema({
      type: 'resourcetree',
      label: 'Resource tree',
      key: 'resourcetree',
      dataSrc: 'resource',
      resource: '',
      project: '',
      template: '<span>{{ item.data }}</span>'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Resource tree',
      group: 'advanced',
      icon: 'fa fa-sitemap',
      weight: 90,
      documentation: 'http://help.form.io/userguide/#resourcetree',
      schema: ResourceTreeComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.component.dataSrc = 'resource';
    this.component.data = {
      resource: this.component.resource
    };
    this.treeRedrawn = false;
    this.treeNodeIds = {};
  }

  get defaultSchema() {
    return ResourceTreeComponent.schema();
  }

  getValue() {
    if (this.choices) {
      const result = [];
      this.choices.getValue().map(v => {
        result.push(v.value);
      });
      return result;
    }
    return null;
  }

  /**
   * Creates a new button to show the tree in a modal dialog, when
   * inlineTree is false.
   * @returns {HTMLElement} - The "+" button html element
   */
  addButton(tree) {
    const addButton = this.ce('button', {
      class: 'btn btn-primary'
    });
    const addIcon = this.ce('i', {
      class: this.iconClass('plus')
    });
    addButton.appendChild(addIcon);

    this.addEventListener(addButton, 'click', (event) => {
      event.preventDefault();
      tree.hidden = false;
      const dialog = this.createModal(this.component.selectDialogTitle || 'Select');
      dialog.body.appendChild(tree);
      this.addEventListener(dialog, 'close', () => {
        console.log('Selection dialog closed');
      });
    });

    return addButton;
  }

  addInput(input, container) {
    const div = this.ce('div', {
      id: `${this.component.id}-div`,
      class: 'resource-tree'
    });
    const template = `
      <div id="${this.component.id}-tags">
      </div>
      <div id="${this.component.id}-tree">
      </div>
    `;
    container.appendChild(div);
    div.innerHTML = template;
    // call super to add the Choices element
    super.addInput(input, div.querySelector(`#${this.component.id}-tags`));
    // and then add an event listener for removal of choices

    input.addEventListener('removeItem', event => this.onRemoveTag(event), false);

    // super.disabled = true;
    this.createTree().then(() => {
      if (!this.component.inlineTree) {
        const tree = div.querySelector(`#${this.component.id}-tree`);
        tree.setAttribute('hidden', true);
        if (!this.tree) {
          this.tree = tree.parentNode.removeChild(tree);
        }
        const tags = div.querySelector(`#${this.component.id}-tags`);
        tags.appendChild(this.addButton(this.tree));
      }
    });
  }

  createTree() {
    var jqinit = $(`#${this.component.id}-tree`);
    if (!jqinit) {
      console.warn('Cannot find tree element with id {}-tree on page', this.component.id);
      return;
    }
    if (jqinit.treeview === undefined) {
      jqinit.treeview = treeview;
    }
    return this.getTree().then((res, err) => {
      if (err) {
        // FIXME: correctly report errors
        console.warn('Error retrieving the tree nodes {}', err);
      }
      this.treeView = $(`#${this.component.id}-tree`).treeview({
        data: res && (!err) ? res : [],
        showCheckbox: true,
        multiSelect: false,
        selectable: false,
        onNodeChecked: (event, data) => {
          this.nodeChecked(data);
        },
        onNodeUnchecked: (event, data) => {
          this.nodeUnchecked(data);
        }
      });
      if (!this.treeRedrawn) {
        this.treeRedrawn = true;
        this.triggerRedraw();
      }
      return Promise.resolve();
    });
  }

  nodeChecked(node) {
    const item = node._originalItem;
    const newVal = {
      value: item,
      label: _.get(item, this.component.titleAttribute),
      id: _.get(item, this.component.idAttribute),
      customProperties: node
    };

    // we need this in removeItem callback to deselect nodes
    this.treeNodeIds[newVal.id] = node.nodeId;

    const currentVal = this.choices.getValue(false);
    console.log('currentVal is {}', currentVal);
    if (currentVal.length === 0) {
      super.setValue(newVal);
    }
    else {
      // we need to distinguish between the removal which follows now and removal by the user
      this.programmaticallyRemovingItems = true;
      super.setValue([...currentVal, newVal]);
      this.programmaticallyRemovingItems = false;
    }
  }

  nodeUnchecked(node) {
    const item = node._originalItem;
    let val = null;
    this.choices.getValue(false).map(v => {
      if (v.value[this.component.idAttribute] === item[this.component.idAttribute]) {
        val = v.value;
      }
    });
    if (val) {
      this.choices.removeItemsByValue(val);
    }
  }

  prepareTreeAttributes(response) {
    if (!response) {
      return [];
    }
    if (Array.isArray(response)) {
      const result = [];
      response.forEach((v) => {
        result.push(this.prepareTreeAttributes(v));
      });
      return result;
    }
    const newNode = { _originalItem: response };
    newNode.id = _.get(response, this.component.idAttribute);
    newNode.text = _.get(response, this.component.titleAttribute);
    const children = _.get(response, this.component.childrenAttribute);
    if (children) {
      newNode.nodes = this.prepareTreeAttributes(children);
    }
    return newNode;
  }

  getTree() {
    if (this.component.url && this.component.url.trim() !== '') {
      return Formio.makeStaticRequest(this.component.url, 'GET').then((res, err) => {
        if (!res || err) {
          return [];
        }
        return this.handleTreeResponse(res);
      });
    }
    else {
      return Promise.resolve([]);
    }
  }

  handleTreeResponse(res) {
    if (!this.component.showRootNode) {
      const children = _.get(res, this.component.childrenAttribute);
      if (children) {
        res = children;
      }
      else {
        res = [];
      }
    }
    else {
      res = [res];
    }
    return this.prepareTreeAttributes(res);
  }

  onRemoveTag(event) {
    if (this.programmaticallyRemovingItems) {
      console.log('removeItem called while removing programmatically');
      return;
    }
    if (!(event.detail.value && event.detail.value._id)) {
      return;
    }
    const id = event.detail.value._id;
    const treeNodeId = this.treeNodeIds[id];
    if (treeNodeId) {
      $(`#${this.component.id}-tree`).treeview(true).uncheckNode(treeNodeId, { silent: true });
    }
  }
}

