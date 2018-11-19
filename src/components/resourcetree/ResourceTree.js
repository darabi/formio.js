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
  addButton(treeDiv) {
    const buttonDiv = this.ce('div', {
      class: 'resource-tree-button'
    });
    const button = this.ce('button', {
      class: 'btn btn-primary'
    });
    buttonDiv.appendChild(button);
    // TODO: make the icon configurable?
    const icon = this.ce('i', {
      class: 'fa fa-pencil-square-o'
    });
    button.appendChild(icon);

    this.addEventListener(button, 'click', (event) => {
      event.preventDefault();
      const dialog = this.createModal(this.component.selectDialogTitle || 'Select');
      if (treeDiv) {
        if (treeDiv.parentNode) {
          this.removeChildFrom(treeDiv, treeDiv.parentNode);
        }
        treeDiv.hidden = false;
        dialog.body.appendChild(treeDiv);
      }
      this.addEventListener(dialog, 'close', () => {
        treeDiv.hidden = true;
        document.body.appendChild(treeDiv);
      });
    });

    return buttonDiv;
  }

  addInput(input, container) {
    const div = this.ce('div', {
      id: `${this.component.id}-div`,
      class: 'resource-tree'
    });
    const template = `<div id="${this.component.id}-tags"></div>`;
    container.appendChild(div);
    div.innerHTML = template;
    // call super to add the Choices element
    super.addInput(input, div.querySelector(`#${this.component.id}-tags`));
    // and then add an event listener for removal of choices
    input.addEventListener('removeItem', event => this.onRemoveTag(event), false);

    this.appendTreeTo(div)
      .then((treeDiv, err) => {
        if (!this.component.inlineTree) {
          this.removeChildFrom(treeDiv, div);
          const tags = div.querySelector(`#${this.component.id}-tags`);
          tags.appendChild(this.addButton(treeDiv));
        }
      });
  }

  async appendTreeTo(element) {
    const treeDiv = this.ce('div', {
      id: `${this.component.id}-tree`,
      class: 'resourcetree-tree'
    });
    element.appendChild(treeDiv);
    return this.createTree(`#${this.component.id}-tree`)
      .then(
        () => treeDiv,
        (err) => {
          throw (err);
        });
  }

  async createTree(elementId) {
    // a hack to overcome cases where the initialisation of the bootstrap-treeview plugin wasn't successful
    this.addJqueryTreeview(elementId);
    const data = await this.getTree();
    this.treeView = $(elementId).treeview({
      data: data,
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
  }

  addJqueryTreeview(elementId) {
    var jqinit = $(elementId);
    if (!jqinit) {
      console.warn('Cannot find tree element with id {} on page', elementId);
      return false;
    }
    if (jqinit.treeview === undefined) {
      jqinit.treeview = treeview;
    }
    return true;
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

    const choiceValues = this.choices.getValue(false);
    const nodesToRemove = [];
    const tree = $(`#${this.component.id}-tree`).treeview(true);

    // temporarily set check to false (otherwise uncheckNodesAndMaybeSubtree would be more complicated)
    node.state.checked = false;
    // we have to collect the nodes which are already checked (we have to remove them from the choices)
    this.checkNodeAndMaybeSubtree(node, tree, [], nodesToRemove);
    node.state.checked = true;

    if (choiceValues.length === 0) {
      super.setValue(newVal);
    }
    else {
      // we need to distinguish between the removal which follows now and removal by the user
      // the latter is handled in onRemoveTag
      this.programmaticallyModifyingNodes = true;
      super.setValue([...this.removeNodesFromChoices(nodesToRemove, choiceValues), newVal]);
      this.programmaticallyModifyingNodes = false;
    }
  }

  nodeUnchecked(node) {
    const choiceValues = this.choices.getValue(false);
    const nodesToRemove = [node];
    const tree = $(`#${this.component.id}-tree`).treeview(true);

    // temporarily set check to true (otherwise uncheckNodesAndMaybeSubtree would be more complicated)
    node.state.checked = true;
    this.uncheckNodeAndMaybeSubtree(node, tree, nodesToRemove, []);
    node.state.checked = false;

    this.findNodesInChoices(nodesToRemove, choiceValues)
      .map(v => {
        this.programmaticallyModifyingNodes = true;
        this.choices.removeItemsByValue(v.value);
        this.programmaticallyModifyingNodes = false;
      });
  }

  findNodesInChoices(nodes, choiceValues) {
    if (!(nodes && Array.isArray(nodes) && choiceValues)) {
      return [];
    }
    const idAttr = this.component.idAttribute;
    const ids = nodes.map(n => n._originalItem[idAttr]);

    return choiceValues.filter(v => ids.indexOf(v.value[idAttr]) > -1);
  }

  removeNodesFromChoices(nodes, choiceValues) {
    if (!(nodes && Array.isArray(nodes) && choiceValues)) {
      return [];
    }
    const idAttr = this.component.idAttribute;
    const ids = nodes.map(n => n._originalItem[idAttr]);

    return choiceValues.filter(v => ids.indexOf(v.value[idAttr]) < 0);
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

  async getTree() {
    if (this.treeData) {
      return this.treeData;
    }
    if (this.component.url && this.component.url.trim() !== '') {
      const compUrl = this.component.url.trim();
      let finalUrl;
      const idx = compUrl.indexOf('http');
      if (idx === 0) {
        finalUrl = compUrl;
      }
      else {
        finalUrl = `${_.get(this.root, 'formio.projectUrl', Formio.getBaseUrl())}${compUrl}`;
      }
      return Formio.makeStaticRequest(finalUrl, 'GET').then((res, err) => {
        if (err) {
          console.warn('Cannot retrieve tree nodes from {}. Error: {}', finalUrl, err);
          return;
        }
        this.treeData = this.handleTreeResponse(res);
        return this.treeData;
      });
    }
    else {
      return [];
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
    if (this.programmaticallyModifyingNodes) {
      console.log('removeItem called while removing programmatically');
      return;
    }
    if (!(event.detail.value && event.detail.value._id)) {
      return;
    }
    const id = event.detail.value._id;
    const treeNodeId = this.treeNodeIds[id];
    if (treeNodeId !== undefined) {
      const tree = $(`#${this.component.id}-tree`).treeview(true);
      if (tree) {
        const node = tree.getNode(treeNodeId);
        this.uncheckNodeAndMaybeSubtree(node, tree, [], []);
      }
    }
  }

  uncheckNodeAndMaybeSubtree(node, tree, modifiedChildren, unmodifiedChildren) {
    if (node && node.state.checked === true) {
      tree.uncheckNode(node.nodeId, { silent: true });

      if (!this.component.recursiveSelect) {
        return;
      }
      // if recursiveSelect is true, walk the children
      if (node.nodes) {
        node.nodes.forEach(child => {
          if (child.state.checked === true) {
            modifiedChildren.push(child);
            this.uncheckNodeAndMaybeSubtree(child, tree, modifiedChildren, unmodifiedChildren);
          }
          else {
            unmodifiedChildren.push(child);
          }
        });
      }
    }
  }

  checkNodeAndMaybeSubtree(node, tree, modifiedChildren, unmodifiedChildren) {
    if (node && node.state.checked === false) {
      tree.checkNode(node.nodeId, { silent: true });

      if (!this.component.recursiveSelect) {
        return;
      }
      // if recursiveSelect is true, walk the children
      if (node.nodes) {
        node.nodes.forEach(child => {
          if (child.state.checked === false) {
            modifiedChildren.push(child);
            this.checkNodeAndMaybeSubtree(child, tree, modifiedChildren, unmodifiedChildren);
          }
          else {
            unmodifiedChildren.push(child);
          }
        });
      }
    }
  }
}

