import styled from 'styled-components';
import { black } from '../../../settings/colors';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  ${props => props.customStyle}
`;

export const buttonCustomStyle = `
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 300;
`;

export const subscribedButtonStyle = `
  padding: 6px 15px;
  height: auto;
  border: 1px solid ${black};

`;

export const unsubscribedButtonStyle = `
  padding: 6px 15px;
  height: auto;
`;
