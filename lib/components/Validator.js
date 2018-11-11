"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.is-nan");

require("core-js/modules/es6.function.name");

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../utils/utils");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  get: _lodash.default.get,
  each: _lodash.default.each,
  has: _lodash.default.has,
  checkValidator: function checkValidator(component, validator, setting, value, data) {
    var result = null; // Allow each component to override their own validators by implementing the validator.method

    if (validator.method && typeof component[validator.method] === 'function') {
      result = component[validator.method](setting, value, data);
    } else {
      result = validator.check.call(this, component, setting, value, data);
    }

    if (typeof result === 'string') {
      return result;
    }

    if (!result) {
      return validator.message.call(this, component, setting);
    }

    return '';
  },
  validate: function validate(component, validator, value, data) {
    if (validator.key && _lodash.default.has(component.component, validator.key)) {
      var setting = this.get(component.component, validator.key);
      return this.checkValidator(component, validator, setting, value, data);
    }

    return this.checkValidator(component, validator, null, value, data);
  },
  check: function check(component, data) {
    var _this = this;

    var result = '';
    var value = component.validationValue;
    data = data || component.data;

    _lodash.default.each(component.validators, function (name) {
      if (_this.validators.hasOwnProperty(name)) {
        var validator = _this.validators[name];

        if (component.validateMultiple(value)) {
          _lodash.default.each(value, function (val) {
            result = _this.validate(component, validator, val, data);

            if (result) {
              return false;
            }
          });
        } else {
          result = _this.validate(component, validator, value, data);
        }

        if (result) {
          return false;
        }
      }
    });

    var validateCustom = _lodash.default.get(component, 'component.validate.custom');

    var customErrorMessage = _lodash.default.get(component, 'component.validate.customMessage');

    if (result && (customErrorMessage || validateCustom)) {
      result = component.t(customErrorMessage || result, {
        data: component.data
      });
    }

    return result;
  },
  validators: {
    required: {
      key: 'validate.required',
      method: 'validateRequired',
      message: function message(component) {
        return component.t(component.errorMessage('required'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        if (!(0, _utils.boolValue)(setting)) {
          return true;
        }

        return !component.isEmpty(value);
      }
    },
    min: {
      key: 'validate.min',
      message: function message(component, setting) {
        return component.t(component.errorMessage('min'), {
          field: component.errorLabel,
          min: parseFloat(setting),
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        var min = parseFloat(setting);

        if (Number.isNaN(min) || !_lodash.default.isNumber(value)) {
          return true;
        }

        return parseFloat(value) >= min;
      }
    },
    max: {
      key: 'validate.max',
      message: function message(component, setting) {
        return component.t(component.errorMessage('max'), {
          field: component.errorLabel,
          max: parseFloat(setting),
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        var max = parseFloat(setting);

        if (Number.isNaN(max) || !_lodash.default.isNumber(value)) {
          return true;
        }

        return parseFloat(value) <= max;
      }
    },
    minLength: {
      key: 'validate.minLength',
      message: function message(component, setting) {
        return component.t(component.errorMessage('minLength'), {
          field: component.errorLabel,
          length: setting - 1,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        var minLength = parseInt(setting, 10);

        if (!minLength || typeof value !== 'string') {
          return true;
        }

        return value.length >= minLength;
      }
    },
    maxLength: {
      key: 'validate.maxLength',
      message: function message(component, setting) {
        return component.t(component.errorMessage('maxLength'), {
          field: component.errorLabel,
          length: setting + 1,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        var maxLength = parseInt(setting, 10);

        if (!maxLength || typeof value !== 'string') {
          return true;
        }

        return value.length <= maxLength;
      }
    },
    maxWords: {
      key: 'validate.maxWords',
      message: function message(component, setting) {
        return component.t(component.errorMessage('maxWords'), {
          field: component.errorLabel,
          length: setting + 1,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        var maxWords = parseInt(setting, 10);

        if (!maxWords || typeof value !== 'string') {
          return true;
        }

        return value.trim().split(/\s+/).length <= maxWords;
      }
    },
    minWords: {
      key: 'validate.minWords',
      message: function message(component, setting) {
        return component.t(component.errorMessage('minWords'), {
          field: component.errorLabel,
          length: setting + 1,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        var minWords = parseInt(setting, 10);

        if (!minWords || typeof value !== 'string') {
          return true;
        }

        return value.trim().split(/\s+/).length >= minWords;
      }
    },
    email: {
      message: function message(component) {
        return component.t(component.errorMessage('invalid_email'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        /* eslint-disable max-len */
        // From http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        /* eslint-enable max-len */
        // Allow emails to be valid if the component is pristine and no value is provided.

        return !value || re.test(value);
      }
    },
    url: {
      message: function message(component) {
        return component.t(component.errorMessage('invalid_url'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        /* eslint-disable max-len */
        // From https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
        var re = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
        /* eslint-enable max-len */
        // Allow urls to be valid if the component is pristine and no value is provided.

        return !value || re.test(value);
      }
    },
    date: {
      message: function message(component) {
        return component.t(component.errorMessage('invalid_date'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        return value !== 'Invalid date';
      }
    },
    pattern: {
      key: 'validate.pattern',
      message: function message(component, setting) {
        return component.t(_lodash.default.get(component, 'component.validate.patternMessage', component.errorMessage('pattern'), {
          field: component.errorLabel,
          pattern: setting,
          data: component.data
        }));
      },
      check: function check(component, setting, value) {
        var pattern = setting;

        if (!pattern) {
          return true;
        }

        var regex = new RegExp("^".concat(pattern, "$"));
        return regex.test(value);
      }
    },
    json: {
      key: 'validate.json',
      check: function check(component, setting, value, data) {
        if (!setting) {
          return true;
        }

        var valid = component.evaluate(setting, {
          data: data,
          input: value
        });

        if (valid === null) {
          return true;
        }

        return valid;
      }
    },
    mask: {
      message: function message(component) {
        return component.t(component.errorMessage('mask'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value) {
        var inputMask;

        if (component.isMultipleMasksField) {
          var maskName = value ? value.maskName : undefined;
          var formioInputMask = component.getMaskByName(maskName);

          if (formioInputMask) {
            inputMask = (0, _utils.getInputMask)(formioInputMask);
          }

          value = value ? value.value : value;
        } else {
          inputMask = component._inputMask;
        }

        if (value && inputMask) {
          return (0, _utils.matchInputMask)(value, inputMask);
        }

        return true;
      }
    },
    custom: {
      key: 'validate.custom',
      message: function message(component) {
        return component.t(component.errorMessage('custom'), {
          field: component.errorLabel,
          data: component.data
        });
      },
      check: function check(component, setting, value, data) {
        if (!setting) {
          return true;
        }

        var valid = component.evaluate(setting, {
          valid: true,
          data: data,
          input: value
        }, 'valid', true);

        if (valid === null) {
          return true;
        }

        return valid;
      }
    },
    maxDate: {
      key: 'maxDate',
      message: function message(component, setting) {
        var date = (0, _utils.getDateSetting)(setting);
        return component.t(component.errorMessage('maxDate'), {
          field: component.errorLabel,
          maxDate: (0, _moment.default)(date).format(component.format)
        });
      },
      check: function check(component, setting, value) {
        var date = (0, _moment.default)(value);
        var maxDate = (0, _utils.getDateSetting)(setting);

        if (_lodash.default.isNull(maxDate)) {
          return true;
        } else {
          maxDate.setHours(0, 0, 0, 0);
        }

        return date.isBefore(maxDate) || date.isSame(maxDate);
      }
    },
    minDate: {
      key: 'minDate',
      message: function message(component, setting) {
        var date = (0, _utils.getDateSetting)(setting);
        return component.t(component.errorMessage('minDate'), {
          field: component.errorLabel,
          minDate: (0, _moment.default)(date).format(component.format)
        });
      },
      check: function check(component, setting, value) {
        var date = (0, _moment.default)(value);
        var minDate = (0, _utils.getDateSetting)(setting);

        if (_lodash.default.isNull(minDate)) {
          return true;
        } else {
          minDate.setHours(0, 0, 0, 0);
        }

        return date.isAfter(minDate) || date.isSame(minDate);
      }
    }
  }
};
exports.default = _default;