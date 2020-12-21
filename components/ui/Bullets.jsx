//----- import Libraries
import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

//----- import components
import { Media } from '../../types/mediaquery';

const BulletsContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: space-around;
	margin-top: 20px;
	@media ${Media.desktop} {
		margin-top: 0;
		margin: ${(props) => props.isAdd && '0 250px'};
	}
	hr {
		position: absolute;
		z-index: 1;
		top: 14px;
		left: 20px;
		right: 20px;
		border: 1px solid var(--blue);
		@media ${Media.tablet} {
			top: 25px;
			border: 2px solid var(--blue);
		}
		@media ${Media.desktop} {
			top: 25px;
		}
	}

	h3 {
		width: 25px;
		height: 25px;
		text-align: center;
		font-size: 10px;
		background-color: var(--blue);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 60%;
		color: var(--white);
		z-index: 2;
		@media ${Media.tablet} {
			width: 40px;
			height: 40px;
			font-size: 16px;
		}
		&:nth-of-type(${(props) => props.bullet}) {
			background-color: var(--purple1);
		}
	}
`;

const Bullets = ({ bullet }) => {
	const router = useRouter();
	const isAdd = router.route.includes('add');
	return (
		<BulletsContainer isAdd={isAdd} bullet={bullet}>
			<hr />
			<h3>1</h3>
			<h3>2</h3>
			<h3>3</h3>
		</BulletsContainer>
	);
};

export default Bullets;
