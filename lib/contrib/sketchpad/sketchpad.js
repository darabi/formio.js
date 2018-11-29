"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.fill");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _Base2 = _interopRequireDefault(require("../../components/base/Base"));

var _two = _interopRequireDefault(require("two.js"));

var _vanillaPicker = _interopRequireDefault(require("vanilla-picker"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Formio = _interopRequireDefault(require("../../Formio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Sketchpad =
/*#__PURE__*/
function (_Base) {
  _inherits(Sketchpad, _Base);

  _createClass(Sketchpad, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base2.default.schema.apply(_Base2.default, [{
        type: 'sketchpad',
        label: 'Sketchpad',
        key: 'sketchpad',
        width: 640,
        height: 480
      }].concat(extend));
    }
  }]);

  function Sketchpad() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Sketchpad);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Sketchpad)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _lodash.default.defaults(_this.component, {
      width: 640,
      height: 480
    });

    _this.deleted = [];
    _this.viewSketchpad = {
      canvas: {},
      background: {}
    };
    _this.editSketchpad = {
      canvas: {},
      background: {}
    };
    _this.state = {
      mode: Object.keys(_this.modes)[0],
      stroke: '#333',
      fill: '#ccc',
      linewidth: 1,
      circleSize: 10
    };
    _this.zoomInfo = {
      canvasViewBox: {
        current: {
          width: _this.component.width,
          height: _this.component.height,
          minX: 0,
          minY: 0
        },
        default: {
          width: _this.component.width,
          height: _this.component.height,
          minX: 0,
          minY: 0
        }
      },
      backgroundViewBox: {
        current: {},
        default: {}
      },
      multiplier: 1.5,
      totalMultiplier: 1
    };
    return _this;
  }

  _createClass(Sketchpad, [{
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "build",

    /**
     * Builds the component.
     */
    value: function build(state) {
      state = state || {};
      this.calculatedValue = state.calculatedValue;
      this.createElement();
      this.createLabel(this.element);
      this.viewSketchpad.canvas.container = this.ce('div', {
        class: 'formio-view-sketchpad-canvas'
      });
      this.viewSketchpad.background.container = this.ce('div', {
        class: 'formio-view-sketchpad-background'
      });
      this.addEventListener(this.viewSketchpad.canvas.container, 'click', this.editSvg.bind(this));
      this.element.appendChild(this.ce('div', {
        class: 'formio-view-sketchpad-container'
      }, [this.viewSketchpad.canvas.container, this.viewSketchpad.background.container]));
      this.editSketchpad.canvas.container = this.ce('div', {
        class: 'formio-edit-sketchpad-canvas'
      });
      this.editSketchpad.background.container = this.ce('div', {
        class: 'formio-edit-sketchpad-background',
        style: "min-width: ".concat(this.component.width, "px; min-height: ").concat(this.component.height, "px;")
      });
      this.two = new _two.default({
        type: _two.default.Types.svg,
        width: this.component.width,
        height: this.component.height
      }).appendTo(this.editSketchpad.canvas.container);
      this.editSketchpad.canvas.svg = this.two.renderer.domElement;
      this.addClass(this.editSketchpad.canvas.svg, 'formio-sketchpad-svg');
      this.addBackground();
      this.attach(); // Disable if needed.

      if (this.shouldDisable) {
        this.disabled = true;
      } // Restore the value.


      this.restoreValue();
      this.autofocus();
      this.attachLogic();
    }
  }, {
    key: "editSvg",
    value: function editSvg() {
      var _this2 = this;

      if (this.options.readOnly) {
        return;
      } //open editor in modal


      this.editorModal = this.createModal();
      this.addClass(this.editorModal, 'formio-sketchpad-edit-dialog');
      this.addClass(this.editorModal.body, 'formio-sketchpad-edit-dialog-body');
      var toolbar = this.createToolbar();
      var metaInfoContainer = this.ce('div', {
        class: 'formio-sketchpad-meta-info'
      }, this.ce('span', {}, [this.totalMultiplierElement = this.ce('span', {}, this.t(Math.round(this.zoomInfo.totalMultiplier) * 100) / 100), this.t('x')]));
      this.editorModal.body.appendChild(toolbar);
      this.editorModal.body.appendChild(this.ce('div', {
        class: 'formio-edit-sketchpad-container'
      }, [this.editSketchpad.canvas.container, this.editSketchpad.background.container]));
      this.editorModal.body.appendChild(metaInfoContainer);
      this.saveSvgButton = this.ce('button', {
        class: 'btn btn-success formio-sketchpad-save-button'
      }, this.t('Save'));
      this.addEventListener(this.saveSvgButton, 'click', function () {
        _this2.saveSvg();

        _this2.editorModal.close(true);
      });
      this.editorModal.body.appendChild(this.saveSvgButton);
      this.editValue = _lodash.default.cloneDeep(this.dataValue);
      this.draw(this.editValue);
      var initialDialogClose = this.editorModal.close;

      this.editorModal.close = function (ignoreWarning) {
        if (ignoreWarning || confirm('Are you sure you want to close? Your unsaved progress will be lost')) {
          _this2.resetZoom();

          initialDialogClose();
        }
      };
    }
  }, {
    key: "saveSvg",
    value: function saveSvg() {
      this.dataValue = this.editValue;
      this.copySvgToView();
    }
  }, {
    key: "createToolbar",
    value: function createToolbar() {
      var _this3 = this;

      /* eslint-disable max-len */
      return this.ce('div', {
        class: 'btn-toolbar formio-sketchpad-toolbar',
        role: 'toolbar'
      }, [this.ce('div', {
        class: 'btn-group formio-sketchpad-toolbar-group',
        role: 'group'
      }, this.modeButtons = Object.keys(this.modes).map(function (key) {
        var mode = _this3.modes[key];

        var toolbarButton = _this3.ce('div', {
          class: "btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-".concat(key, " ").concat(_this3.state.mode === mode.state.mode ? ' active' : ''),
          onClick: function onClick() {
            return _this3.setState(mode.state);
          },
          title: mode.title
        }, _this3.ce('i', {
          class: "fa fa-".concat(mode.icon)
        }));

        if (mode.attach) {
          return mode.attach(toolbarButton);
        }

        return toolbarButton;
      })), this.ce('div', {
        class: 'btn-group formio-sketchpad-toolbar-group',
        role: 'group'
      }, this.styles.map(function (button) {
        var toolbarButtonIcon = _this3.ce('i', {
          class: "fa fa-".concat(button.icon)
        });

        var toolbarButton = _this3.ce('div', {
          class: "btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-".concat(button.property),
          title: button.title
        }, toolbarButtonIcon);

        if (button.attach) {
          return button.attach(toolbarButton);
        }

        return toolbarButton;
      })), this.ce('div', {
        class: 'btn-group float-right formio-sketchpad-toolbar-group',
        role: 'group'
      }, this.actions.map(function (button) {
        return _this3.ce('div', {
          class: "btn btn-secondary formio-sketchpad-toolbar-button formio-sketchpad-toolbar-button-".concat(button.action),
          onClick: function onClick() {
            return _this3[button.action]();
          },
          title: button.title
        }, _this3.ce('i', {
          class: "fa fa-".concat(button.icon)
        }));
      }))]);
      /* eslint-enable max-len */
    }
  }, {
    key: "attach",
    value: function attach() {
      var _this4 = this;

      // Set up mouse events.
      this.editSketchpad.canvas.svg.addEventListener('mousedown', function (e) {
        e.preventDefault();

        var offset = _this4.editSketchpad.canvas.svg.getBoundingClientRect(); //change cursor


        var cursor = 'default';

        if (_this4.modes[_this4.state.mode].cursor) {
          cursor = _this4.modes[_this4.state.mode].cursor.clicked || _this4.modes[_this4.state.mode].cursor.hover;
        }

        _this4.editSketchpad.canvas.svg.style.cursor = cursor;

        if (_this4.modes[_this4.state.mode].eventStart) {
          _this4.modes[_this4.state.mode].eventStart(_this4.getActualCoordinates({
            x: e.clientX - offset.left,
            y: e.clientY - offset.top
          }));
        }

        var mouseDrag = function mouseDrag(e) {
          e.preventDefault();

          var offset = _this4.editSketchpad.canvas.svg.getBoundingClientRect();

          if (_this4.modes[_this4.state.mode].drag) {
            _this4.modes[_this4.state.mode].drag(_this4.getActualCoordinates({
              x: e.clientX - offset.left,
              y: e.clientY - offset.top
            }));
          }
        };

        var mouseEnd = function mouseEnd(e) {
          e.preventDefault();

          _this4.editSketchpad.canvas.svg.removeEventListener('mousemove', mouseDrag);

          _this4.editSketchpad.canvas.svg.removeEventListener('mouseup', mouseEnd); //change cursor


          var cursor = 'default';

          if (_this4.modes[_this4.state.mode].cursor) {
            cursor = _this4.modes[_this4.state.mode].cursor.hover || cursor;
          }

          _this4.editSketchpad.canvas.svg.style.cursor = cursor;

          var offset = _this4.editSketchpad.canvas.svg.getBoundingClientRect();

          if (_this4.modes[_this4.state.mode].eventEnd) {
            _this4.modes[_this4.state.mode].eventEnd(_this4.getActualCoordinates({
              x: e.clientX - offset.left,
              y: e.clientY - offset.top
            }));
          }
        };

        _this4.editSketchpad.canvas.svg.addEventListener('mousemove', mouseDrag);

        _this4.editSketchpad.canvas.svg.addEventListener('mouseup', mouseEnd);

        return false;
      }); // Set up touch events.

      this.editSketchpad.canvas.svg.addEventListener('touchstart', function (e) {
        e.preventDefault();

        var offset = _this4.editSketchpad.canvas.svg.getBoundingClientRect();

        var touch = e.originalEvent.changedTouches[0]; //change cursor

        var cursor = 'default';

        if (_this4.modes[_this4.state.mode].cursor) {
          cursor = _this4.modes[_this4.state.mode].cursor.clicked || _this4.modes[_this4.state.mode].cursor.hover;
        }

        _this4.editSketchpad.canvas.svg.style.cursor = cursor;

        if (_this4.modes[_this4.state.mode].eventStart) {
          _this4.modes[_this4.state.mode].eventStart(_this4.getActualCoordinates({
            x: touch.pageX - offset.left,
            y: touch.pageY - offset.top
          }));
        }

        var touchDrag = function touchDrag(e) {
          e.preventDefault();

          var offset = _this4.editSketchpad.canvas.svg.getBoundingClientRect();

          var touch = e.originalEvent.changedTouches[0];

          if (_this4.modes[_this4.state.mode].drag) {
            _this4.modes[_this4.state.mode].drag(_this4.getActualCoordinates({
              x: touch.pageX - offset.left,
              y: touch.pageY - offset.top
            }));
          }
        };

        var touchEnd = function touchEnd(e) {
          e.preventDefault();

          _this4.editSketchpad.canvas.svg.removeEventListener('touchmove', touchDrag);

          _this4.editSketchpad.canvas.svg.removeEventListener('touchend', touchEnd);

          var offset = _this4.editSketchpad.canvas.svg.getBoundingClientRect();

          var touch = e.originalEvent.changedTouches[0]; //change cursor

          var cursor = 'default';

          if (_this4.modes[_this4.state.mode].cursor) {
            cursor = _this4.modes[_this4.state.mode].cursor.hover || cursor;
          }

          _this4.editSketchpad.canvas.svg.style.cursor = cursor;

          if (_this4.modes[_this4.state.mode].eventEnd) {
            _this4.modes[_this4.state.mode].eventEnd(_this4.getActualCoordinates({
              x: touch.pageX - offset.left,
              y: touch.pageY - offset.top
            }));
          }
        };

        _this4.editSketchpad.canvas.svg.addEventListener('touchmove', touchDrag);

        _this4.editSketchpad.canvas.svg.addEventListener('touchend', touchEnd);

        return false;
      });
      this.two.update();
    }
  }, {
    key: "addBackground",
    value: function addBackground() {
      var _this5 = this;

      var backgroundReadyPromise = new Promise(function (resolve, reject) {
        _this5.backgroundReady = {
          resolve: resolve,
          reject: reject
        };
      });
      this.backgroundReady.promise = backgroundReadyPromise;

      if (this.component.image) {
        this.setBackgroundImage(this.component.image);
        this.backgroundReady.resolve();
      } else if (this.component.imageUrl) {
        _Formio.default.makeStaticRequest(this.component.imageUrl, 'GET', null, {
          noToken: true
        }).then(function (image) {
          _this5.setBackgroundImage(image);

          _this5.backgroundReady.resolve();
        }).catch(function () {
          console.warn("Sketchpad background didn't load for component: ".concat(_this5.component.key));

          _this5.backgroundReady.resolve();
        });
      } //TODO make sure component works without background

    }
  }, {
    key: "setBackgroundImage",
    value: function setBackgroundImage(svgMarkup) {
      //TODO check that inserted html contains SVG tag on it
      this.viewSketchpad.background.container.innerHTML = svgMarkup;
      this.editSketchpad.background.container.innerHTML = svgMarkup;
      this.viewSketchpad.background.svg = this.viewSketchpad.background.container.firstElementChild;
      this.editSketchpad.background.svg = this.editSketchpad.background.container.firstElementChild; //set width and height of SVG element to component.width and component.height

      this.editSketchpad.background.svg.setAttribute('width', "".concat(this.component.width, "px"));
      this.editSketchpad.background.svg.setAttribute('height', "".concat(this.component.height, "px"));
      var viewBoxValue = this.editSketchpad.background.svg.getAttribute('viewBox');

      if (!viewBoxValue) {
        // since zooming works based on viewBox, we need to have explicitly defined value for it
        // if viewBox is not defined on SVG element, browser behaves like it's equal to "0 0 <current_width> <current_height>"
        // since background image should match dimensions of editor image, current width and height will always be equal to component.width and component.height
        // as a result:
        viewBoxValue = "0 0 ".concat(this.component.width, " ").concat(this.component.height);
        this.editSketchpad.background.svg.setAttribute('viewBox', viewBoxValue);
      }

      var _viewBoxValue$split$m = viewBoxValue.split(' ').map(parseFloat),
          _viewBoxValue$split$m2 = _slicedToArray(_viewBoxValue$split$m, 4),
          initialMinX = _viewBoxValue$split$m2[0],
          initialMinY = _viewBoxValue$split$m2[1],
          initialWidth = _viewBoxValue$split$m2[2],
          initialHeight = _viewBoxValue$split$m2[3];

      initialMinX = initialMinX || 0;
      initialMinY = initialMinY || 0;
      initialWidth = initialWidth || this.component.width;
      initialHeight = initialHeight || this.component.height;
      var width = this.component.width,
          height = this.component.height,
          minX = Math.round(initialMinX - (this.component.width - initialWidth) / 2),
          minY = Math.round(initialMinY - (this.component.height - initialHeight) / 2); //set initial zoom info for background SVG

      this.zoomInfo.backgroundViewBox.default = {
        minX: minX,
        minY: minY,
        width: width,
        height: height
      };
      this.viewSketchpad.background.svg.setAttribute('viewBox', "".concat(minX, " ").concat(minY, " ").concat(width, " ").concat(height));
      this.editSketchpad.background.svg.setAttribute('viewBox', "".concat(minX, " ").concat(minY, " ").concat(width, " ").concat(height));
      this.zoomInfo.backgroundViewBox.current = _lodash.default.cloneDeep(this.zoomInfo.backgroundViewBox.default);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.two.clear();
    }
  }, {
    key: "clearAll",
    value: function clearAll() {
      this.layers = [];
      this.editValue = [];
      this.clear();
      this.two.update();
    }
  }, {
    key: "draw",
    value: function draw(value) {
      var _this6 = this;

      this.clear();
      var layers = value.map(function (item) {
        return _this6.modes[item.mode].draw(item);
      });
      this.two.update();
      this.layers = layers;

      if (layers.length) {
        layers.forEach(function (layer, index) {
          layer._renderer.elem.addEventListener('click', function (e) {
            return _this6.click(e, index);
          });
        });
      }
    }
  }, {
    key: "click",
    value: function click(event, index) {
      console.log(event, index);
    }
  }, {
    key: "undo",
    value: function undo() {
      var value = this.editValue.slice();

      if (value.length === 0) {
        return;
      }

      this.deleted.push(value.pop());
      this.editValue = value;
      this.triggerChange();
      this.draw(value);
    }
  }, {
    key: "redo",
    value: function redo() {
      if (this.deleted.length === 0) {
        return;
      }

      var value = this.editValue.slice();
      value.push(this.deleted.pop());
      this.editValue = value;
      this.triggerChange();
      this.draw(value);
    }
  }, {
    key: "setState",
    value: function setState(state) {
      Object.assign(this.state, state);
      this.setActiveButton(this.state.mode); //change cursor

      this.editSketchpad.canvas.svg.style.cursor = _lodash.default.get(this.modes[this.state.mode], 'cursor.hover', 'default');
    }
  }, {
    key: "setActiveButton",
    value: function setActiveButton(mode) {
      var _this7 = this;

      this.modeButtons.forEach(function (button) {
        return _this7.removeClass(button, 'active');
      });
      Object.keys(this.modes).forEach(function (key, index) {
        if (_this7.modes[key].state.mode === mode) {
          _this7.addClass(_this7.modeButtons[index], 'active');
        }
      });
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      if (!this.two) {
        return;
      }

      this.draw(value);
      this.copySvgToView();
    }
  }, {
    key: "copySvgToView",
    value: function copySvgToView() {
      //clone view SVG element from editor
      var svgElement = this.editSketchpad.canvas.svg.cloneNode(true); //make view SVG responsive: remove height and width attribute, add viewBox attribute

      svgElement.removeAttribute('height');
      svgElement.removeAttribute('width');
      svgElement.style.cursor = 'pointer';
      svgElement.setAttribute('viewBox', "0 0 ".concat(this.component.width, " ").concat(this.component.height));
      this.viewSketchpad.canvas.container.innerHTML = '';
      this.viewSketchpad.canvas.container.appendChild(svgElement);
    }
  }, {
    key: "zoom",
    value: function zoom(coordinates, multiplier) {
      this.setTotalMultiplier(this.zoomInfo.totalMultiplier * multiplier); //calculate new viewBox width for canvas

      this.zoomInfo.canvasViewBox.current.width = Math.round(this.zoomInfo.canvasViewBox.default.width / this.zoomInfo.totalMultiplier);
      this.zoomInfo.canvasViewBox.current.height = Math.round(this.zoomInfo.canvasViewBox.default.height / this.zoomInfo.totalMultiplier); //calculate new viewBox width for background

      this.zoomInfo.backgroundViewBox.current.width = Math.round(this.zoomInfo.backgroundViewBox.default.width / this.zoomInfo.totalMultiplier);
      this.zoomInfo.backgroundViewBox.current.height = Math.round(this.zoomInfo.backgroundViewBox.default.height / this.zoomInfo.totalMultiplier);

      if (this.zoomInfo.canvasViewBox.current.width > this.component.width && this.zoomInfo.canvasViewBox.current.height > this.component.height) {
        //if should get less than initial size, change editor size instead of viewBox size
        this.setEditorSize(this.component.width * this.zoomInfo.totalMultiplier, this.component.height * this.zoomInfo.totalMultiplier); //restore default viewBox values for canvas and background

        this.zoomInfo.canvasViewBox.current = _lodash.default.cloneDeep(this.zoomInfo.canvasViewBox.default);
        this.zoomInfo.backgroundViewBox.current = _lodash.default.cloneDeep(this.zoomInfo.backgroundViewBox.default);
      } else {
        //if should get more than initial size, change viewBox size
        //restore editor size if needed
        if (this.two.width !== this.component.width || this.two.height !== this.component.height) {
          this.setEditorSize(this.component.width, this.component.height);
        } //calculate SVG offset so that coordinate would be center of zoomed image


        this.zoomInfo.canvasViewBox.current.minX = coordinates.canvas.x - this.zoomInfo.canvasViewBox.current.width / 2;
        this.zoomInfo.canvasViewBox.current.minY = coordinates.canvas.y - this.zoomInfo.canvasViewBox.current.height / 2; //do same for background SVG

        /* eslint-disable max-len */

        this.zoomInfo.backgroundViewBox.current.minX = coordinates.background.x - this.zoomInfo.backgroundViewBox.current.width / 2;
        this.zoomInfo.backgroundViewBox.current.minY = coordinates.background.y - this.zoomInfo.backgroundViewBox.current.height / 2;
        /* eslint-enable max-len */

        this.normalizeSvgOffset();
      }

      this.updateSvgViewBox();
    }
  }, {
    key: "resetZoom",
    value: function resetZoom() {
      this.zoom({
        canvas: {
          x: 0,
          y: 0
        },
        background: {
          x: 0,
          y: 0
        }
      }, 1 / this.zoomInfo.totalMultiplier);
    }
  }, {
    key: "getActualCoordinates",
    value: function getActualCoordinates(coordinate) {
      //recalculate coordinate taking into account current zoom
      var actualCoordinates = {
        canvas: {},
        background: {}
      }; //TODO check if coordinates are different

      /* eslint-disable max-len */
      //canvas

      actualCoordinates.canvas.x = Math.round(coordinate.x / this.zoomInfo.totalMultiplier + this.zoomInfo.canvasViewBox.current.minX);
      actualCoordinates.canvas.y = Math.round(coordinate.y / this.zoomInfo.totalMultiplier + this.zoomInfo.canvasViewBox.current.minY); //background

      actualCoordinates.background.x = Math.round(coordinate.x / this.zoomInfo.totalMultiplier * (this.zoomInfo.backgroundViewBox.default.width / this.component.width) + this.zoomInfo.backgroundViewBox.current.minX);
      actualCoordinates.background.y = Math.round(coordinate.y / this.zoomInfo.totalMultiplier * (this.zoomInfo.backgroundViewBox.default.height / this.component.height) + this.zoomInfo.backgroundViewBox.current.minY);
      /* eslint-enable max-len */

      return actualCoordinates;
    }
  }, {
    key: "dragImage",
    value: function dragImage(offset) {
      //calculate new offsets for SVG
      //canvas
      this.zoomInfo.canvasViewBox.current.minX = this.zoomInfo.canvasViewBox.current.minX - offset.canvas.x;
      this.zoomInfo.canvasViewBox.current.minY = this.zoomInfo.canvasViewBox.current.minY - offset.canvas.y; //background

      this.zoomInfo.backgroundViewBox.current.minX = this.zoomInfo.backgroundViewBox.current.minX - offset.background.x;
      this.zoomInfo.backgroundViewBox.current.minY = this.zoomInfo.backgroundViewBox.current.minY - offset.background.y;
      this.normalizeSvgOffset();
      this.updateSvgViewBox();
    }
  }, {
    key: "normalizeSvgOffset",
    value: function normalizeSvgOffset() {
      /* eslint-disable max-len */
      //don't let offset go out of SVG on the left and on the top
      //canvas
      this.zoomInfo.canvasViewBox.current.minX = this.zoomInfo.canvasViewBox.current.minX < this.zoomInfo.canvasViewBox.default.minX ? this.zoomInfo.canvasViewBox.default.minX : this.zoomInfo.canvasViewBox.current.minX;
      this.zoomInfo.canvasViewBox.current.minY = this.zoomInfo.canvasViewBox.current.minY < this.zoomInfo.canvasViewBox.default.minY ? this.zoomInfo.canvasViewBox.default.minY : this.zoomInfo.canvasViewBox.current.minY; //background

      this.zoomInfo.backgroundViewBox.current.minX = this.zoomInfo.backgroundViewBox.current.minX < this.zoomInfo.backgroundViewBox.default.minX ? this.zoomInfo.backgroundViewBox.default.minX : this.zoomInfo.backgroundViewBox.current.minX;
      this.zoomInfo.backgroundViewBox.current.minY = this.zoomInfo.backgroundViewBox.current.minY < this.zoomInfo.backgroundViewBox.default.minY ? this.zoomInfo.backgroundViewBox.default.minY : this.zoomInfo.backgroundViewBox.current.minY; //don't let offset go out of SVG on the right and on the bottom
      //canvas

      var canvasMaxOffsetX = this.zoomInfo.canvasViewBox.default.width - this.zoomInfo.canvasViewBox.current.width,
          canvasMaxOffsetY = this.zoomInfo.canvasViewBox.default.height - this.zoomInfo.canvasViewBox.current.height;
      this.zoomInfo.canvasViewBox.current.minX = this.zoomInfo.canvasViewBox.current.minX > canvasMaxOffsetX ? canvasMaxOffsetX : this.zoomInfo.canvasViewBox.current.minX;
      this.zoomInfo.canvasViewBox.current.minY = this.zoomInfo.canvasViewBox.current.minY > canvasMaxOffsetY ? canvasMaxOffsetY : this.zoomInfo.canvasViewBox.current.minY; //background

      var backgroundMaxOffsetX = this.zoomInfo.backgroundViewBox.default.width - this.zoomInfo.backgroundViewBox.current.width + this.zoomInfo.backgroundViewBox.default.minX,
          backgroundMaxOffsetY = this.zoomInfo.backgroundViewBox.default.height - this.zoomInfo.backgroundViewBox.current.height + this.zoomInfo.backgroundViewBox.default.minY;
      this.zoomInfo.backgroundViewBox.current.minX = this.zoomInfo.backgroundViewBox.current.minX > backgroundMaxOffsetX ? backgroundMaxOffsetX : this.zoomInfo.backgroundViewBox.current.minX;
      this.zoomInfo.backgroundViewBox.current.minY = this.zoomInfo.backgroundViewBox.current.minY > backgroundMaxOffsetY ? backgroundMaxOffsetY : this.zoomInfo.backgroundViewBox.current.minY;
      /* eslint-enable max-len */
    }
  }, {
    key: "updateSvgViewBox",
    value: function updateSvgViewBox() {
      //set viewBox so that SVG gets zoomed to the proper area according to zoomInfo

      /* eslint-disable max-len */
      this.editSketchpad.canvas.svg.setAttribute('viewBox', "".concat(this.zoomInfo.canvasViewBox.current.minX, " ").concat(this.zoomInfo.canvasViewBox.current.minY, " ").concat(this.zoomInfo.canvasViewBox.current.width, " ").concat(this.zoomInfo.canvasViewBox.current.height));
      this.editSketchpad.background.svg.setAttribute('viewBox', "".concat(this.zoomInfo.backgroundViewBox.current.minX, " ").concat(this.zoomInfo.backgroundViewBox.current.minY, " ").concat(this.zoomInfo.backgroundViewBox.current.width, " ").concat(this.zoomInfo.backgroundViewBox.current.height));
      /* eslint-enable max-len */
    }
  }, {
    key: "setTotalMultiplier",
    value: function setTotalMultiplier(multiplier) {
      this.zoomInfo.totalMultiplier = multiplier;
      this.totalMultiplierElement.innerHTML = this.t(Math.round(multiplier * 100) / 100);
    }
  }, {
    key: "setEditorSize",
    value: function setEditorSize(width, height) {
      this.two.width = width;
      this.two.height = height;
      this.two.update(); //change width of background svg so it matches editor SVG

      this.editSketchpad.background.svg.style.width = width;
      this.editSketchpad.background.svg.style.height = height;
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return [];
    }
  }, {
    key: "modes",
    get: function get() {
      var _this8 = this;

      return {
        pencil: {
          icon: 'pencil',
          title: 'Pencil',
          state: {
            mode: 'pencil'
          },
          eventStart: function eventStart(coordinates) {
            _this8.points = [coordinates.canvas];
            _this8.prev = coordinates.canvas;
            _this8.curve = _this8.two.makeCurve([new _two.default.Vector(_this8.prev.x, _this8.prev.y), new _two.default.Vector(coordinates.canvas.x, coordinates.canvas.y + 1)], true);
            _this8.curve.noFill().stroke = _this8.state.stroke;
            _this8.curve.linewidth = _this8.state.linewidth;

            _this8.curve.vertices.forEach(function (v) {
              return v.addSelf(_this8.curve.translation);
            });

            _this8.curve.translation.clear();

            _this8.two.update();

            _this8.layers.push(_this8.curve);

            _this8.curve._renderer.elem.addEventListener('click', function (e) {
              return _this8.click(e, _this8.layers.length);
            });
          },
          drag: function drag(coordinates) {
            _this8.points.push(coordinates.canvas);

            _this8.curve.vertices.push(new _two.default.Vector(coordinates.canvas.x, coordinates.canvas.y));

            _this8.two.update();

            _this8.prev = coordinates.canvas;
          },
          eventEnd: function eventEnd() {
            var value = _this8.editValue.slice();

            value.push(Object.assign({}, _this8.state, {
              points: _this8.points
            }));
            _this8.editValue = value;

            _this8.triggerChange();
          },
          draw: function draw(state) {
            var layer = _this8.two.makeCurve(state.points.map(function (point) {
              return new _two.default.Vector(point.x, point.y);
            }), true);

            layer.noFill().stroke = state.stroke;
            layer.linewidth = state.linewidth;
            layer.vertices.forEach(function (v) {
              return v.addSelf(layer.translation);
            });
            layer.translation.clear();
            return layer;
          }
        },
        line: {
          icon: 'minus',
          title: 'Line',
          state: {
            mode: 'line'
          },
          eventStart: function eventStart(coordinates) {
            _this8.center = coordinates.canvas;
            _this8.line = _this8.two.makeLine(coordinates.canvas.x, coordinates.canvas.y, coordinates.canvas.x, coordinates.canvas.y);
            _this8.line.fill = _this8.state.fill;
            _this8.line.stroke = _this8.state.stroke;
            _this8.line.linewidth = _this8.state.linewidth;

            _this8.two.update();

            _this8.layers.push(_this8.line);

            var index = _this8.layers.length - 1;

            _this8.line._renderer.elem.addEventListener('click', function (e) {
              return _this8.click(e, index);
            });
          },
          drag: function drag(coordinates) {
            _this8.line.vertices[1].x = coordinates.canvas.x;
            _this8.line.vertices[1].y = coordinates.canvas.y;

            _this8.two.update();
          },
          eventEnd: function eventEnd() {
            var value = _this8.editValue.slice();

            var vertices = _this8.line.vertices.map(function (vertice) {
              return {
                x: vertice.x,
                y: vertice.y
              };
            });

            value.push(Object.assign({}, _this8.state, {
              vertices: vertices
            }));
            _this8.editValue = value;

            _this8.triggerChange();
          },
          draw: function draw(state) {
            var layer = _this8.two.makeLine(state.vertices[0].x, state.vertices[0].y, state.vertices[1].x, state.vertices[1].y);

            layer.fill = state.fill;
            layer.stroke = state.stroke;
            layer.linewidth = state.linewidth;
            return layer;
          }
        },
        circle: {
          icon: 'circle',
          title: 'Circle',
          state: {
            mode: 'circle'
          },
          eventStart: function eventStart(coordinates) {
            _this8.center = coordinates.canvas;

            var layer = _this8.two.makeCircle(coordinates.canvas.x, coordinates.canvas.y, _this8.state.circleSize);

            layer.fill = _this8.state.fill;
            layer.stroke = _this8.state.stroke;
            layer.linewidth = _this8.state.linewidth;

            _this8.two.update();

            _this8.layers.push(layer);

            var index = _this8.layers.length - 1;

            layer._renderer.elem.addEventListener('click', function (e) {
              return _this8.click(e, index);
            });
          },
          drag: function drag() {},
          eventEnd: function eventEnd() {
            var value = _this8.editValue.slice();

            value.push(Object.assign({}, _this8.state, {
              center: _this8.center
            }));
            _this8.editValue = value;

            _this8.triggerChange();
          },
          draw: function draw(state) {
            var layer = _this8.two.makeCircle(state.center.x, state.center.y, state.circleSize);

            layer.fill = state.fill;
            layer.stroke = state.stroke;
            layer.linewidth = state.linewidth;
            return layer;
          },
          attach: function attach(element) {
            var radiusInput = _this8.ce('input', {
              type: 'number',
              class: 'formio-sketchpad-toolbar-input formio-sketchpad-radius-input',
              onChange: function onChange(e) {
                _this8.state.circleSize = e.target.value;
              }
            });

            radiusInput.value = _this8.state.circleSize;
            element.appendChild(radiusInput);
            return element;
          }
        },
        rectangle: {
          icon: 'square-o',
          cursor: {
            hover: 'crosshair'
          },
          title: 'Rectangle',
          state: {
            mode: 'rectangle'
          },
          eventStart: function eventStart(coordinates) {
            _this8.dragStartPoint = coordinates.canvas;
          },
          drag: function drag(coordinates) {
            _this8.dragEndPoint = coordinates.canvas;

            if (_this8.rectangle) {
              _this8.rectangle.remove();
            }

            _this8.width = Math.abs(_this8.dragEndPoint.x - _this8.dragStartPoint.x);
            _this8.height = Math.abs(_this8.dragEndPoint.y - _this8.dragStartPoint.y);
            _this8.center = {
              x: Math.min(_this8.dragStartPoint.x, _this8.dragEndPoint.x) + _this8.width / 2,
              y: Math.min(_this8.dragStartPoint.y, _this8.dragEndPoint.y) + _this8.height / 2
            };
            _this8.rectangle = _this8.two.makeRectangle(_this8.center.x, _this8.center.y, _this8.width, _this8.height);
            _this8.rectangle.fill = _this8.state.fill;
            _this8.rectangle.stroke = _this8.state.stroke;
            _this8.rectangle.linewidth = _this8.state.linewidth;

            _this8.two.update();

            _this8.layers.push(_this8.rectangle);

            var index = _this8.layers.length - 1;

            _this8.rectangle._renderer.elem.addEventListener('click', function (e) {
              return _this8.click(e, index);
            });
          },
          eventEnd: function eventEnd() {
            var value = _this8.editValue.slice();

            delete _this8.rectangle;
            var rectangleState = {
              center: _this8.center,
              width: _this8.width,
              height: _this8.height
            };
            value.push(Object.assign({}, _this8.state, rectangleState));
            _this8.editValue = value;

            _this8.triggerChange();
          },
          draw: function draw(state) {
            var layer = _this8.two.makeRectangle(state.center.x, state.center.y, state.width, state.height);

            layer.fill = state.fill;
            layer.stroke = state.stroke;
            layer.linewidth = state.linewidth;
            return layer;
          }
        },
        zoomIn: {
          icon: 'search-plus',
          cursor: {
            hover: 'zoom-in'
          },
          title: 'Zoom In',
          state: {
            mode: 'zoomIn'
          },
          eventStart: function eventStart(coordinates) {
            _this8.zoom(coordinates, _this8.zoomInfo.multiplier);
          }
        },
        zoomOut: {
          icon: 'search-minus',
          cursor: {
            hover: 'zoom-out'
          },
          title: 'Zoom Out',
          state: {
            mode: 'zoomOut'
          },
          eventStart: function eventStart(coordinates) {
            _this8.zoom(coordinates, 1 / _this8.zoomInfo.multiplier);
          }
        },
        drag: {
          icon: 'hand-paper-o',
          title: 'Drag Zoomed Image',
          cursor: {
            hover: 'grab',
            clicked: 'grabbing'
          },
          state: {
            mode: 'drag'
          },
          eventStart: function eventStart(coordinates) {
            _this8.dragStartPoint = coordinates;
          },
          drag: function drag(coordinates) {
            if (!_this8.dragLastPoint) {
              _this8.dragLastPoint = _this8.dragStartPoint;
            }

            var offset = {
              canvas: {
                x: Math.round(coordinates.canvas.x - _this8.dragStartPoint.canvas.x),
                y: Math.round(coordinates.canvas.y - _this8.dragStartPoint.canvas.y)
              },
              background: {
                x: Math.round(coordinates.background.x - _this8.dragStartPoint.background.x),
                y: Math.round(coordinates.background.y - _this8.dragStartPoint.background.y)
              }
            };

            if (offset.canvas.x !== 0 || offset.canvas.y !== 0 || offset.background.x !== 0 || offset.background.y !== 0) {
              _this8.dragImage(offset);

              _this8.dragLastPoint = coordinates;
            }
          }
        }
      };
    }
  }, {
    key: "styles",
    get: function get() {
      var _this9 = this;

      return [{
        icon: 'square-o',
        title: 'Stroke Color',
        type: 'colorpicker',
        property: 'stroke',
        attach: function attach(element) {
          var picker = new _vanillaPicker.default(element);
          picker.setColor(_this9.state.stroke, true);

          picker.onChange = function (color) {
            _this9.state.stroke = color.rgbaString;
            element.style.color = color.rgbaString;
          };

          return element;
        }
      }, {
        icon: 'square',
        title: 'Fill Color',
        type: 'colorpicker',
        property: 'fill',
        attach: function attach(element) {
          var picker = new _vanillaPicker.default(element);
          picker.setColor(_this9.state.fill, true);

          picker.onChange = function (color) {
            _this9.state.fill = color.rgbaString;
            element.style.color = color.rgbaString;
          };

          return element;
        }
      }, {
        icon: 'minus',
        title: 'Line Width',
        type: 'number',
        property: 'linewidth',
        attach: function attach(element) {
          var widthInput = _this9.ce('input', {
            type: 'number',
            class: 'formio-sketchpad-toolbar-input formio-sketchpad-linewidth-input',
            onChange: function onChange(e) {
              _this9.state.linewidth = e.target.value;
            }
          });

          widthInput.value = _this9.state.linewidth;
          element.appendChild(widthInput);
          return element;
        }
      }];
    }
  }, {
    key: "actions",
    get: function get() {
      return [{
        icon: 'undo',
        action: 'undo',
        title: 'Undo'
      }, {
        icon: 'repeat',
        action: 'redo',
        title: 'Redo'
      }, {
        icon: 'search',
        action: 'resetZoom',
        title: 'Reset Zoom'
      }, {
        icon: 'ban',
        action: 'clearAll',
        title: 'Clear All'
      }];
    }
  }, {
    key: "dataReady",
    get: function get() {
      return this.backgroundReady.promise;
    }
  }]);

  return Sketchpad;
}(_Base2.default);

exports.default = Sketchpad;