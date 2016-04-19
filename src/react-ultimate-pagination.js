import React from 'react';
import {getPaginationModel} from 'ultimate-pagination';

const isEllipsis = item => item === '...';

const UltimatePagination = ({currentPage, totalPages, onChange}) => {
  const paginationModel = getPaginationModel(currentPage, totalPages);
  const onPageClick = (item) => {
    return () => {
      if (onChange && currentPage !== item) {
        onChange(item);
      }
    };
  };

  return (
    <div>
      {
        paginationModel.map((item, index) => (
          <button key={index} disabled={isEllipsis(item)} onClick={onPageClick(item)}>{item}</button>
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
