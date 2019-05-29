import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.button`
  width: 52px;
  height: 52px;
  padding: 5px;
  border-radius: 50px;
  background-color:  #FFF
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
  vertical-align: middle;
`;

const InfoButton = props => (
  <IconContainer {...props}>
    <Icon
      src="/icons/info.svg"
    />
  </IconContainer>
);


InfoButton.propTypes = {
};

InfoButton.defualtProps = {
};
export default InfoButton;
