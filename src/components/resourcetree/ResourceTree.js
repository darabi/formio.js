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
  }

  get defaultSchema() {
    return ResourceTreeComponent.schema();
  }

  getValue() {
    if (this.data[this.component.key]) {
      return this.data[this.component.key];
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
    super.addInput(input, div.querySelector(`#${this.component.id}-tags`));
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
      $(`#${this.component.id}-tree`).treeview({
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
    const newVal = {
      value: node,
      label: _.get(node, this.component.titleAttribute),
      id: _.get(node, this.component.idAttribute)
    };
    super.setValue([...super.getValue(), newVal]);
    this.data[this.component.key] = [...this.data[this.component.key], node];
    this.choices.render();
  }

  nodeUnchecked(node) {
    console.log('Implement nodeUnchecked! {}', node);
  }

  prepareTreeAttributes(response) {
    if (!response || !Array.isArray(response)) {
      return;
    }
    response.map((val) => {
      if (Array.isArray(val)) {
        val.forEach((v) => {
          this.prepareTreeAttributes(v);
        });
      }
      // FIXME: if objects have a 'text' or 'nodes' attribute, they must be backed up here and restored upon selection
      if (val.hasOwnProperty('text')) {
        val._text = val.text;
      }
      if (val.hasOwnProperty('nodes')) {
        val._nodes = val.nodes;
      }
      val.text = _.get(val, this.component.titleAttribute);
      const children = _.get(val, this.component.childrenAttribute);
      if (children) {
        this.prepareTreeAttributes(children);
        val.nodes = children;
      }
    });
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
    this.prepareTreeAttributes(res);
    return res;
  }
}

