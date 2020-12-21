import React from 'react';
import styled from '@emotion/styled';
import IconMosine from '../ui/icons/IconMosine';
import IconHeartFly from '../ui/icons/IconHeartFly';
import IconHero from '../ui/icons/IconHero';
import Button from '../ui/Button';

const ModalContainer = styled.section`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	text-align: center;
	justify-content: center;
	padding: 20px;
	border-radius: 30px;
	color: white;
	font-family: var(--font);
	background: linear-gradient(180deg, #6f44e0 0%, #492d94 85.42%);
	svg {
		margin: 0 auto;
	}
	h1 {
		margin-bottom: 100px;
	}
`;

const Description = styled.div`
	display: flex;
	justify-content: space-around;
	margin-bottom: 100px;
	div {
		width: 45%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	h3 {
		font-weight: normal;
		span {
			font-weight: bold;
		}
	}
`;

const ModalButton = styled.button`
	width: 50%;
	align-self: center;
	padding: 10px 30px;
	background: transparent;
	border-radius: 5px;
	border: 1px solid white;
	color: white;
	outline: none;
	cursor: pointer;
	transition: 0.2s;
	&:active {
		transform: scale(0.98);
	}
`;

const InfoModal = ({ closeModal }) => {
	return (
		<ModalContainer>
			<div>
				<IconMosine width="200" heigh="50" />
			</div>
			<h1>Existen dos palabras que tienes que conocer</h1>
			<Description>
				<div>
					<IconHeartFly />
					<h3>
						Llamamos <span>angél</span> a quien tenemos que cuidar
					</h3>
				</div>
				<div>
					<IconHero />
					<h3>
						Llamamos <span>héroe</span> a quien ayuda a llegar a casa a nuestro{' '}
						<span>angél</span>
					</h3>
				</div>
			</Description>
			<ModalButton onClick={closeModal}>Entiendo</ModalButton>
		</ModalContainer>
	);
};

export default InfoModal;
