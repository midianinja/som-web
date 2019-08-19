import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { black15, white } from '../../settings/colors';

const Card = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: flex-end;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  min-height: 100px;
  background-color: ${black15};
  border-radius: 10px;
  color: ${white};
  padding: 15px;
  will-change: transform;
  transition-duration: 05s;
  z-index: 2;  
  
  & + & {
    margin-top: 15px;
  }

  .comment {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition-duration: 0.05s;
  }

  :hover {
    justify-content: flex-start;
    transform: scale(1.001);
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.4);
  }

  &:hover > .comment {
    max-height: 400px;
    opacity: 1;
    margin-top: 10px;
  }

  @media (min-width: 768px) {
    width: calc(50% - 15px);
    margin-bottom: 30px;

    & + & {
      margin-top: 0px;
    }

    &:hover > .comment {
      max-height: 500px;
      opacity: 1;
    }
  }
`;

const Artist = styled.h4`
  font-size: 1.2857142857em;
  font-weight: 400;
`;

const Comment = styled.p`
  font-size: 0.75em;
  letter-spacing: 0.16px;
  font-weight: 300;
  line-height: 1.5384615385em;
  white-space: normal;
`;

function WhoIsSomCard({ artist, comment }) {
  return (
    <Card>
      <Artist>{artist}</Artist>
      <Comment className="comment">
        {comment}
      </Comment>
    </Card>
  );
}

WhoIsSomCard.propTypes = {
  artist: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default WhoIsSomCard;
