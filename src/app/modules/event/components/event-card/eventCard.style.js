import styled from 'styled-components';
import { white } from '../../../../settings/colors';

export const Container = styled.div`
  width: 100%;
  display: flex;
  height: 200px;
  border-radius: 10px;
  ${props => props.customStyle}
`;

export const EventInfoWrapper = styled.div`
  display: flex;
  height: 100px;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
`;

export const buttonCustomStyle = `
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 300;
`;

export const Link = styled.a`
  color: ${white};
  font-weight: bold;
  font-size: 2em;
  line-height: 2em;
`;

export const ClosingDateTimer = styled.div`
  display: block;
  font-size: 0.8125em;
  font-weight: 300;
  line-height: 1em;
  text-align: left;
  margin-left: 10px;
`;

export const ClockIcon = styled.img`
  width: 15px;
  height: 15px;
  vertical-align: middle;
  margin-right: 5px;
`;

export const coverStyle = `
  height: 100%;
  display: flex;
  align-items: flex-end;
  border-radius: 10px;
  overflow: hidden;
`;
