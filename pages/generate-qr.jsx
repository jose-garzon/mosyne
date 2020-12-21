//----- import Libraries
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';

//----- import components
import Header from '../components/layouts/Header';
import Layout from '../components/layouts/Layout';
import Logout from '../components/layouts/Logout';
import Menu from '../components/layouts/Menu';
import Button from '../components/ui/Button';
import ButtonQR from '../components/ui/ButtonQR';
import Loader from '../components/ui/Loader';
import { Media } from '../types/mediaquery';

//----- import context
import AngelContext from '../context/angel/angelContext';

const GenerateQRContainer = styled.main`
	height: 100vh;
	font-family: var(--font);
	background: var(--white);
	border-radius: 20px 0 0 20px;
	overflow: hidden;
	transition: all 0.3s linear;
	box-shadow: -8px 0px 16px rgba(73, 45, 148, 0.5);
	@media ${Media.desktop} {
		border-radius: 25px 0 0 25px;
	}
	${(props) =>
		props.menu === true
			? css`
					width: 70%;
					@media ${Media.tablet} {
						width: 85%;
					}
					@media ${Media.desktop} {
						width: 90%;
					}
			  `
			: css`
					width: 97%;
			  `}
	.instruction {
		@media ${Media.tablet} {
			padding: 20px 30px;
		}
		@media ${Media.desktop} {
			padding: 30px 250px;
		}
	}
	header {
		background-color: var(--gray);
	}
	h1 {
		margin: 0 10px;
		font-size: 12px;
		color: var(--blue);
		border-bottom: 1px solid var(--blue);
		@media ${Media.tablet} {
			font-size: 20px;
		}
		@media ${Media.desktop} {
			font-size: 25px;
		}
	}
	> a {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}
	ol {
		padding: 0 10px 0 30px;

		li {
			color: var(--black);
			font-size: 12px;
			@media ${Media.tablet} {
				font-size: 16px;
				margin-bottom: 15px;
			}
			::marker {
				font-weight: 700;
			}
		}
	}
	.buttons {
		padding: 0 10px;
		display: flex;
		justify-content: flex-end;
		width: 100%;
		button {
			margin: 0;
			margin-right: 10px;
		}
		a {
			text-decoration: none;
		}
	}
`;

export default function GenerateQR() {
	const [menu, showMenu] = useState(false);
	const { angelid } = useContext(AngelContext);

	const windowWith = typeof window !== 'undefined' && window.innerWidth;
	useEffect(() => {
		if (windowWith >= 1440) {
			showMenu(true);
		}
	}, []);

	return (
		<Layout display="flex" menu={true}>
			<Menu menu={menu} showMenu={showMenu} />
			<GenerateQRContainer>
				<Header>
					<Logout />
				</Header>
				<div className="instruction">
					<h1>Instrucciones</h1>
					<ol>
						<li>
							Imprime con la mejor calidad posible para garantizar la lectura
							del codigo QR.
						</li>
						<li>Recortar por la línea punteada respetando el margen.</li>
						<li>
							Dobla por la mitad y lamina con un plastico grueso para evitar que
							la tinta de la impresión la borre.
						</li>
						<li>
							Perfora la credencial despues de laminar por la marca circular y
							cuelgalo de un cordon en el cuello de tu angel.
						</li>
					</ol>
					<div className="buttons">
						<Button
							bgColor="transparent"
							textColor="var(--purple1)"
							borderColor="var(--purple1)"
							onClick={() => (window.location = '/profile')}
						>
							Ir al inicio
						</Button>
						<a
							target="__blank"
							href={`https://mosine-api-297015.uc.r.appspot.com/api/angels/${angelid}/qr`}
						>
							<Button
								bgColor="var(--purple1)"
								textColor="#FAFAFA"
								borderColor="var(--purple1)"
								shadow="true"
								type="submit"
							>
								Descargar codigo QR
							</Button>
						</a>
					</div>
				</div>
			</GenerateQRContainer>
		</Layout>
	);
}
