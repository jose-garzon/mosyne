import { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import Layout from '../components/layouts/Layout';

import Button from '../components/ui/Button';

import IconMosine from '../components/ui/icons/IconMosine';
import IconHeartFly from '../components/ui/icons/IconHeartFly';
import IconHero from '../components/ui/icons/IconHero';

const InfoContainer = styled.main`
	height: 100vh;
	width: 100vw;
	padding: 30px 10px;
	background: var(--purple1);
	background: linear-gradient(180deg, var(--purple1) 0%, var(--purple2) 100%);
	font-family: var(--font);
	color: var(--white);
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	h1 {
		width: 80%;
		margin-top: 48px;
		text-align: center;
		font-weight: 700;
		font-size: 24px;
	}
	svg {
		margin-top: 48px;
	}
	h2 {
		text-align: center;
		width: 70%;
		margin-top: 72px;
		font-weight: 400;
		font-size: 18px;
		line-height: 24px;
		span {
			font-weight: 700;
		}
	}
	.button__container {
		position: absolute;
		bottom: 30px;
		width: 90%;
		display: flex;
		justify-content: space-center;
		align-items: baseline;
		button {
			width: 100%;
			justify-content: center;
			margin-right: 5px;
			&:last-of-type {
				margin-right: 0;
			}
		}
	}
`;

const BulletsContainer = styled.div`
	position: absolute;
	bottom: 100px;
	display: flex;
	justify-content: center;
	p {
		margin: 0 10px;
		width: 8px;
		height: 8px;
		border-radius: 10px;
		background-color: var(--white);
		opacity: 0.5;
		cursor: pointer;
		&:nth-of-type(${(props) => props.slides}) {
			opacity: 1;
		}
	}
`;

export default function Info() {
	const [slides, setSlides] = useState(1);

	return (
		<Layout>
			<InfoContainer>
				<IconMosine height="25px" width="100px" />
				{slides === 1 && <h1>Te damos la Bienvenida a Mosine</h1>}
				{slides === 1 && <h2>Existen 2 palabras que tienes que conocer</h2>}
				{slides === 2 && <IconHeartFly />}
				{slides === 2 && (
					<h2>
						Llamamos <span>angél</span> a quien tenemos que cuidar
					</h2>
				)}
				{slides === 3 && <IconHero />}
				{slides === 3 && (
					<h2>
						Llamamos <span>héroe</span> a quien ayuda a llegar a casa a nuestro{' '}
						<span>angél</span>
					</h2>
				)}

				<BulletsContainer slides={slides}>
					<p onClick={() => setSlides(1)}></p>
					<p onClick={() => setSlides(2)}></p>
					<p onClick={() => setSlides(3)}></p>
				</BulletsContainer>
				<div className="button__container">
					<Link href="/">
						<Button
							bgColor="transparent"
							textColor="#FAFAFA"
							borderColor="#FAFAFA"
							shadow="false"
						>
							Regresar
						</Button>
					</Link>
					<Link href="/register">
						<Button
							bgColor="var(--white)"
							textColor="var(--purple1)"
							borderColor="var(--white)"
							shadow="false"
						>
							Siguiente
						</Button>
					</Link>
				</div>
			</InfoContainer>
		</Layout>
	);
}
