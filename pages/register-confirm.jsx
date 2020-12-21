import styled from '@emotion/styled';
import Axios from 'axios';
import Link from 'next/link';
import { useEffect } from 'react';

import Layout from '../components/layouts/Layout';

import Button from '../components/ui/Button';

import IconMosine from '../components/ui/icons/IconMosine';

const RegisterConfirmContainer = styled.main`
	width: 100vw;
	height: 100vh;
	background-image: url('./static/img/FinishedRegister.png');
	background-size: cover;
	background-color: var(--black);
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: var(--font);
	color: var(--white);
	padding-top: 20px;
	position: relative;
	.text {
		font-size: 16px;
		text-align: right;
		position: absolute;
		right: 11px;
		top: 319px;
		h1 {
			font-size: 16px;
			margin: 0;
		}
		p {
			width: 40vw;
			margin: 0;
		}
	}
	.buttons {
		position: absolute;
		bottom: 20px;
		display: flex;
		align-items: center;
		button {
			width: 40vw;
			justify-content: center;
		}
		a {
			width: 40vw;
			color: var(--white);
			text-decoration: none;
		}
	}
`;

export default function RegisterConfirm() {
	return (
		<Layout>
			<RegisterConfirmContainer>
				<IconMosine width="102px" height="25px" />
				<div className="text">
					<h1>¡Ya estás listo!</h1>
					<p>Te haz registrado exitosamente</p>
					<p>Completa tu perfil para mejorar la experiencia</p>
				</div>
				<div className="buttons">
					<Link href="/profile">Más tarde</Link>
					<Link href="/edit-profile">
						<Button
							bgColor="var(--purple1)"
							textColor="var(--white)"
							borderColor="var(--purple1)"
						>
							Editar mi perfil
						</Button>
					</Link>
				</div>
			</RegisterConfirmContainer>
		</Layout>
	);
}
