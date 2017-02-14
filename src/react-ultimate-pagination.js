import React from 'react';
import {getPaginationModel, ITEM_TYPES} from 'ultimate-pagination';

const renderItemComponentFunctionFactory = (itemTypeToComponent, currentPage, onChange, callPreventDefault) => {
  const onItemClickFunctionFactory = (value) => {
    return (event) => {
      if (callPreventDefault === true) {
        event.preventDefault()
      }
      if (onChange && currentPage !== value) {
        onChange(value, event);
      }
    }
  };

  return (item) => {
    const ItemComponent = itemTypeToComponent[item.type];
    const onItemClick = onItemClickFunctionFactory(item.value);
    return <ItemComponent onClick={onItemClick} {...item}/>;
  }
};

export const createUltimatePagination = ({itemTypeToComponent, WrapperComponent = 'div'}) => {
  const UltimatePaginationComponent = ({currentPage, totalPages, onChange, callPreventDefault}) => {
    const paginationModel = getPaginationModel({currentPage, totalPages});
    const renderItemComponent = renderItemComponentFunctionFactory(itemTypeToComponent, currentPage, onChange, callPreventDefault);
    return <WrapperComponent>{paginationModel.map(renderItemComponent)}</WrapperComponent>;
  };

  UltimatePaginationComponent.propTypes = {
    currentPage: React.PropTypes.number.isRequired,
    totalPages: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func,
    callPreventDefault: React.Proptypes.bool
  };

  return UltimatePaginationComponent;
};

export {ITEM_TYPES};
