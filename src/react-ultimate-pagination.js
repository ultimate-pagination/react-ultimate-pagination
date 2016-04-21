import React from 'react';
import {getPaginationModel, ITEM_TYPES} from 'ultimate-pagination';

const activePageButtonStyle = {fontWeight: 'bold'};

const LABEL_BY_ITEM_TYPE = {
  [ITEM_TYPES.ELLIPSIS]: '...',
  [ITEM_TYPES.FIRST_PAGE_LINK] : '<<',
  [ITEM_TYPES.PREVIOS_PAGE_LINK] : '<',
  [ITEM_TYPES.NEXT_PAGE_LINK] : '>',
  [ITEM_TYPES.LAST_PAGE_LINK] : '>>'
};

const isActivePage = (item) => item.isActive && item.type === ITEM_TYPES.PAGE;
const isDisabled = (item) => item.type === ITEM_TYPES.ELLIPSIS || (item.type !== ITEM_TYPES.PAGE && item.isActive);
const getButtonStyle = (item) => isActivePage(item) ? activePageButtonStyle : null;
const getItemLabel = (item) => item.type === ITEM_TYPES.PAGE ? item.value : LABEL_BY_ITEM_TYPE[item.type];

const UltimatePagination = ({currentPage, totalPages, onChange}) => {
  const paginationModel = getPaginationModel({currentPage, totalPages});
  const onPageClick = ({value}) => {
    return () => {
      if (onChange && currentPage !== value) {
        onChange(value);
      }
    };
  };

  return (
    <div>
      {
        paginationModel.map((item, index) => (
          <button
            key={item.key}
            disabled={isDisabled(item)}
            style={getButtonStyle(item)}
            onClick={onPageClick(item)}
          >
            {getItemLabel(item)}
          </button>
        ))
      }
    </div>
  );
};

UltimatePagination.propTypes = {
  currentPage: React.PropTypes.number.isRequired,
  totalPages: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func
};

export {UltimatePagination};
