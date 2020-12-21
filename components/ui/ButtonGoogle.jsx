import React, { useContext } from 'react';
import styled from '@emotion/styled';
import GoogleLogin from 'react-google-login';

import IconGoogle from './icons/IconGoogle';
import AuthContext from '../../context/auth/authContext';

const Button = styled(GoogleLogin)`
	width: ${(props) => props.width};
	margin-bottom: 10px;
	display: flex !important;
	justify-content: space-between;
	box-shadow: ${(props) =>
		props.shadow && 'inset 0px -2px 1px rgba(0, 0, 0, 0.25)'};
	border-radius: 8px !important;
	background-color: ${(props) => props.bgColor}!important;
	border-color: ${(props) => props.borderColor}!important;
	color: ${(props) => props.textColor}!important;
	font-size: 12px;
	line-height: 14px;
	> div {
		display: none;
	}
	> span {
		padding: 15px 25px !important;
		width: 100%;
		display: flex;
		justify-content: space-between;
		svg {
			margin: 0 5px;
		}
	}
	&:last-of-type {
		margin-bottom: 0;
	}
	&:hover {
		cursor: pointer;
	}
`;

const ButtonGoogle = ({ bgColor, textColor, borderColor, shadow, width }) => {
	const { registrarGoogle } = useContext(AuthContext);

	const responseGoogle = ({ profileObj: { email, name, familyName } }) => {
		registrarGoogle({
			email,
			firstname: name,
			lastname: familyName ? familyName : '',
		});
	};

	return (
		<Button
			bgColor={bgColor}
			textColor={textColor}
			borderColor={borderColor}
			width={width}
			shadow={shadow}
			clientId="730257169575-9dcdlk66l2u807j0dobgbhjsf4phhti1.apps.googleusercontent.com"
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			cookiePolicy={'single_host_origin'}
		>
			<IconGoogle />
			Registrate con Google
		</Button>
	);
};

export default ButtonGoogle;
