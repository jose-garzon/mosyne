//----- import Libraries
import React from 'react';
import styled from '@emotion/styled';

//----- import components
import IconMosine from '../ui/icons/IconMosine';
import IconMosineAlt from '../ui/icons/IconMosineAlt';
import { Media } from '../../types/mediaquery';

const HeaderContainer = styled.header`
	width: 100%;
	padding: 10px 15px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${(props) =>
		props.whiteColor
			? 'linear-gradient(var(--purple1), var(--purple2))'
			: 'var(--white)'};
	@media ${Media.tablet} {
		padding: ${(props) => !props.whiteColor && '30px'};
	}
	@media ${Media.desktop} {
		padding-left: ${(props) => !props.whiteColor && '250px'};
	}

	.headerContainer_logo p {
		color: ${(props) => (props.whiteColor ? 'var(--white)' : 'var(--black)')};
		font-family: 'Quicksand', sans-serif;
		font-size: 8px;
		line-height: 15px;
		margin: 0;
		@media ${Media.desktop} {
			font-size: 12px;
		}
	}
	a {
		text-decoration: none;
		color: ${(props) => (props.whiteColor ? 'var(--white)' : 'var(--violet)')};
		font-family: var(--font);
		font-size: 12px;
		line-height: 12px;
		font-weight: 700;
	}
`;

const Header = (props) => {
	return (
		<HeaderContainer whiteColor={props.whiteColor}>
			<div className="headerContainer_logo">
				{props.whiteColor ? <IconMosine /> : <IconMosineAlt />}
				<p>Codigos QR para pacientes Alzheimer</p>
			</div>
			{props.children}
		</HeaderContainer>
	);
};

export default Header;
