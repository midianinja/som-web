import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  white, black, black30,
} from '../../settings/colors';

const Input = styled.input`
  width: calc(100% - 22px);
  height: 100%;
  color: ${black};
  background: transparent;
  padding-right: 10px;

  :focus {
    outiline: none;
    box-shadow: none;
    padding-right: 10px;
  }
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;
  vertical-align: middle;
`;

const NewsletterInputWrapper = styled.div`
  width: ${props => props.width};
  height: 50px;
  background-color: ${white};
  border-radius: 38px;
  padding-left: 15px;
  padding-right: 15px;
`;

const inputStyle = `
  ::placeholder {
    color: ${black30};
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: ${black30};
  }

  ::-ms-input-placeholder {
    color: ${black30};
  }
`;

/**
 * function that render react component
 * @param {object} props component props
 * @returns contains NewsletterInput Component
 */
function NewsletterInput({
  onChange, placeholder, value, width, point, onSubmit,
}) {
  return (
    <NewsletterInputWrapper width={width} point={point}>
      <Input
        customStyle={inputStyle}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      <Icon src="/icons/send.svg" alt="Envie" onClick={() => onSubmit()} />
    </NewsletterInputWrapper>
  );
}

NewsletterInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  width: PropTypes.string,
  point: PropTypes.number,
};

NewsletterInput.defaultProps = {
  placeholder: '',
  width: 'auto',
  point: 10,
};

export default NewsletterInput;
