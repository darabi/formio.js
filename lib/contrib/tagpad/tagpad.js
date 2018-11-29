"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.set");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.array.fill");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _two = _interopRequireDefault(require("two.js"));

var _NestedComponent2 = _interopRequireDefault(require("../../components/nested/NestedComponent"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Base = _interopRequireDefault(require("../../components/base/Base"));

var _formio = require("../../formio.form");

var _Formio = _interopRequireDefault(require("../../Formio"));

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

var Tagpad =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(Tagpad, _NestedComponent);

  _createClass(Tagpad, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        type: 'tagpad',
        label: 'Tagpad',
        key: 'tagpad',
        canvasWidth: 640,
        canvasHeight: 480,
        dotSize: 10,
        dotStrokeSize: 2,
        dotStrokeColor: '#333',
        dotFillColor: '#ccc'
      }].concat(extend));
    }
  }]);

  function Tagpad() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tagpad);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tagpad)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.type = 'tagpad';
    _this.dots = [];

    _lodash.default.defaults(_this.component, {
      canvasWidth: 640,
      canvasHeight: 480,
      dotSize: 10,
      dotStrokeSize: 2,
      dotStrokeColor: '#333',
      dotFillColor: '#ccc'
    });

    return _this;
  }

  _createClass(Tagpad, [{
    key: "build",
    value: function build(state) {
      if (this.options.builder) {
        return _get(_getPrototypeOf(Tagpad.prototype), "build", this).call(this, state, true);
      }

      this.createElement();
      this.createLabel(this.element);
      this.renderTagpad();
      this.createDescription(this.element);

      if (this.shouldDisable) {
        this.disabled = true;
      }

      this.element.appendChild(this.errorContainer = this.ce('div', {
        class: 'has-error'
      }));
      this.attachLogic();
    }
  }, {
    key: "renderTagpad",
    value: function renderTagpad() {
      this.tagpadContainer = this.ce('div', {
        class: 'formio-tagpad-container clearfix'
      });
      this.canvas = this.ce('div', {
        class: 'formio-tagpad-canvas'
      });
      this.background = this.ce('div', {
        class: 'formio-tagpad-background'
      });
      this.canvasContainer = this.ce('div', {
        class: 'formio-tagpad-image-container',
        style: "width: ".concat(this.component.canvasWidth, "px;")
      }, [this.canvas, this.background]);
      this.formContainer = this.ce('div', {
        class: 'formio-tagpad-form-container',
        style: "margin-left: -".concat(this.component.canvasWidth, "px; padding-left: ").concat(this.component.canvasWidth, "px;")
      }, this.form = this.ce('div', {
        class: 'formio-tagpad-form'
      }));
      this.tagpadContainer.appendChild(this.canvasContainer);
      this.tagpadContainer.appendChild(this.formContainer);
      this.element.appendChild(this.tagpadContainer);
      this.two = new _two.default({
        type: _two.default.Types.svg,
        width: this.component.canvasWidth,
        height: this.component.canvasHeight
      }).appendTo(this.canvas);
      this.canvasSvg = this.two.renderer.domElement;
      this.addBackground();
      this.attachDrawEvents();
    }
  }, {
    key: "renderForm",
    value: function renderForm() {
      var _this2 = this;

      this.form.appendChild(this.ce('p', {
        class: 'formio-tagpad-form-title'
      }, [this.t('Dot: '), this.selectedDotIndexElement = this.ce('span', {}, 'No dot selected')]));
      this.component.components.forEach(function (component) {
        //have to avoid using createComponent method as Components there will be empty
        var componentInstance = _formio.Components.create(component, _this2.options, _this2.data);

        componentInstance.parent = _this2;
        componentInstance.root = _this2.root || _this2;
        var oldOnChange = componentInstance.onChange;

        componentInstance.onChange = function (flags, fromRoot) {
          oldOnChange.call(componentInstance, flags, fromRoot);

          _this2.saveSelectedDot();
        };

        _this2.components.push(componentInstance);

        _this2.form.appendChild(componentInstance.getElement());
      });
      this.form.appendChild(this.ce('button', {
        class: 'btn btn-sm btn-danger formio-tagpad-remove-button',
        onClick: this.removeSelectedDot.bind(this),
        title: 'Remove Dot'
      }, [this.ce('i', {
        class: this.iconClass('trash')
      })]));
      this.formRendered = true;
    }
  }, {
    key: "attachDrawEvents",
    value: function attachDrawEvents() {
      var _this3 = this;

      if (this.options.readOnly) {
        return;
      } // Set up mouse event.


      var mouseEnd = function mouseEnd(e) {
        e.preventDefault();

        var offset = _this3.canvasSvg.getBoundingClientRect();

        _this3.addDot({
          x: e.clientX - offset.left,
          y: e.clientY - offset.top
        });
      };

      this.canvasSvg.addEventListener('mouseup', mouseEnd); // Set up touch event.

      var touchEnd = function touchEnd(e) {
        e.preventDefault();

        var offset = _this3.canvasSvg.getBoundingClientRect();

        var touch = e.originalEvent.changedTouches[0];

        _this3.addDot({
          x: touch.pageX - offset.left,
          y: touch.pageY - offset.top
        });
      };

      this.canvasSvg.addEventListener('touchend', touchEnd);
      this.two.update();
    }
  }, {
    key: "addBackground",
    value: function addBackground() {
      var _this4 = this;

      var backgroundReadyPromise = new Promise(function (resolve, reject) {
        _this4.backgroundReady = {
          resolve: resolve,
          reject: reject
        };
      });
      this.backgroundReady.promise = backgroundReadyPromise;

      if (this.component.image) {
        //TODO check that inserted html contains SVG tag on it
        this.background.innerHTML = this.component.image;
        this.backgroundReady.resolve();
      } else if (this.component.imageUrl) {
        _Formio.default.makeStaticRequest(this.component.imageUrl, 'GET', null, {
          noToken: true
        }).then(function (image) {
          _this4.background.innerHTML = image;

          _this4.backgroundReady.resolve();
        }).catch(function () {
          //TODO check that component works in this case anyway
          console.warn("Tagpad background didn't load for component: ".concat(_this4.component.key));

          _this4.backgroundReady.resolve();
        });
      }
    }
  }, {
    key: "addDot",
    value: function addDot(coordinate) {
      var dot = {
        coordinate: coordinate,
        data: {}
      };
      this.dataValue = this.dataValue || [];
      var newDotIndex = this.dataValue.length;
      var shape = this.drawDot(dot, newDotIndex);
      this.dots.push({
        index: newDotIndex,
        dot: dot,
        shape: shape
      });
      this.dataValue.push(dot);
      this.selectDot(newDotIndex);
      this.triggerChange();
    }
  }, {
    key: "dotClicked",
    value: function dotClicked(e, dot, index) {
      //prevent drawing another dot near clicked dot
      e.stopPropagation();
      this.selectDot(index);
    }
  }, {
    key: "selectDot",
    value: function selectDot(index) {
      if (!this.formRendered) {
        this.renderForm();
      }

      var dot = this.dots[index];

      if (!dot) {
        return;
      } //remove dashes for previous selected dot


      if (this.dots[this.selectedDotIndex]) {
        this.dots[this.selectedDotIndex].shape.circle.dashes = [0];
      } //add dashes to new selected dot


      dot.shape.circle.dashes = [1];
      this.two.update();
      this.selectedDotIndex = index;
      this.setFormValue(dot.dot.data);
      this.checkDotValidity(this.data, false, dot);
    }
  }, {
    key: "setFormValue",
    value: function setFormValue(value) {
      this.selectedDotIndexElement.innerHTML = this.selectedDotIndex + 1;
      this.components.forEach(function (component) {
        component.setValue(_lodash.default.get(value, component.key), {
          noUpdateEvent: true
        });
      });
    }
  }, {
    key: "updateValue",
    value: function updateValue(flags, value) {
      // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
      return _Base.default.prototype.updateValue.call(this, flags, value);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "setValue",
    value: function setValue(dots) {
      var _this5 = this;

      this.dataValue = dots;

      if (!dots) {
        return;
      }

      dots.forEach(function (dot, index) {
        var shape = _this5.drawDot(dot, index);

        _this5.dots.push({
          index: index,
          dot: dot,
          shape: shape
        });
      });
      this.selectDot(0);
    }
  }, {
    key: "drawDot",
    value: function drawDot(dot, index) {
      var _this6 = this;

      //draw circle
      var circle = this.two.makeCircle(dot.coordinate.x, dot.coordinate.y, this.component.dotSize);
      circle.fill = this.component.dotFillColor;
      circle.stroke = this.component.dotStrokeColor;
      circle.linewidth = this.component.dotStrokeSize;
      circle.className += ' formio-tagpad-dot'; //draw index

      var text = new _two.default.Text(index + 1, dot.coordinate.x, dot.coordinate.y);
      text.className += ' formio-tagpad-dot-index';
      text.styles = {
        color: this.component.dotStrokeColor
      };
      this.two.add(text);
      this.two.update();

      circle._renderer.elem.addEventListener('mouseup', function (e) {
        return _this6.dotClicked(e, dot, index);
      });

      text._renderer.elem.addEventListener('mouseup', function (e) {
        return _this6.dotClicked(e, dot, index);
      });

      return {
        circle: circle,
        text: text
      };
    }
  }, {
    key: "saveSelectedDot",
    value: function saveSelectedDot() {
      var selectedDot = this.dots[this.selectedDotIndex];
      this.components.forEach(function (component) {
        selectedDot.dot.data[component.key] = component.getValue();
      });
      this.dataValue[this.selectedDotIndex] = selectedDot.dot;
    }
  }, {
    key: "removeSelectedDot",
    value: function removeSelectedDot() {
      this.dataValue.splice(this.selectedDotIndex, 1);
      this.redrawDots();
    }
  }, {
    key: "redrawDots",
    value: function redrawDots() {
      this.dots = []; //clear canvas

      this.two.clear(); //draw dots

      this.setValue(this.dataValue);
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty) {
      var _this7 = this;

      if (!this.checkCondition(null, data)) {
        this.setCustomValidity('');
        return true;
      }

      var isTagpadValid = true; //check validity of each dot

      this.dots.forEach(function (dot) {
        var isDotValid = _this7.checkDotValidity(data, dirty, dot);

        isTagpadValid = isTagpadValid && isDotValid;
      }); //in the end check validity of selected dot to show its validation results on the form instead of showing last dot validation

      this.checkDotValidity(data, dirty, this.dots[this.selectedDotIndex]);

      if (isTagpadValid) {
        this.setCustomValidity('');
      } else {
        this.setCustomValidity(this.t('There are some invalid dots'), dirty);
      }

      return isTagpadValid;
    }
  }, {
    key: "checkDotValidity",
    value: function checkDotValidity(data, dirty, dot) {
      var isDotValid = this.components.reduce(function (valid, component) {
        component.dataValue = dot.dot.data[component.key];
        return valid && component.checkValidity(data, dirty);
      }, true);
      this.setDotValidity(dot, isDotValid);
      return isDotValid;
    }
  }, {
    key: "setDotValidity",
    value: function setDotValidity(dot, isValid) {
      var color;

      if (isValid) {
        color = this.component.dotStrokeColor;
      } else {
        color = '#ff0000';
      } //change style of dot based on its validity


      dot.shape.circle.stroke = color;
      dot.shape.text.styles.color = color;
      this.two.update();
    }
  }, {
    key: "addInputError",
    value: function addInputError(message, dirty) {
      var _this8 = this;

      //need to override this to not add has-error class (because has-error highlights all inner form-controls with red)
      if (!message) {
        return;
      }

      if (this.errorElement) {
        var errorMessage = this.ce('p', {
          class: 'help-block'
        });
        errorMessage.appendChild(this.text(message));
        this.errorElement.appendChild(errorMessage);
      }

      this.inputs.forEach(function (input) {
        return _this8.addClass(_this8.performInputMapping(input), 'is-invalid');
      });

      if (dirty && this.options.highlightErrors) {
        this.addClass(this.element, 'alert alert-danger');
      }
    }
  }, {
    key: "disabled",
    set: function set(disabled) {
      _set(_getPrototypeOf(Tagpad.prototype), "disabled", disabled, this, true); //call Base Component setter to run the logic for adding disabled class


      Object.getOwnPropertyDescriptor(_Base.default.prototype, 'disabled').set.call(this, disabled);
    }
  }, {
    key: "dataReady",
    get: function get() {
      return this.backgroundReady.promise;
    }
  }]);

  return Tagpad;
}(_NestedComponent2.default);

exports.default = Tagpad;