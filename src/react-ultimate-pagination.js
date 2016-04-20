import React from 'react';
import {getPaginationModel, ITEM_TYPES} from 'ultimate-pagination';

const activeButtonStyle = {fontWeight: 'bold'};

const UltimatePagination = ({currentPage, totalPages, onChange}) => {
  const paginationModel = getPaginationModel(currentPage, totalPages);
  const onPageClick = (newPage) => {
    return () => {
      if (onChange && currentPage !== newPage) {
        onChange(newPage);
      }
    };
  };

  return (
    <div>
      {
        paginationModel.map((item, index) => (
          <button
            key={item.value}
            disabled={item.type === ITEM_TYPES.ELLIPSIS}
            style={item.isActive ? activeButtonStyle : null}
            onClick={onPageClick(item.value)}
          >
            {item.type === ITEM_TYPES.PAGE ? item.value : '...'}
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
