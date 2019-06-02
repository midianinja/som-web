import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { gray02 } from '../../settings/colors';

const Container = styled.div`
	display: flex;
	height: 30px;
	padding-top:10px;
`;

const Followers = styled.div`
	margin-right: 5px;
	font-size: 0.7em;
	color: ${gray02};
`;

const FNumber = styled.span`
	font-size: 1.2em;
	color: black;
`;

const FollowersAndFollowing = ({nFollowers, nFollowing}) => (
	<Container>
		<Followers>
			<FNumber>{nFollowers}</FNumber> Seguidores
		</Followers>
		<Followers>
			<FNumber>{nFollowing}</FNumber> Seguindo
		</Followers>
	</Container>
);

FollowersAndFollowing.propTypes = {
    nFollowers: PropTypes.number,
    nFollowing: PropTypes.number,
};

FollowersAndFollowing.defaultProps = {
	nFollowers: 26,
  nFollowing: 142,
};

export default FollowersAndFollowing;