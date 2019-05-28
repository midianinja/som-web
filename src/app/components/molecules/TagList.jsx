import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tag from '../atoms/Tag';

const List = styled.div`
  display: inline-flex;
  overflow-y: auto;
  flex-wrap: wrap;
`;

/**
 * function that get items
 * @param {array} data it is object array contains tags informataion
 * @returns React Component array
 */
function getItems(data, handleClose) {
  return data.map(({ color, text, id }) => (
    <Tag
      text={text}
      id={id}
      color={color}
      handleClose={handleClose}
    />
  ));
}

/**
 * function that render TagList
 * @param {object} props component props
 * @returns React Component
 */
function TagList({ data, handleClose }) {
  return (
    <List>
      {getItems(data, handleClose)}
    </List>
  );
}

const tagShape = {
  text: PropTypes.string.isRequried,
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
};

TagList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(tagShape)),
  handleClose: PropTypes.func.isRequired,
};

TagList.defaultProps = {
  data: [],
};

export default TagList;
