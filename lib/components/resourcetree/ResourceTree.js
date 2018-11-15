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

require("core-js/modules/es6.reflect.get");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.promise");

var _jquery = _interopRequireDefault(require("jquery"));

var _lodash = _interopRequireDefault(require("lodash"));

require("bootstrap/js/dist/modal");

var _bootstrapTreeview = _interopRequireDefault(require("./bootstrap-treeview"));

var _Formio = _interopRequireDefault(require("../../Formio"));

var _Select = _interopRequireDefault(require("../select/Select"));

var _Tags = _interopRequireDefault(require("../tags/Tags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
function (_TagsComponent) {
  _inherits(ResourceTreeComponent, _TagsComponent);

  _createClass(ResourceTreeComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Select.default.schema.apply(_Select.default, [{
        type: 'resourcetree',
        label: 'Resource tree',
        key: 'resourcetree',
        dataSrc: 'resource',
        resource: '',
        project: '',
        template: '<span>{{ item.data }}</span>'
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
    /**
     * Creates a new button to show the tree in a modal dialog, when
     * inlineTree is false.
     * @returns {HTMLElement} - The "+" button html element
     */

  }, {
    key: "addButton",
    value: function addButton(tree) {
      var _this2 = this;

      var addButton = this.ce('button', {
        class: 'btn btn-primary'
      });
      var addIcon = this.ce('i', {
        class: this.iconClass('plus')
      });
      addButton.appendChild(addIcon);
      this.addEventListener(addButton, 'click', function (event) {
        event.preventDefault();
        tree.hidden = false;

        var dialog = _this2.createModal(_this2.component.selectDialogTitle || 'Select');

        dialog.body.appendChild(tree);

        _this2.addEventListener(dialog, 'close', function () {
          console.log('Selection dialog closed');
        });
      });
      return addButton;
    }
  }, {
    key: "addInput",
    value: function addInput(input, container) {
      var _this3 = this;

      var div = this.ce('div', {
        id: "".concat(this.component.id, "-div"),
        class: 'resource-tree'
      });
      var template = "\n      <div id=\"".concat(this.component.id, "-tags\">\n      </div>\n      <div id=\"").concat(this.component.id, "-tree\">\n      </div>\n    ");
      container.appendChild(div);
      div.innerHTML = template; // call super to add the Choices element

      _get(_getPrototypeOf(ResourceTreeComponent.prototype), "addInput", this).call(this, input, div.querySelector("#".concat(this.component.id, "-tags"))); // and then add an event listener for removal of choices


      input.addEventListener('removeItem', function (event) {
        return _this3.onRemoveTag(event);
      }, false); // super.disabled = true;

      this.createTree().then(function () {
        if (!_this3.component.inlineTree) {
          var tree = div.querySelector("#".concat(_this3.component.id, "-tree"));
          tree.setAttribute('hidden', true);

          if (!_this3.tree) {
            _this3.tree = tree.parentNode.removeChild(tree);
          }

          var tags = div.querySelector("#".concat(_this3.component.id, "-tags"));
          tags.appendChild(_this3.addButton(_this3.tree));
        }
      });
    }
  }, {
    key: "createTree",
    value: function createTree() {
      var _this4 = this;

      var jqinit = (0, _jquery.default)("#".concat(this.component.id, "-tree"));

      if (!jqinit) {
        console.warn('Cannot find tree element with id {}-tree on page', this.component.id);
        return;
      }

      if (jqinit.treeview === undefined) {
        jqinit.treeview = _bootstrapTreeview.default;
      }

      return this.getTree().then(function (res, err) {
        if (err) {
          // FIXME: correctly report errors
          console.warn('Error retrieving the tree nodes {}', err);
        }

        _this4.treeView = (0, _jquery.default)("#".concat(_this4.component.id, "-tree")).treeview({
          data: res && !err ? res : [],
          showCheckbox: true,
          multiSelect: false,
          selectable: false,
          onNodeChecked: function onNodeChecked(event, data) {
            _this4.nodeChecked(data);
          },
          onNodeUnchecked: function onNodeUnchecked(event, data) {
            _this4.nodeUnchecked(data);
          }
        });

        if (!_this4.treeRedrawn) {
          _this4.treeRedrawn = true;

          _this4.triggerRedraw();
        }

        return Promise.resolve();
      });
    }
  }, {
    key: "nodeChecked",
    value: function nodeChecked(node) {
      var item = node._originalItem;
      var newVal = {
        value: item,
        label: _lodash.default.get(item, this.component.titleAttribute),
        id: _lodash.default.get(item, this.component.idAttribute),
        customProperties: node
      }; // we need this in removeItem callback to deselect nodes

      this.treeNodeIds[newVal.id] = node.nodeId;
      var currentVal = this.choices.getValue(false);
      console.log('currentVal is {}', currentVal);

      if (currentVal.length === 0) {
        _get(_getPrototypeOf(ResourceTreeComponent.prototype), "setValue", this).call(this, newVal);
      } else {
        // we need to distinguish between the removal which follows now and removal by the user
        // the latter is handled in onRemoveTag
        this.programmaticallyModifyingNodes = true;

        _get(_getPrototypeOf(ResourceTreeComponent.prototype), "setValue", this).call(this, _toConsumableArray(currentVal).concat([newVal]));

        this.programmaticallyModifyingNodes = false;
      }

      this.checkNodeAndMaybeSubtree(node, (0, _jquery.default)("#".concat(this.component.id, "-tree")).treeview(true), null);
    }
  }, {
    key: "nodeUnchecked",
    value: function nodeUnchecked(node) {
      var _this5 = this;

      var item = node._originalItem;
      var val = null;
      this.choices.getValue(false).map(function (v) {
        if (v.value[_this5.component.idAttribute] === item[_this5.component.idAttribute]) {
          val = v.value;
        }
      });

      if (val) {
        this.programmaticallyModifyingNodes = true;
        this.choices.removeItemsByValue(val);
        this.programmaticallyModifyingNodes = false;
      }

      this.uncheckNodeAndMaybeSubtree(node, (0, _jquery.default)("#".concat(this.component.id, "-tree")).treeview(true));
    }
  }, {
    key: "prepareTreeAttributes",
    value: function prepareTreeAttributes(response) {
      var _this6 = this;

      if (!response) {
        return [];
      }

      if (Array.isArray(response)) {
        var result = [];
        response.forEach(function (v) {
          result.push(_this6.prepareTreeAttributes(v));
        });
        return result;
      }

      var newNode = {
        _originalItem: response
      };
      newNode.id = _lodash.default.get(response, this.component.idAttribute);
      newNode.text = _lodash.default.get(response, this.component.titleAttribute);

      var children = _lodash.default.get(response, this.component.childrenAttribute);

      if (children) {
        newNode.nodes = this.prepareTreeAttributes(children);
      }

      return newNode;
    }
  }, {
    key: "getTree",
    value: function getTree() {
      var _this7 = this;

      if (this.component.url && this.component.url.trim() !== '') {
        return _Formio.default.makeStaticRequest(this.component.url, 'GET').then(function (res, err) {
          if (!res || err) {
            return [];
          }

          return _this7.handleTreeResponse(res);
        });
      } else {
        return Promise.resolve([]);
      }
    }
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
      }

      return this.prepareTreeAttributes(res);
    }
  }, {
    key: "onRemoveTag",
    value: function onRemoveTag(event) {
      if (this.programmaticallyModifyingNodes) {
        console.log('removeItem called while removing programmatically');
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
          this.uncheckNodeAndMaybeSubtree(node, tree);
        }
      }
    }
  }, {
    key: "uncheckNodeAndMaybeSubtree",
    value: function uncheckNodeAndMaybeSubtree(node, tree) {
      var _this8 = this;

      if (node) {
        tree.uncheckNode(node.nodeId, {
          silent: true
        });

        if (!this.component.recursiveSelect) {
          return;
        } // if recursiveSelect is true, walk the children


        if (node.nodes) {
          node.nodes.forEach(function (child) {
            _this8.uncheckNodeAndMaybeSubtree(child, tree);

            _this8.nodeUnchecked(child);
          });
        }
      }
    }
  }, {
    key: "checkNodeAndMaybeSubtree",
    value: function checkNodeAndMaybeSubtree(node, tree, additionalChildFunction) {
      var _this9 = this;

      if (node) {
        tree.checkNode(node.nodeId, {
          silent: true
        });

        if (!this.component.recursiveSelect) {
          return;
        } // if recursiveSelect is true, walk the children


        if (node.nodes) {
          node.nodes.forEach(function (child) {
            _this9.checkNodeAndMaybeSubtree(child, tree, additionalChildFunction);

            if (additionalChildFunction) {
              additionalChildFunction(child);
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
}(_Tags.default);

exports.default = ResourceTreeComponent;