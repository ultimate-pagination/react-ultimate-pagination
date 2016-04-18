import React from 'react';
import {getPaginationModel} from 'ultimate-pagination';

const UltimatePagination = ({currentPage, totalPages}) => {
  const paginationModel = getPaginationModel(currentPage, totalPages);
  return (
    <div>
      {
        paginationModel.map((item, index) => (
          <button key={index}>{item}</button>
        ))
      }
    </div>
  );
};

UltimatePagination.propTypes = {
  currentPage: React.PropTypes.number.isRequired,
  totalPages: React.PropTypes.number.isRequired
};

export {UltimatePagination};
