(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["reactUltimatePagination"] = factory(require("react"));
	else
		root["reactUltimatePagination"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ITEM_TYPES = exports.createUltimatePagination = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ultimatePagination = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var renderItemComponentFunctionFactory = function renderItemComponentFunctionFactory(itemTypeToComponent, currentPage, onChange) {
	  var onItemClickFunctionFactory = function onItemClickFunctionFactory(value) {
	    return function () {
	      if (onChange && currentPage !== value) {
	        onChange(value);
	      }
	    };
	  };
	
	  return function (item) {
	    var ItemComponent = itemTypeToComponent[item.type];
	    var onItemClick = onItemClickFunctionFactory(item.value);
	    return _react2.default.createElement(ItemComponent, _extends({ onClick: onItemClick }, item));
	  };
	};
	
	var createUltimatePagination = exports.createUltimatePagination = function createUltimatePagination(_ref) {
	  var itemTypeToComponent = _ref.itemTypeToComponent,
	      _ref$WrapperComponent = _ref.WrapperComponent,
	      WrapperComponent = _ref$WrapperComponent === undefined ? 'div' : _ref$WrapperComponent;
	
	  var UltimatePaginationComponent = function UltimatePaginationComponent(props) {
	    var currentPage = props.currentPage,
	        totalPages = props.totalPages,
	        onChange = props.onChange;
	
	    var paginationModel = (0, _ultimatePagination.getPaginationModel)({ currentPage: currentPage, totalPages: totalPages });
	    var renderItemComponent = renderItemComponentFunctionFactory(itemTypeToComponent, currentPage, onChange);
	    return _react2.default.createElement(
	      WrapperComponent,
	      props,
	      paginationModel.map(renderItemComponent)
	    );
	  };
	
	  UltimatePaginationComponent.propTypes = {
	    currentPage: _react2.default.PropTypes.number.isRequired,
	    totalPages: _react2.default.PropTypes.number.isRequired,
	    onChange: _react2.default.PropTypes.func
	  };
	
	  return UltimatePaginationComponent;
	};
	
	exports.ITEM_TYPES = _ultimatePagination.ITEM_TYPES;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ultimate_pagination_utils_1 = __webpack_require__(3);
	var ultimate_pagination_item_factories_1 = __webpack_require__(4);
	function getPaginationModel(options) {
	    var currentPage = options.currentPage, totalPages = options.totalPages;
	    var paginationModel = [];
	    var createPage = ultimate_pagination_item_factories_1.createPageFunctionFactory(options);
	    // Calculate group of central pages
	    var mainPagesStart = Math.max(2, Math.max(currentPage - 1, 3) - Math.max(0, currentPage + 3 - totalPages));
	    var mainPagesEnd = Math.min(totalPages - 1, Math.min(currentPage + 1, totalPages - 2) + Math.max(0, 4 - currentPage));
	    var mainPages = ultimate_pagination_utils_1.createRange(mainPagesStart, mainPagesEnd).map(createPage);
	    paginationModel.push(ultimate_pagination_item_factories_1.createFirstPageLink(options));
	    paginationModel.push(ultimate_pagination_item_factories_1.createPreviousPageLink(options));
	    // Always add the first page
	    paginationModel.push(createPage(1));
	    // Show '...' or second page between the last page and main pages group if needed
	    if (mainPagesStart > 3) {
	        paginationModel.push(ultimate_pagination_item_factories_1.createFirstEllipsis(mainPagesStart - 1));
	    }
	    else if (mainPagesStart !== 2) {
	        paginationModel.push(createPage(2));
	    }
	    // Add pages +/- from the current page
	    paginationModel.push.apply(paginationModel, mainPages);
	    // Show '...' or penult page between main pages group and the last page if needed
	    if (mainPagesEnd < totalPages - 2) {
	        paginationModel.push(ultimate_pagination_item_factories_1.createSecondEllipsis(mainPagesEnd + 1));
	    }
	    else if (mainPagesEnd !== totalPages - 1) {
	        paginationModel.push(createPage(totalPages - 1));
	    }
	    if (totalPages > 1) {
	        paginationModel.push(createPage(totalPages));
	    }
	    paginationModel.push(ultimate_pagination_item_factories_1.createNextPageLink(options));
	    paginationModel.push(ultimate_pagination_item_factories_1.createLastPageLink(options));
	    return paginationModel;
	}
	exports.getPaginationModel = getPaginationModel;
	var ultimate_pagination_constants_1 = __webpack_require__(5);
	exports.ITEM_TYPES = ultimate_pagination_constants_1.ITEM_TYPES;
	exports.ITEM_KEYS = ultimate_pagination_constants_1.ITEM_KEYS;
	//# sourceMappingURL=ultimate-pagination.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	function createRange(start, end) {
	    var range = [];
	    for (var i = start; i <= end; i++) {
	        range.push(i);
	    }
	    return range;
	}
	exports.createRange = createRange;
	//# sourceMappingURL=ultimate-pagination-utils.js.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ultimate_pagination_constants_1 = __webpack_require__(5);
	exports.createFirstEllipsis = function (pageNumber) {
	    return {
	        type: ultimate_pagination_constants_1.ITEM_TYPES.ELLIPSIS,
	        key: ultimate_pagination_constants_1.ITEM_KEYS.FIRST_ELLIPSIS,
	        value: pageNumber,
	        isActive: false
	    };
	};
	exports.createSecondEllipsis = function (pageNumber) {
	    return {
	        type: ultimate_pagination_constants_1.ITEM_TYPES.ELLIPSIS,
	        key: ultimate_pagination_constants_1.ITEM_KEYS.SECOND_ELLISPIS,
	        value: pageNumber,
	        isActive: false
	    };
	};
	exports.createFirstPageLink = function (options) {
	    var currentPage = options.currentPage;
	    return {
	        type: ultimate_pagination_constants_1.ITEM_TYPES.FIRST_PAGE_LINK,
	        key: ultimate_pagination_constants_1.ITEM_KEYS.FIRST_PAGE_LINK,
	        value: 1,
	        isActive: currentPage === 1
	    };
	};
	exports.createPreviousPageLink = function (options) {
	    var currentPage = options.currentPage;
	    return {
	        type: ultimate_pagination_constants_1.ITEM_TYPES.PREVIOUS_PAGE_LINK,
	        key: ultimate_pagination_constants_1.ITEM_KEYS.PREVIOUS_PAGE_LINK,
	        value: Math.max(1, currentPage - 1),
	        isActive: currentPage === 1
	    };
	};
	exports.createNextPageLink = function (options) {
	    var currentPage = options.currentPage, totalPages = options.totalPages;
	    return {
	        type: ultimate_pagination_constants_1.ITEM_TYPES.NEXT_PAGE_LINK,
	        key: ultimate_pagination_constants_1.ITEM_KEYS.NEXT_PAGE_LINK,
	        value: Math.min(totalPages, currentPage + 1),
	        isActive: currentPage === totalPages
	    };
	};
	exports.createLastPageLink = function (options) {
	    var currentPage = options.currentPage, totalPages = options.totalPages;
	    return {
	        type: ultimate_pagination_constants_1.ITEM_TYPES.LAST_PAGE_LINK,
	        key: ultimate_pagination_constants_1.ITEM_KEYS.LAST_PAGE_LINK,
	        value: totalPages,
	        isActive: currentPage === totalPages
	    };
	};
	exports.createPageFunctionFactory = function (options) {
	    var currentPage = options.currentPage;
	    return function (pageNumber) {
	        return {
	            type: ultimate_pagination_constants_1.ITEM_TYPES.PAGE,
	            key: pageNumber,
	            value: pageNumber,
	            isActive: pageNumber === currentPage
	        };
	    };
	};
	//# sourceMappingURL=ultimate-pagination-item-factories.js.map

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	exports.ITEM_TYPES = {
	    PAGE: 'PAGE',
	    ELLIPSIS: 'ELLIPSIS',
	    FIRST_PAGE_LINK: 'FIRST_PAGE_LINK',
	    PREVIOUS_PAGE_LINK: 'PREVIOUS_PAGE_LINK',
	    NEXT_PAGE_LINK: 'NEXT_PAGE_LINK',
	    LAST_PAGE_LINK: 'LAST_PAGE_LINK'
	};
	exports.ITEM_KEYS = {
	    FIRST_ELLIPSIS: -1,
	    SECOND_ELLISPIS: -2,
	    FIRST_PAGE_LINK: -3,
	    PREVIOUS_PAGE_LINK: -4,
	    NEXT_PAGE_LINK: -5,
	    LAST_PAGE_LINK: -6
	};
	//# sourceMappingURL=ultimate-pagination-constants.js.map

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-ultimate-pagination.js.map