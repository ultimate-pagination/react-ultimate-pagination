import React from 'react';
import {getPaginationModel, ITEM_TYPES} from 'ultimate-pagination';

const renderItemComponentFunctionFactory = (itemTypeToComponent, currentPage, onChange) => {
  const onItemClickFunctionFactory = (value) => {
    return () => {
      if (onChange && currentPage !== value) {
        onChange(value);
      }
    }
  };

  return (item) => {
    const ItemComponent = itemTypeToComponent[item.type];
    const onItemClick = onItemClickFunctionFactory(item.value);
    return <ItemComponent onClick={onItemClick} {...item}/>;
  }
};

export const createUltimatePagination = (itemTypeToComponent) => {
  const UltimatePaginationComponent = ({currentPage, totalPages, onChange}) => {
    const paginationModel = getPaginationModel({currentPage, totalPages});
    const renderItemComponent = renderItemComponentFunctionFactory(itemTypeToComponent, currentPage, onChange);
    return <div>{paginationModel.map(renderItemComponent)}</div>;
  };

  UltimatePaginationComponent.propTypes = {
    currentPage: React.PropTypes.number.isRequired,
    totalPages: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func
  };

  return UltimatePaginationComponent;
};

export {ITEM_TYPES};
