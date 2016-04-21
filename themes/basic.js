import React from 'react';
import {ITEM_TYPES} from 'ultimate-pagination';

const Page = ({value, isActive, onClick}) => (
  <button style={isActive ? {fontWeight: 'bold'} : null} onClick={onClick}>{value}</button>
);

const Ellipsis = () => (
  <button disabled={true}>...</button>
);

const FirstPageLink = ({isActive, onClick}) => (
  <button disabled={isActive} onClick={onClick}>First</button>
);

const PreviousPageLink = ({isActive, onClick}) => (
  <button disabled={isActive} onClick={onClick}>Previous</button>
);

const NextPageLink = ({isActive, onClick}) => (
  <button disabled={isActive} onClick={onClick}>Next</button>
);

const LastPageLink = ({isActive, onClick}) => (
  <button disabled={isActive} onClick={onClick}>Last</button>
);

export default {
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: Ellipsis,
  [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
  [ITEM_TYPES.PREVIOS_PAGE_LINK]: PreviousPageLink,
  [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
  [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink
};
