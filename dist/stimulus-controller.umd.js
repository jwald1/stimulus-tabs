(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('stimulus')) :
  typeof define === 'function' && define.amd ? define(['exports', 'stimulus'], factory) :
  (global = global || self, factory(global.StimulusTabs = {}, global.Stimulus));
}(this, function (exports, stimulus) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) { descriptor.writable = true; }
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) { _defineProperties(Constructor.prototype, protoProps); }
    if (staticProps) { _defineProperties(Constructor, staticProps); }
    return Constructor;
  }

  var createClass = _createClass;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) { setPrototypeOf(subClass, superClass); }
  }

  var inherits = _inherits;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function defineShowActions(controller) {
    var controllerConstructor = controller.constructor;
    var prototype = controllerConstructor.prototype;

    controller._tabs.forEach(function (tabName) {
      if (!(actionMethodName(tabName) in prototype)) {
        prototype[actionMethodName(tabName)] = function (e) {
          e && e.preventDefault();

          this._tabState.setSelectedTab(tabName);

          if (this.selectedTab !== this.previousTab) {
            this._showSelectedTabContent();

            this._addSelectedTabClass();

            this.selected();
          }
        };
      }
    });
  }
  function actionMethodName(tabName) {
    return "show" + capitalize(tabName);
  }

  function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  var TabState =
  /*#__PURE__*/
  function () {
    function TabState(controller) {
      classCallCheck(this, TabState);

      this.controller = controller;
    }

    createClass(TabState, [{
      key: "setSelectedTab",
      value: function setSelectedTab(tabName) {
        var setPrevious = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (setPrevious) {
          this.previousTab = this.selectedTabName;
        }

        this.selectedTab = tabName;
      }
    }, {
      key: "findContent",
      value: function findContent(tabName) {
        return this.targets.find(tabName);
      }
    }, {
      key: "findTab",
      value: function findTab(tabName) {
        var selector = this.tabSelector(tabName);
        return this.element.querySelector(selector);
      }
    }, {
      key: "tabSelector",
      value: function tabSelector(tabName) {
        return "[data-action$='".concat(this.identifier, "#").concat(actionMethodName(tabName), "']");
      }
    }, {
      key: "selectedContent",
      get: function get() {
        return this.findContent(this.selectedTabName);
      }
    }, {
      key: "previousContent",
      get: function get() {
        return this.findContent(this.previousTabName);
      }
    }, {
      key: "selectedTab",
      get: function get() {
        return this.findTab(this.selectedTabName);
      },
      set: function set(tabName) {
        this.data.set('selectedTab', tabName);
      }
    }, {
      key: "previousTab",
      get: function get() {
        var tabName = this.previousTabName;
        return tabName && this.findTab(tabName);
      },
      set: function set(tabName) {
        this.data.set('previousTab', tabName);
      }
    }, {
      key: "selectedTabName",
      get: function get() {
        return this.data.get('selectedTab');
      }
    }, {
      key: "previousTabName",
      get: function get() {
        return this.data.get('previousTab');
      }
    }, {
      key: "identifier",
      get: function get() {
        return this.controller.identifier;
      }
    }, {
      key: "element",
      get: function get() {
        return this.controller.element;
      }
    }, {
      key: "data",
      get: function get() {
        return this.controller.data;
      }
    }, {
      key: "targets",
      get: function get() {
        return this.controller.targets;
      }
    }]);

    return TabState;
  }();

  var defaultSelectedTabClass = "selected-tab";

  var TabsController =
  /*#__PURE__*/
  function (_Controller) {
    inherits(TabsController, _Controller);

    function TabsController() {
      classCallCheck(this, TabsController);

      return possibleConstructorReturn(this, getPrototypeOf(TabsController).apply(this, arguments));
    }

    createClass(TabsController, [{
      key: "initialize",
      // overwirde in subclass
      // overwirde in subclass
      value: function initialize() {
        defineShowActions(this);
        this._tabState = new TabState(this);
      }
    }, {
      key: "connect",
      value: function connect() {
        if (this._tabs.length > 0) {
          this._hideTabs();

          this._tabState.setSelectedTab(this._initialTabName, false);

          this._showSelectedTabContent();

          this._addSelectedTabClass();
        }
      }
    }, {
      key: "selected",
      value: function selected() {// overwirde in subclass
      }
    }, {
      key: "_hideTabs",
      value: function _hideTabs() {
        var _this = this;

        this._tabs.forEach(function (tabName) {
          if (_this._initialTabName === tabName) {
            return;
          }

          _this._hideContent(_this.targets.find(tabName));
        });
      }
    }, {
      key: "_showSelectedTabContent",
      value: function _showSelectedTabContent() {
        this._showContent(this.selectedContent);

        this._hideContent(this.previousContent);
      }
    }, {
      key: "_hideContent",
      value: function _hideContent(el) {
        el && (el.style.display = "none");
      }
    }, {
      key: "_showContent",
      value: function _showContent(el) {
        el && (el.style.display = "");
      }
    }, {
      key: "_addSelectedTabClass",
      value: function _addSelectedTabClass() {
        this.selectedTab.classList.add(this._selectedTabClass);

        this._removeSelectedTabClassFromPreviousTab();
      }
    }, {
      key: "_removeSelectedTabClassFromPreviousTab",
      value: function _removeSelectedTabClassFromPreviousTab() {
        this.previousTab && this.previousTab.classList.remove(this._selectedTabClass);
      }
    }, {
      key: "selectedContent",
      get: function get() {
        return this._tabState.selectedContent;
      }
    }, {
      key: "previousContent",
      get: function get() {
        return this._tabState.previousContent;
      }
    }, {
      key: "selectedTab",
      get: function get() {
        return this._tabState.selectedTab;
      }
    }, {
      key: "previousTab",
      get: function get() {
        return this._tabState.previousTab;
      }
    }, {
      key: "_initialTabName",
      get: function get() {
        return this._tabState.selectedTabName || this._tabs[0];
      }
    }, {
      key: "_tabs",
      get: function get() {
        var tabsDefinedOnElement = this.element.dataset.tabs;

        if (tabsDefinedOnElement) {
          return tabsDefinedOnElement.trim().split(/\s+/);
        } else {
          this.constructor.tabs;
        }
      }
    }, {
      key: "_selectedTabClass",
      get: function get() {
        return this.element.dataset.selectedTabClass || this.constructor.selectedTabClass || defaultSelectedTabClass;
      }
    }]);

    return TabsController;
  }(stimulus.Controller);

  defineProperty(TabsController, "tabs", []);

  defineProperty(TabsController, "selectedTabClass", "");

  exports.default = TabsController;
  exports.TabsController = TabsController;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=stimulus-controller.umd.js.map
