"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.set");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/web.dom.iterable");

var _jquery = _interopRequireDefault(require("jquery"));

require("bootstrap/js/dist/modal");

var _bootstrapTreeview = _interopRequireDefault(require("./bootstrap-treeview"));

var _Select = _interopRequireDefault(require("../select/Select"));

var _Tags = _interopRequireDefault(require("../tags/Tags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

window.jQuery = _jquery.default;
window.$ = _jquery.default;
_jquery.default.fn.treeview = _bootstrapTreeview.default;

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
    return _this;
  }

  _createClass(ResourceTreeComponent, [{
    key: "addButton",

    /**
     * Creates a new button to add a resource instance
     * @returns {HTMLElement} - The "Add Resource" button html element.
     */
    value: function addButton() {
      var addButton = this.ce('button', {
        class: 'btn btn-primary'
      });
      var addIcon = this.ce('i', {
        class: this.iconClass('plus')
      });
      addButton.appendChild(addIcon);
      addButton.appendChild(this.text(" ".concat(this.component.addResourceLabel || 'Add Resource')));
      this.addEventListener(addButton, 'click', function (event) {
        event.preventDefault();
      });
      return addButton;
    }
  }, {
    key: "addInput",
    value: function addInput(input, container) {
      var table = this.ce('table', {
        class: 'table table-bordered'
      });
      var template = "\n        <div>\n          <tbody>\n            <tr>\n              <td id=\"tags\">\n              </td>\n            </tr>\n            <tr>\n              <div id=\"tree\"></div>\n            </tr>\n          </tbody>\n        </div>";
      container.appendChild(table);
      table.innerHTML = template;

      _get(_getPrototypeOf(ResourceTreeComponent.prototype), "addInput", this).call(this, input, table.querySelector('#tags'));

      _set(_getPrototypeOf(ResourceTreeComponent.prototype), "disabled", true, this, true);

      console.log('Find #tree: {}', (0, _jquery.default)('#tree'));
      console.log('_jquery: {}', window._jquery);
      console.log('treeview: {}', _bootstrapTreeview.default);
      console.log('$: {}', _jquery.default);
      (0, _jquery.default)('#tree').treeview({
        data: this.getTree(),
        showCheckbox: true,
        multiSelect: true
      });
    }
  }, {
    key: "getTree",
    value: function getTree() {
      var response = [{
        id: '000000000000000000000523',
        name: 'Sport',
        children: [{
          id: '000000000000000000000520',
          name: 'Olympische Spiele'
        }, {
          id: '000000000000000000000524',
          name: 'Leichtathletik'
        }, {
          id: '000000000000000000000525',
          name: 'Ballsport'
        }, {
          id: '000000000000000000000526',
          name: 'Wintersport'
        }, {
          id: '000000000000000000000527',
          name: 'Motorsport'
        }, {
          id: '000000000000000000000528',
          name: 'Wassersport'
        }, {
          id: '000000000000000000000529',
          name: 'Reiten'
        }, {
          id: '000000000000000000000530',
          name: 'Fußball'
        }, {
          id: '000000000000000000000531',
          name: 'Kampfsport'
        }, {
          id: '000000000000000000000532',
          name: 'Radsport'
        }, {
          id: '000000000000000000000533',
          name: 'Turnen'
        }, {
          id: '000000000000000000000534',
          name: 'Fechten'
        }, {
          id: '000000000000000000000535',
          name: 'Extremsport'
        }, {
          id: '000000000000000000000536',
          name: 'Schießen'
        }, {
          id: '000000000000000000000537',
          name: 'Sonstiges'
        }]
      }, {
        id: '000000000000000000000538',
        name: 'Wirtschaft',
        children: [{
          id: '000000000000000000000539',
          name: 'Unternehmen'
        }, {
          id: '000000000000000000000540',
          name: 'Märkte'
        }, {
          id: '000000000000000000000541',
          name: 'Verbraucher'
        }, {
          id: '000000000000000000000542',
          name: 'Service'
        }, {
          id: '000000000000000000000543',
          name: 'Geld und Finanzen'
        }, {
          id: '000000000000000000000544',
          name: 'Mittelstand'
        }, {
          id: '000000000000000000000545',
          name: 'Industrie'
        }, {
          id: '000000000000000000000546',
          name: 'Mobilität'
        }, {
          id: '000000000000000000000547',
          name: 'Auto'
        }, {
          id: '000000000000000000000548',
          name: 'Gesundheit'
        }, {
          id: '000000000000000000000549',
          name: 'Energie'
        }]
      }, {
        id: '000000000000000000000550',
        name: 'Kultur',
        children: [{
          id: '000000000000000000000551',
          name: 'Musik'
        }, {
          id: '000000000000000000000552',
          name: 'Literatur'
        }, {
          id: '000000000000000000000553',
          name: 'TV'
        }, {
          id: '000000000000000000000554',
          name: 'Kino'
        }, {
          id: '000000000000000000000555',
          name: 'Kunst'
        }, {
          id: '000000000000000000000556',
          name: 'Medien'
        }]
      }, {
        id: '000000000000000000000557',
        name: 'Wissenschaft',
        children: [{
          id: '000000000000000000000558',
          name: 'Gesundheit und Medizin'
        }, {
          id: '000000000000000000000559',
          name: 'Technik'
        }, {
          id: '000000000000000000000560',
          name: 'Umwelt'
        }, {
          id: '000000000000000000000561',
          name: 'Ernährung'
        }, {
          id: '000000000000000000000562',
          name: 'Forschung'
        }, {
          id: '000000000000000000000563',
          name: 'Bildung'
        }, {
          id: '000000000000000000000564',
          name: 'Klima'
        }, {
          id: '000000000000000000000565',
          name: 'Digitales'
        }]
      }, {
        id: '000000000000000000000566',
        name: 'Politik',
        children: [{
          id: '000000000000000000000567',
          name: 'Deutschland'
        }, {
          id: '000000000000000000000568',
          name: 'Europa'
        }, {
          id: '000000000000000000000569',
          name: 'Ausland'
        }]
      }, {
        id: '000000000000000000000570',
        name: 'Lifestyle',
        children: [{
          id: '000000000000000000000571',
          name: 'Reise'
        }, {
          id: '000000000000000000000572',
          name: 'Mode'
        }, {
          id: '000000000000000000000573',
          name: 'Architektur'
        }, {
          id: '000000000000000000000574',
          name: 'Freizeit'
        }, {
          id: '000000000000000000000575',
          name: 'Familie'
        }]
      }];

      if (!response) {
        return [];
      } // TODO: id, name, children must be defined in the component editor/schema


      this.idAttribute = 'id';
      this.titleAttribute = 'name';
      this.childrenAttribute = 'children';
      this.prepareTreeAttributes(response);
      return response;
    }
  }, {
    key: "prepareTreeAttributes",
    value: function prepareTreeAttributes(response) {
      var _this2 = this;

      response.map(function (val) {
        if (Array.isArray(val)) {
          val.forEach(function (v) {
            _this2.prepareTreeAttributes(v);
          });
        }

        if (val.hasOwnProperty(_this2.titleAttribute)) {
          val.text = val[_this2.titleAttribute];
        }

        if (val.hasOwnProperty(_this2.childrenAttribute)) {
          _this2.prepareTreeAttributes(val[_this2.childrenAttribute]);

          val.nodes = val[_this2.childrenAttribute];
        }
      });
      return [{
        text: 'Parent 1',
        nodes: [{
          text: 'Child 1',
          nodes: [{
            text: 'Grandchild 1'
          }, {
            text: 'Grandchild 2'
          }]
        }, {
          text: 'Child 2'
        }]
      }, {
        text: 'Parent 2'
      }, {
        text: 'Parent 3'
      }, {
        text: 'Parent 4'
      }, {
        text: 'Parent 5'
      }];
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