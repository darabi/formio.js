"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

var _jquery = _interopRequireDefault(require("jquery"));

var _lodash = _interopRequireDefault(require("lodash"));

var _choices = _interopRequireDefault(require("choices.js/assets/scripts/dist/choices.js"));

require("bootstrap/js/dist/modal");

var _bootstrapTreeview = _interopRequireDefault(require("./bootstrap-treeview"));

var _Formio = _interopRequireDefault(require("../../Formio"));

var _Base = _interopRequireDefault(require("../base/Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

window.jQuery = _jquery.default;
window.$ = _jquery.default;

var ResourceTreeComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(ResourceTreeComponent, _BaseComponent);

  _createClass(ResourceTreeComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
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
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Resource tree',
        group: 'advanced',
        icon: 'fa fa-sitemap',
        weight: 90,
        documentation: 'http://help.form.io/userguide/#resourcetree',
        schema: ResourceTreeComponent.schema()
      };
    }
  }]);

  function ResourceTreeComponent(component, options, data) {
    var _this;

    _classCallCheck(this, ResourceTreeComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ResourceTreeComponent).call(this, component, options, data));
    _this.component.dataSrc = 'resource';
    _this.component.data = {
      resource: _this.component.resource
    };
    _this.treeRedrawn = false;
    _this.treeNodeIds = {};
    return _this;
  }

  _createClass(ResourceTreeComponent, [{
    key: "getValue",
    value: function getValue() {
      if (this.choices) {
        var result = [];
        this.choices.getValue().map(function (v) {
          result.push(v.value);
        });
        return result;
      }

      return null;
    }
  }, {
    key: "setChoiceValue",
    value: function setChoiceValue(value) {
      if (this.choices) {
        if (value && !_lodash.default.isArray(value)) {
          value = [value];
        }

        this.choices.removeActiveItems();

        if (value) {
          this.choices.setValue(value);
        }
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this2 = this;

      if (!value || Array.isArray(value) && value.length === 0) {
        this.setChoiceValue([]);
        return false;
      }

      var tree = (0, _jquery.default)(this.treeView).treeview(true);

      if (tree && tree.filterNodes) {
        var ids = value.map(function (v) {
          return _lodash.default.get(v, _this2.component.idAttribute);
        });
        var nodes = tree.filterNodes(function (n) {
          return ids.indexOf(n.id) > -1;
        }); // console.log(`ResourceTree.setValue nodes: ${JSON.stringify(nodes)}`);

        nodes.map(function (n) {
          return _this2.nodeChecked(n);
        });

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

  }, {
    key: "addButton",
    value: function addButton(treeDiv) {
      var _this3 = this;

      var buttonDiv = this.ce('div', {
        class: 'resource-tree-button'
      });
      var button = this.ce('button', {
        class: 'btn btn-primary'
      });
      buttonDiv.appendChild(button);
      var icon = this.ce('i', {
        class: this.component.dialogButtonCss
      });
      button.appendChild(icon);
      this.addEventListener(button, 'click', function (event) {
        event.preventDefault();

        var dialog = _this3.createModal(_this3.component.selectDialogTitle || 'Select');

        if (treeDiv) {
          if (treeDiv.parentNode) {
            _this3.removeChildFrom(treeDiv, treeDiv.parentNode);
          }

          treeDiv.hidden = false;
          dialog.body.appendChild(treeDiv);
        }

        _this3.addEventListener(dialog, 'close', function () {
          treeDiv.hidden = true;
          document.body.appendChild(treeDiv);
        });
      });
      return buttonDiv;
    }
  }, {
    key: "addInput",
    value: function addInput(input, container) {
      var _this4 = this;

      var div = this.ce('div', {
        id: "".concat(this.component.id, "-div"),
        class: 'resourcetree'
      });
      var template = "\n      <div id=\"".concat(this.component.id, "-tags\" class=\"resourcetree-tags\">\n      </div>\n      <div id=\"").concat(this.component.id, "-button\" class=\"resourcetree-button\">\n      </div>");
      container.appendChild(div);
      div.innerHTML = template;
      var choicesDiv = div.querySelector("#".concat(this.component.id, "-tags")); // call super to add the Choices element

      _get(_getPrototypeOf(ResourceTreeComponent.prototype), "addInput", this).call(this, input, choicesDiv);

      this.choices = new _choices.default(input, {
        delimiter: ',',
        editItems: true,
        maxItemCount: this.component.maxSelections,
        removeItemButton: true
      }); // prevent user from clicking into the input (so she cannot enter text)

      if (this.choices.input) {
        this.choices.input.addEventListener('focus', function (e) {
          if (e.target === _this4.choices.input) {
            _this4.choices.input.blur();
          }
        });
      }

      this.choices.itemList.tabIndex = input.tabIndex; // and then add an event listener for removal of choices

      input.addEventListener('removeItem', function (event) {
        return _this4.onRemoveTag(event);
      }, false);

      if (this.component.hideChoices) {
        choicesDiv.hidden = true;
      }

      this.appendTreeTo(div).then(function (treeDiv, err) {
        if (err) {
          throw err;
        }

        if (!_this4.component.inlineTree) {
          _this4.removeChildFrom(treeDiv, div);

          var tags = div.querySelector("#".concat(_this4.component.id, "-button"));
          tags.appendChild(_this4.addButton(treeDiv));
        }

        if (_this4.component.checkRootNodes) {
          var tree = (0, _jquery.default)(_this4.treeView).treeview(true);
          var top1 = tree.getNode(0);

          if (top1) {
            _this4.nodeChecked(top1);
          }

          var siblings = tree.getSiblings(top1);

          if (siblings) {
            siblings.map(function (n) {
              return _this4.nodeChecked(n);
            });
          }
        }
      });
      return input;
    }
  }, {
    key: "appendTreeTo",
    value: function () {
      var _appendTreeTo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(element) {
        var treeDiv;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                treeDiv = this.ce('div', {
                  id: "".concat(this.component.id, "-tree"),
                  class: 'resourcetree-tree'
                });
                element.appendChild(treeDiv);
                _context.next = 4;
                return this.createTree("#".concat(this.component.id, "-tree"));

              case 4:
                return _context.abrupt("return", treeDiv);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function appendTreeTo(_x) {
        return _appendTreeTo.apply(this, arguments);
      };
    }()
  }, {
    key: "createTree",
    value: function () {
      var _createTree = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(elementId) {
        var _this5 = this;

        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // a hack to overcome cases where the initialisation of the bootstrap-treeview plugin wasn't successful
                this.addJqueryTreeview(elementId);
                _context2.next = 3;
                return this.getTree();

              case 3:
                data = _context2.sent;
                this.treeView = (0, _jquery.default)(elementId).treeview({
                  data: data,
                  showCheckbox: true,
                  multiSelect: false,
                  selectable: false,
                  onNodeChecked: function onNodeChecked(event, data) {
                    _this5.nodeChecked(data);
                  },
                  onNodeUnchecked: function onNodeUnchecked(event, data) {
                    _this5.nodeUnchecked(data);
                  }
                });

                if (!this.treeRedrawn) {
                  this.treeRedrawn = true;
                  this.triggerRedraw();
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function createTree(_x2) {
        return _createTree.apply(this, arguments);
      };
    }()
  }, {
    key: "addJqueryTreeview",
    value: function addJqueryTreeview(elementId) {
      var jqinit = (0, _jquery.default)(elementId);

      if (!jqinit) {
        console.warn('Cannot find tree element with id {} on page', elementId);
        return false;
      }

      if (jqinit.treeview === undefined) {
        jqinit.treeview = _bootstrapTreeview.default;
      }

      return true;
    }
  }, {
    key: "nodeChecked",
    value: function nodeChecked(node) {
      var choiceValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var fireUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (!this.choices) return;
      var currentValues = choiceValues ? choiceValues : this.choices.getValue(false); // is the node already in the choices?

      if (this.findNodesInChoices([node], currentValues).length > 0) {
        return;
      }

      var item = node._originalItem;
      var newVal = {
        value: item,
        label: _lodash.default.get(item, this.component.titleAttribute),
        id: _lodash.default.get(item, this.component.idAttribute),
        customProperties: node
      }; // we need this in removeItem callback to deselect nodes

      this.treeNodeIds[newVal.id] = node.nodeId;
      var nodesToRemove = [];
      var tree = (0, _jquery.default)(this.treeView).treeview(true); // temporarily set check to false (otherwise uncheckNodesAndMaybeSubtree would be more complicated)

      node.state.checked = false; // we have to collect the nodes which are already checked (we have to remove them from the choices)

      this.checkNodeAndMaybeSubtree(node, tree, [], nodesToRemove);
      node.state.checked = true;

      if (currentValues.length === 0) {
        this.setChoiceValue(newVal);
      } else {
        // we need to distinguish between the removal which follows now and removal by the user
        // the latter is handled in onRemoveTag
        this.programmaticallyModifyingNodes = true;
        this.setChoiceValue(_toConsumableArray(this.removeNodesFromChoices(nodesToRemove, currentValues)).concat([newVal]));
        this.programmaticallyModifyingNodes = false;
      }

      if (fireUpdate) {
        this.updateValue({
          noUpdateEvent: false
        }, this.getValue());
      }
    }
  }, {
    key: "nodeUnchecked",
    value: function nodeUnchecked(node) {
      var _this6 = this;

      var choiceValues = this.choices.getValue(false);
      var nodesToRemove = [node];
      var nodesToAdd = [];
      var tree = (0, _jquery.default)("#".concat(this.component.id, "-tree")).treeview(true);
      var parent = tree.getParent(node);

      if (parent && parent.state.checked) {
        nodesToRemove.push(parent);
        tree.getSiblings(node).map(function (n) {
          return nodesToAdd.push(n);
        }); // console.log('checked parent node {}, nodesToAdd {}, nodesToRemove {}', parent, nodesToAdd, nodesToRemove);
      } // temporarily set check to true (otherwise uncheckNodesAndMaybeSubtree would be more complicated)


      node.state.checked = true;
      this.uncheckNodeAndMaybeSubtree(node, tree, nodesToRemove, []);
      node.state.checked = false;
      this.programmaticallyModifyingNodes = true;
      this.visitNodesInChoices(nodesToRemove, choiceValues, function (treeNode, choiceVal) {
        _this6.choices.removeItemsByValue(choiceVal.value);

        treeNode.state.checked = false;
      });
      this.programmaticallyModifyingNodes = false;
      nodesToAdd.map(function (n) {
        return _this6.nodeChecked(n, null, false);
      });
      this.updateValue({
        noUpdateEvent: false
      }, this.getValue());
    }
  }, {
    key: "findNodesInChoices",
    value: function findNodesInChoices(nodes, choiceValues) {
      if (!(nodes && Array.isArray(nodes) && choiceValues)) {
        return [];
      }

      var idAttr = this.component.idAttribute;
      var ids = nodes.map(function (n) {
        return n._originalItem[idAttr];
      });
      return choiceValues.filter(function (v) {
        return ids.indexOf(v.value[idAttr]) > -1;
      });
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

  }, {
    key: "visitNodesInChoices",
    value: function visitNodesInChoices(nodes, choiceValues, func) {
      if (!(nodes && Array.isArray(nodes) && choiceValues)) {
        return;
      }

      var idAttr = this.component.idAttribute;
      var nodeMap = {};
      nodes.map(function (n) {
        return nodeMap[n._originalItem[idAttr]] = n;
      });
      choiceValues.map(function (v) {
        var n = nodeMap[v.value[idAttr]];

        if (n) {
          func(n, v);
        }
      });
    }
  }, {
    key: "removeNodesFromChoices",
    value: function removeNodesFromChoices(nodes, choiceValues) {
      if (!(nodes && Array.isArray(nodes) && choiceValues)) {
        return [];
      }

      var idAttr = this.component.idAttribute;
      var ids = nodes.map(function (n) {
        return n._originalItem[idAttr];
      });
      return choiceValues.filter(function (v) {
        return ids.indexOf(v.value[idAttr]) < 0;
      });
    }
  }, {
    key: "prepareTreeAttributes",
    value: function prepareTreeAttributes(response, level) {
      var _this7 = this;

      if (!response) {
        return [];
      }

      if (Array.isArray(response)) {
        var result = [];
        response.forEach(function (v) {
          result.push(_this7.prepareTreeAttributes(v, level + 1));
        });
        return result;
      }

      var newNode = {
        _originalItem: response
      };
      newNode.id = _lodash.default.get(response, this.component.idAttribute);
      newNode.text = _lodash.default.get(response, this.component.titleAttribute);
      newNode.selectable = false;
      newNode.state = {};

      if (this.component.expandLevel === -1) {
        newNode.state.expanded = true;
      } else {
        if (this.component.expandLevel > level) {
          newNode.state.expanded = true;
        } else {
          newNode.state.expanded = false;
        }
      }

      if (this.component.checkRootNodes) {
        if (this.component.recursiveSelect) {
          newNode.state.checked = true;
        } else if (level === 0) {
          newNode.state.checked = true;
        }
      }

      var children = _lodash.default.get(response, this.component.childrenAttribute);

      if (children) {
        newNode.nodes = this.prepareTreeAttributes(children, level + 1);
      }

      return newNode;
    }
  }, {
    key: "getTree",
    value: function () {
      var _getTree = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var _this8 = this;

        var compUrl, finalUrl, idx;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.treeData) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", this.treeData);

              case 2:
                if (!(this.component.url && this.component.url.trim() !== '')) {
                  _context3.next = 9;
                  break;
                }

                compUrl = this.component.url.trim();
                idx = compUrl.indexOf('http');

                if (idx === 0) {
                  finalUrl = compUrl;
                } else {
                  finalUrl = "".concat(_lodash.default.get(this.root, 'formio.projectUrl', _Formio.default.getBaseUrl())).concat(compUrl);
                }

                return _context3.abrupt("return", _Formio.default.makeStaticRequest(finalUrl, 'GET').then(function (res, err) {
                  if (err) {
                    console.warn('Cannot retrieve tree nodes from {}. Error: {}', finalUrl, err);
                    return;
                  }

                  _this8.treeData = _this8.handleTreeResponse(res);
                  return _this8.treeData;
                }));

              case 9:
                return _context3.abrupt("return", []);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function getTree() {
        return _getTree.apply(this, arguments);
      };
    }()
  }, {
    key: "handleTreeResponse",
    value: function handleTreeResponse(res) {
      if (!this.component.showRootNode) {
        var children = _lodash.default.get(res, this.component.childrenAttribute);

        if (children) {
          res = children;
        } else {
          res = [];
        }
      } else {
        res = [res];
      } // we start with level -1 as res is always an array with the root node(s)


      return this.prepareTreeAttributes(res, -1);
    }
  }, {
    key: "onRemoveTag",
    value: function onRemoveTag(event) {
      if (this.programmaticallyModifyingNodes) {
        return;
      }

      if (!(event.detail.value && event.detail.value._id)) {
        return;
      }

      var id = event.detail.value._id;
      var treeNodeId = this.treeNodeIds[id];

      if (treeNodeId !== undefined) {
        var tree = (0, _jquery.default)("#".concat(this.component.id, "-tree")).treeview(true);

        if (tree) {
          var node = tree.getNode(treeNodeId);
          this.uncheckNodeAndMaybeSubtree(node, tree, [], []);
          this.updateValue({}, this.getValue());
        }
      }
    }
  }, {
    key: "uncheckNodeAndMaybeSubtree",
    value: function uncheckNodeAndMaybeSubtree(node, tree, modifiedChildren, unmodifiedChildren) {
      var _this9 = this;

      if (node && node.state.checked === true) {
        tree.uncheckNode(node.nodeId, {
          silent: true
        });

        if (!this.component.recursiveSelect) {
          return;
        } // if recursiveSelect is true, walk the children


        if (node.nodes) {
          node.nodes.forEach(function (child) {
            if (child.state.checked === true) {
              modifiedChildren.push(child);

              _this9.uncheckNodeAndMaybeSubtree(child, tree, modifiedChildren, unmodifiedChildren);
            } else {
              unmodifiedChildren.push(child);
            }
          });
        }
      }
    }
  }, {
    key: "checkNodeAndMaybeSubtree",
    value: function checkNodeAndMaybeSubtree(node, tree, modifiedChildren, unmodifiedChildren) {
      var _this10 = this;

      if (node && node.state.checked === false) {
        tree.checkNode(node.nodeId, {
          silent: true
        });

        if (!this.component.recursiveSelect) {
          return;
        } // if recursiveSelect is true, walk the children


        if (node.nodes) {
          node.nodes.forEach(function (child) {
            if (child.state.checked === false) {
              modifiedChildren.push(child);

              _this10.checkNodeAndMaybeSubtree(child, tree, modifiedChildren, unmodifiedChildren);
            } else {
              unmodifiedChildren.push(child);
            }
          });
        }
      }
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return ResourceTreeComponent.schema();
    }
  }]);

  return ResourceTreeComponent;
}(_Base.default);

exports.default = ResourceTreeComponent;