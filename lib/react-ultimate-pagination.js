'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ITEM_TYPES = exports.createUltimatePagination = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ultimatePagination = require('ultimate-pagination');

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
    currentPage: _propTypes2.default.number.isRequired,
    totalPages: _propTypes2.default.number.isRequired,
    onChange: _propTypes2.default.func
  };

  return UltimatePaginationComponent;
};

exports.ITEM_TYPES = _ultimatePagination.ITEM_TYPES;