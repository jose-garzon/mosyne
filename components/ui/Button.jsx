import styled from '@emotion/styled';

const Button = styled.button`
	width: ${(props) => props.width};
	margin-bottom: 10px;
	display: flex;
	justify-content: space-between;
	padding: 15px 25px;
	box-shadow: ${(props) =>
		props.shadow && 'inset 0px -2px 1px rgba(0, 0, 0, 0.25)'};
	border-radius: 8px;
	background-color: ${(props) => props.bgColor};
	border: 1px solid ${(props) => props.borderColor};
	color: ${(props) => props.textColor};
	font-size: 15px;
	line-height: 14px;
	outline: none;
	&:last-of-type {
		margin-bottom: 0;
	}
	&:hover {
		cursor: pointer;
	}
	&:active {
		transform: scale(0.95);
	}
	&:focus {
		border: 2px solid black;
	}
`;

export default Button;
