import $ from 'jquery';
import _ from 'lodash';
import Choices from 'choices.js/assets/scripts/dist/choices.js';

window.jQuery = $;
window.$ = $;
import 'bootstrap/js/dist/modal';
import treeview from './bootstrap-treeview';
import Formio from '../../Formio';
import BaseComponent from '../base/Base';

export default class ResourceTreeComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'resourcetree',
      label: 'Resource tree',
      key: 'resourcetree',
      dataSrc: '',
      url: '',
      idAttribute: '',
      titleAttribute: '',
      childrenAttribute: '',
      showRootNode: true,
      checkRootNodes: false,
      hideChoices: false,
      recursiveSelect: false,
      expandLevel: 0,
      inlineTree: false,
      selectDialogTitle: 'Please select',
      dialogButtonCss: 'fa fa-pencil-square-o',
      resource: null,
      template: '<span>{{ item.data }}</span>',
      maxSelections: 0
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

  getView(data) {
    return this.asString(data);
  }

  asString(value) {
    return value
      .map(v => _.default.get(v, this.component.titleAttribute))
      .join(', ');
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

  setChoiceValue(value) {
    if (this.choices) {
      if (value && !_.isArray(value)) {
        value = [value];
      }
      this.choices.removeActiveItems();
      if (value) {
        this.choices.setValue(value);
      }
    }
  }

  setValue(value) {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      this.setChoiceValue([]);
      return false;
    }
    const tree = $(this.treeView).treeview(true);
    if (tree && tree.filterNodes) {
      const ids = value.map(v => _.get(v, this.component.idAttribute));
      const nodes = tree.filterNodes(n => ids.indexOf(n.id) > -1);
      // console.log(`ResourceTree.setValue nodes: ${JSON.stringify(nodes)}`);
      nodes.map(n => this.nodeChecked(n));
      if (nodes.length > 0) {
        return true;
      }
    }
    return false;
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
    const icon = this.ce('i', {
      class: this.component.dialogButtonCss
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
      class: 'resourcetree'
    });
    const template = `
      <div id="${this.component.id}-tags" class="resourcetree-tags">
      </div>
      <div id="${this.component.id}-button" class="resourcetree-button">
      </div>`;
    container.appendChild(div);
    div.innerHTML = template;
    const choicesDiv = div.querySelector(`#${this.component.id}-tags`);
    // call super to add the Choices element
    super.addInput(input, choicesDiv);
    this.choices = new Choices(input, {
      delimiter: (','),
      editItems: true,
      maxItemCount: this.component.maxSelections,
      removeItemButton: true,
    });
    // prevent user from clicking into the input (so she cannot enter text)
    if (this.choices.input) {
      this.choices.input.addEventListener('focus', e => {
        if (e.target === this.choices.input) {
          this.choices.input.blur();
        }
      });
    }
    this.choices.itemList.tabIndex = input.tabIndex;
    // and then add an event listener for removal of choices
    input.addEventListener('removeItem', event => this.onRemoveTag(event), false);
    if (this.component.hideChoices) {
      choicesDiv.hidden = true;
    }
    this.appendTreeTo(div)
      .then((treeDiv, err) => {
        if (err) {
          throw err;
        }
        if (!this.component.inlineTree) {
          this.removeChildFrom(treeDiv, div);
          const tags = div.querySelector(`#${this.component.id}-button`);
          tags.appendChild(this.addButton(treeDiv));
        }
        if (this.component.checkRootNodes) {
          const tree = $(this.treeView).treeview(true);
          const top1 = tree.getNode(0);
          if (top1) {
            this.nodeChecked(top1);
          }
          const siblings = tree.getSiblings(top1);
          if (siblings) {
            siblings.map(n => this.nodeChecked(n));
          }
        }
      });
    return input;
  }

  async appendTreeTo(element) {
    const treeDiv = this.ce('div', {
      id: `${this.component.id}-tree`,
      class: 'resourcetree-tree'
    });
    element.appendChild(treeDiv);
    await this.createTree(`#${this.component.id}-tree`);
    return treeDiv;
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

  nodeChecked(node, choiceValues = null, fireUpdate=true) {
    if (!this.choices) return;

    const currentValues = choiceValues ? choiceValues : this.choices.getValue(false);

    // is the node already in the choices?
    if (this.findNodesInChoices([node], currentValues).length > 0) {
      return;
    }
    const item = node._originalItem;
    const newVal = {
      value: item,
      label: _.get(item, this.component.titleAttribute),
      id: _.get(item, this.component.idAttribute),
      customProperties: node
    };

    // we need this in removeItem callback to deselect nodes
    this.treeNodeIds[newVal.id] = node.nodeId;

    const nodesToRemove = [];
    const tree = $(this.treeView).treeview(true);

    // temporarily set check to false (otherwise uncheckNodesAndMaybeSubtree would be more complicated)
    node.state.checked = false;
    // we have to collect the nodes which are already checked (we have to remove them from the choices)
    this.checkNodeAndMaybeSubtree(node, tree, [], nodesToRemove);
    node.state.checked = true;

    if (currentValues.length === 0) {
      this.setChoiceValue(newVal);
    }
    else {
      // we need to distinguish between the removal which follows now and removal by the user
      // the latter is handled in onRemoveTag
      this.programmaticallyModifyingNodes = true;
      this.setChoiceValue([...this.removeNodesFromChoices(nodesToRemove, currentValues), newVal]);
      this.programmaticallyModifyingNodes = false;
    }
    if (fireUpdate) {
      this.updateValue({ noUpdateEvent: false }, this.getValue());
    }
  }

  nodeUnchecked(node) {
    const choiceValues = this.choices.getValue(false);
    const nodesToRemove = [node];
    const nodesToAdd = [];
    const tree = $(`#${this.component.id}-tree`).treeview(true);

    const parent = tree.getParent(node);
    if (parent && parent.state.checked) {
      nodesToRemove.push(parent);
      tree.getSiblings(node).map(n => nodesToAdd.push(n));
      // console.log('checked parent node {}, nodesToAdd {}, nodesToRemove {}', parent, nodesToAdd, nodesToRemove);
    }
    // temporarily set check to true (otherwise uncheckNodesAndMaybeSubtree would be more complicated)
    node.state.checked = true;
    this.uncheckNodeAndMaybeSubtree(node, tree, nodesToRemove, []);
    node.state.checked = false;

    this.programmaticallyModifyingNodes = true;
    this.visitNodesInChoices(nodesToRemove, choiceValues, (treeNode,choiceVal) => {
        this.choices.removeItemsByValue(choiceVal.value);
        treeNode.state.checked = false;
      });
    this.programmaticallyModifyingNodes = false;
    nodesToAdd.map(n => this.nodeChecked(n, null, false));
    this.updateValue({ noUpdateEvent: false }, this.getValue());
  }

  findNodesInChoices(nodes, choiceValues) {
    if (!(nodes && Array.isArray(nodes) && choiceValues)) {
      return [];
    }
    const idAttr = this.component.idAttribute;
    const ids = nodes.map(n => n._originalItem[idAttr]);

    return choiceValues.filter(v => ids.indexOf(v.value[idAttr]) > -1);
  }

  /**
   * Calls func with two arguments: node, choiceValue for each node which is contained
   * in the choice element of this component.
   *
   * @param nodes
   * @param choiceValues
   * @param func
   * @returns {*}
   */
  visitNodesInChoices(nodes, choiceValues, func) {
    if (!(nodes && Array.isArray(nodes) && choiceValues)) {
      return;
    }
    const idAttr = this.component.idAttribute;
    const nodeMap = {};
    nodes.map(n => nodeMap[n._originalItem[idAttr]] = n);

    choiceValues.map(v => {
      const n = nodeMap[v.value[idAttr]];
      if (n) {
        func(n,v);
      }
    });
  }

  removeNodesFromChoices(nodes, choiceValues) {
    if (!(nodes && Array.isArray(nodes) && choiceValues)) {
      return [];
    }
    const idAttr = this.component.idAttribute;
    const ids = nodes.map(n => n._originalItem[idAttr]);

    return choiceValues.filter(v => ids.indexOf(v.value[idAttr]) < 0);
  }

  prepareTreeAttributes(response, level) {
    if (!response) {
      return [];
    }
    if (Array.isArray(response)) {
      const result = [];
      response.forEach((v) => {
        result.push(this.prepareTreeAttributes(v, level+1));
      });
      return result;
    }
    const newNode = { _originalItem: response };
    newNode.id = _.get(response, this.component.idAttribute);
    newNode.text = _.get(response, this.component.titleAttribute);
    newNode.selectable = false;
    newNode.state = {};
    if (this.component.expandLevel === -1) {
      newNode.state.expanded = true ;
    }
    else {
      if (this.component.expandLevel > level) {
        newNode.state.expanded = true;
      }
      else {
        newNode.state.expanded = false;
      }
    }
    if (this.component.checkRootNodes) {
      if (this.component.recursiveSelect) {
        newNode.state.checked = true;
      }
      else if (level === 0) {
        newNode.state.checked = true;
      }
    }
    const children = _.get(response, this.component.childrenAttribute);
    if (children) {
      newNode.nodes = this.prepareTreeAttributes(children, level+1);
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
    // we start with level -1 as res is always an array with the root node(s)
    return this.prepareTreeAttributes(res, -1);
  }

  onRemoveTag(event) {
    if (this.programmaticallyModifyingNodes) {
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
        this.updateValue({}, this.getValue());
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

