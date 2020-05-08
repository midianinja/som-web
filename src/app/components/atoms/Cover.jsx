import styled from 'styled-components';
import { black, transparent } from '../../settings/colors';
import { getGradient } from '../../settings/gradients';

const Cover = styled.div`
  width: 100%;
  position: relative;
  padding-left: 40px;
  padding-right: 40px;
  z-index: 2;

  :before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${getGradient()};
    ${({ cover }) => (cover ? `background-image: url('${cover}');` : '')}
    background-position: center;
    background-size: cover;
    top: 0;
    left: 0;
    z-index: -1;
  }

  :after {
    content: '';
    position: absolute;
    width: 100%;
    height: 101%;
    background-image: linear-gradient(180deg, ${transparent} 1.23%, ${black} 97.56%);
    top: 0;
    left: 0;
    z-index: -1;
  }
  ${props => props.customStyle}
`;

export default Cover;
