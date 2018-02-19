import React from 'react';
import PropTypes from 'prop-types'
import {getPaginationModel, ITEM_TYPES} from 'ultimate-pagination';

const renderItemComponentFunctionFactory = (itemTypeToComponent, currentPage, onChange) => {
  const onItemClickFunctionFactory = ({ value, isDisabled }) => {
    return () => {
      if (!isDisabled && onChange && currentPage !== value) {
        onChange(value);
      }
    }
  };

  return (props) => {
    const ItemComponent = itemTypeToComponent[props.type];
    const onItemClick = onItemClickFunctionFactory(props);
    return <ItemComponent onClick={onItemClick} {...props}/>;
  }
};

export const createUltimatePagination = ({itemTypeToComponent, WrapperComponent = 'div'}) => {
  const UltimatePaginationComponent = (props) => {
    const {
      currentPage,
      totalPages,
      boundaryPagesRange,
      siblingPagesRange,
      hideEllipsis,
      hidePreviousAndNextPageLinks,
      hideFirstAndLastPageLinks,
      onChange,
      disabled,
      ...restProps
    } = props;

    const paginationModel = getPaginationModel({
      currentPage,
      totalPages,
      boundaryPagesRange,
      siblingPagesRange,
      hideEllipsis,
      hidePreviousAndNextPageLinks,
      hideFirstAndLastPageLinks
    });
    const renderItemComponent = renderItemComponentFunctionFactory(itemTypeToComponent, currentPage, onChange);
    return (
      <WrapperComponent {...restProps}>
        {paginationModel.map((itemModel) => renderItemComponent({
          ...itemModel,
          isDisabled: !!disabled,
        }))}
      </WrapperComponent>
    );
  };

  UltimatePaginationComponent.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    boundaryPagesRange: PropTypes.number,
    siblingPagesRange: PropTypes.number,
    hideEllipsis: PropTypes.bool,
    hidePreviousAndNextPageLinks: PropTypes.bool,
    hideFirstAndLastPageLinks: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
  };

  return UltimatePaginationComponent;
};

export {ITEM_TYPES};
