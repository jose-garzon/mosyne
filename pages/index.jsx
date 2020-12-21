//----- import Libraries
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';

//----- import components
import Layout from '../components/layouts/Layout';
import Header from '../components/layouts/Header';
import Button from '../components/ui/Button';
import Bullets from '../components/ui/Bullets';
import ButtonGoogle from '../components/ui/ButtonGoogle';
import IconQR from '../components/ui/icons/IconQR';
import IconGoogle from '../components/ui/icons/IconGoogle';
import IconMail from '../components/ui/icons/IconMail';
import IconCard from '../components/ui/icons/IconCard';
import IconHeart from '../components/ui/icons/IconHeart';
import IconPDF from '../components/ui/icons/IconPDF';
import IconBullet from '../components/ui/icons/IconBullet';
import IconArrow from '../components/ui/icons/IconArrow';
import IconFacebook from '../components/ui/icons/IconFacebook';
import IconTwitter from '../components/ui/icons/IconTwitter';
import IconInstagram from '../components/ui/icons/IconInstagram';
import IconMosine from '../components/ui/icons/IconMosine';
import { Media } from '../types/mediaquery';

const HeroContainer = styled.div`
	width: 100%;
	height: 600px;
	background-image: url('/static/img/hero.png');
	clip-path: polygon(0 0, 100% 0, 100% 100%, 0 95%);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: var(--font);
	@media ${Media.tablet} {
		height: 600px;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
		padding: 5% 10%;
		background-image: url('/static/img/heroDesktop.png');
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 92%);
	}
	@media ${Media.desktop} {
		height: 750px;
	}
	h1 {
		width: 60%;
		font-weight: bold;
		font-size: 24px;
		line-height: 40px;
		text-align: center;
		color: var(--white);
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		margin: 0;
		@media ${Media.tablet} {
			font-size: 40px;
		}
		@media ${Media.desktop} {
			font-size: 70px;
			line-height: 55px;
		}
	}
	.HeroContainer_btn {
		width: 75%;
		max-width: 345px;
		margin-top: 30px;
		padding: 37px 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background-color: rgba(62, 90, 173, 0.9);
		border-radius: 14px;
		color: var(--white);
		@media ${Media.tablet} {
			height: 420px;
			margin: 0;
		}
		h2 {
			font-weight: bold;
			font-size: 18px;
			line-height: 21px;
			@media ${Media.tablet} {
				font-size: 25px;
			}
		}
		p {
			width: 90%;
			font-size: 12px;
			line-height: 20px;
			text-align: center;
			@media ${Media.tablet} {
				font-size: 16px;
			}

			span {
				font-weight: bold;
			}
		}
		h3 {
			font-size: 12px;
			line-height: 12px;
			text-align: center;
			color: rgba(242, 242, 242, 0.9);
		}
	}
`;

const ProcedureContainer = styled.div`
	font-family: var(--font);
	height: 400px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	padding: 0 10px;
	@media ${Media.tablet} {
		flex-direction: row;
		justify-content: space-between;
		padding: 0 10%;
	}

	h1 {
		font-weight: 700;
		font-size: 24px;
		line-height: 28px;
		text-align: center;
		color: var(--blue);
		@media ${Media.tablet} {
			font-size: 40px;
			line-height: 35px;
			color: var(--terracota);
			opacity: 0.8;
		}
		@media ${Media.desktop} {
			font-size: 50px;
		}
	}
	p {
		color: var(--violet);
		font-weight: 700;
		font-size: 12px;
		line-height: 14px;
		text-align: center;
		margin-bottom: 0;
		@media ${Media.tablet} {
			font-size: 16px;
		}
	}
	.instructions {
		@media ${Media.desktop} {
			width: 50%;
		}
	}
	.icons__container {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		svg {
			width: 30%;
		}
	}
	.instructions__container {
		display: flex;
		justify-content: space-around;

		p {
			width: 25%;
			font-size: 12px;
			line-height: 20px;
			font-weight: 400;
			@media ${Media.desktop} {
				font-size: 16px;
			}
		}
	}
`;

const SmallHeroContainer = styled.div`
	width: 100%;
	min-height: 320px;
	background-image: ${(props) => props.bgURL && `url(${props.bgURL})`};
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	margin: 0;
	@media ${Media.desktop} {
		height: 500px;
	}

	p {
		position: absolute;
		font-family: var(--font);
		font-weight: 900;
		font-size: 50px;
		color: var(--white);
		margin: 0 0 50px;
		@media ${Media.desktop} {
			font-size: 85px;
		}

		&:first-of-type {
			margin-bottom: 70px;
			font-size: 60px;
			letter-spacing: 2px;
			-webkit-text-stroke: 2px var(--white);
			color: transparent;
			@media ${Media.desktop} {
				font-size: 90px;
			}
		}
	}
`;

const DetailsContainer = styled.div`
	width: 100%;
	@media ${Media.desktop} {
		display: flex;
		flex-direction: row !important;
		justify-content: space-between;
	}
	.column {
		@media ${Media.desktop} {
			width: 45%;
			display: flex;
			flex-direction: column;
		}
	}
`;

const Details = styled.details`
	margin: 30px 0;
	position: relative;
	@media ${Media.desktop} {
		margin: 50px 0;
	}
	&::after {
		content: '';
		position: absolute;
		bottom: -30px;
		width: 100%;
		height: 1px;
		background: var(--white);
	}
	.arrow {
		transform: rotate(180deg);
	}
	&[open] .arrow {
		transform: rotate(360deg);
	}
	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		outline: none;
		&::-webkit-details-marker {
			display: none;
		}
		h2 {
			width: 100%;
			font-size: 18px;
			margin: 0;
			margin-left: 20px;
			text-align: left;
			@media ${Media.desktop} {
				font-size: 25px;
			}
		}
	}
`;

const Register = styled.section`
	@media ${Media.desktop} {
		display: flex;
	}
`;

export default function Home() {
	const responseGoogle = (response) => {
		console.log(response);
	};

	const windowWith = typeof window !== 'undefined' && window.innerWidth;

	return (
		<Layout>
			<Header whiteColor="true">
				<Link href="/login">INICIAR SESIÓN</Link>
			</Header>
			<HeroContainer>
				<h1>
					Ayudalos a <br /> regresar a casa
				</h1>
				<div className="HeroContainer_btn">
					<IconQR />
					<h2>Registrate</h2>
					<p>
						Generamos <span>plantillas QR</span> para casos de emergencia en
						pacientes que sufren <span>Alzheimer</span>
					</p>
					<ButtonGoogle
						bgColor="#DB4A39"
						textColor="#FAFAFA"
						borderColor="#DB4A39"
						shadow="true"
						width="100%"
					/>
					<Link href={windowWith < 1440 ? '/info' : '/register'}>
						<Button
							bgColor="transparent"
							textColor="#FAFAFA"
							borderColor="#FAFAFA"
							width="100%"
						>
							<IconMail />
							Registrate con tu correo
						</Button>
					</Link>
					<Link href="/recover-password">
						<Button
							bgColor="transparent"
							textColor="rgba(242, 242, 242, 0.9)"
							borderColor="transparent"
							width="100%"
						>
							Recupera tu contraseña
						</Button>
					</Link>
				</div>
			</HeroContainer>
			<ProcedureContainer>
				<div>
					<h1>¿Cómo funciona?</h1>
					<p>3 pasos y 5 minutos hacen la diferencia</p>
				</div>
				<div className="instructions">
					<Bullets />
					<div className="icons__container">
						<IconCard />
						<IconHeart />
						<IconPDF />
					</div>
					<div className="instructions__container">
						<p>Registrate</p>
						<p>Agrega la información de tu ángel</p>
						<p>Descarga el PDF generado</p>
					</div>
				</div>
			</ProcedureContainer>
			<SmallHeroContainer bgURL="/static/img/amalos.jpeg">
				<p>ÁMALOS</p>
				<p>ÁMALOS</p>
			</SmallHeroContainer>
			<div
				css={css`
					padding: 5% 2%;
					background-color: var(--violet);
					color: var(--white);
					font-family: var(--font);
					@media ${Media.desktop} {
						padding: 5% 10%;
						background: var(--purple1);
					}
					h1 {
						width: 100%;
						font-size: 24px;
						line-height: 28px;
						text-align: right;
						color: var(--terracota);
						margin-right: 10px;
						@media ${Media.desktop} {
							font-size: 40px;
							margin-bottom: 5%;
							color: var(--white);
							text-align: center;
						}
					}
					div {
						display: flex;
						flex-direction: column;
					}
				`}
			>
				<h1>Sabemos que tienes preguntas</h1>
				<DetailsContainer>
					<div className="column">
						<Details>
							<summary>
								<IconBullet />
								<h2>¿Qué pasa con mi información?</h2>
								<IconArrow className="arrow" />
							</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Laudantium accusantium quas iusto vero repellendus voluptas
								quisquam aliquid. Dignissimos, velit inventore. Nesciunt
								mollitia doloribus repellendus illo ratione ad, illum veniam
								ullam.
							</p>
						</Details>
						<Details>
							<summary>
								<IconBullet />
								<h2>¿Qué hago si encuentro un enfermo?</h2>
								<IconArrow className="arrow" />
							</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Laudantium accusantium quas iusto vero repellendus voluptas
								quisquam aliquid. Dignissimos, velit inventore. Nesciunt
								mollitia doloribus repellendus illo ratione ad, illum veniam
								ullam.
							</p>
						</Details>
						<Details>
							<summary>
								<IconBullet />
								<h2>¿Qué hago si encuentro un enfermo?</h2>
								<IconArrow className="arrow" />
							</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Laudantium accusantium quas iusto vero repellendus voluptas
								quisquam aliquid. Dignissimos, velit inventore. Nesciunt
								mollitia doloribus repellendus illo ratione ad, illum veniam
								ullam.
							</p>
						</Details>
					</div>
					<div className="column">
						<Details>
							<summary>
								<IconBullet />
								<h2>¿Qué hago si encuentro un enfermo?</h2>
								<IconArrow className="arrow" />
							</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Laudantium accusantium quas iusto vero repellendus voluptas
								quisquam aliquid. Dignissimos, velit inventore. Nesciunt
								mollitia doloribus repellendus illo ratione ad, illum veniam
								ullam.
							</p>
						</Details>
						<Details>
							<summary>
								<IconBullet />
								<h2>¿Qué hago si encuentro un enfermo?</h2>
								<IconArrow className="arrow" />
							</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Laudantium accusantium quas iusto vero repellendus voluptas
								quisquam aliquid. Dignissimos, velit inventore. Nesciunt
								mollitia doloribus repellendus illo ratione ad, illum veniam
								ullam.
							</p>
						</Details>
						<Details>
							<summary>
								<IconBullet />
								<h2>¿Qué hago si encuentro un enfermo?</h2>
								<IconArrow className="arrow" />
							</summary>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Laudantium accusantium quas iusto vero repellendus voluptas
								quisquam aliquid. Dignissimos, velit inventore. Nesciunt
								mollitia doloribus repellendus illo ratione ad, illum veniam
								ullam.
							</p>
						</Details>
					</div>
				</DetailsContainer>
			</div>
			<Register>
				<SmallHeroContainer bgURL="/static/img/cuidalos.jpeg">
					<p>CUÍDALOS</p>
					<p>CUÍDALOS</p>
				</SmallHeroContainer>
				<div
					css={css`
						width: 100%;
						height: 400px;
						background-color: var(--purple1);
						padding: 10px 15px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: flex-end;
						text-align: right;
						font-family: var(--font);
						color: var(--white);
						text-align: right;
						@media ${Media.desktop} {
							display: flex;
							flex-direction: column;
							align-items: flex-end;
							width: 50%;
							height: auto;
							padding-right: 120px;
							background-color: var(--terracota);
						}
						h1 {
							font-weight: 700;
							font-size: 24px;
							line-height: 28px;
							@media ${Media.desktop} {
								font-size: 50px;
								line-height: 40px;
							}
						}
						p {
							font-size: 12px;
							line-height: 24px;
							margin-bottom: 20px;
							@media ${Media.desktop} {
								font-size: 16px;
								width: 100%;
								text-align: right;
							}

							span {
								font-weight: 700;
							}
						}
						button {
							justify-content: center;
							@media ${Media.desktop} {
								background-color: var(--blue);
							}
						}
					`}
				>
					<h1>¿Sabías que?</h1>
					<p>
						<span>
							“Aproximadamente la mitad de los desaparecidos en mayores de 70
							años sufre alzhéimer”
						</span>
						, explica a ConSalud.es Joaquín Amills, presidente de SOS
						Desparecidos. Este dato ha aumentado en los últimos años debido a la
						crisis económica.
					</p>
					<Button
						bgColor="var(--terracota)"
						textColor="#FAFAFA"
						borderColor="var(--terracota)"
						css={css`
							font-weight: bold;
						`}
					>
						Quiero registrarme
					</Button>
				</div>
			</Register>
			<div
				css={css`
					width: 100%;
					height: 320px;
					padding: 50px 15px;
					background-color: var(--white);
					display: flex;
					flex-direction: column;
					justify-content: center;
					font-family: var(--font);
					@media ${Media.tablet} {
						padding: 15% 10%;
					}
					@media ${Media.desktop} {
						flex-direction: row;
						align-items: center;
						justify-content: flex-start;
					}
					img {
						width: 40px;
						height: 40px;
						@media ${Media.desktop} {
							width: 150px;
							height: 150px;
							margin-right: 50px;
						}
					}
					h1 {
						font-weight: 700;
						font-size: 24px;
						line-height: 28px;
						color: var(--blue);
						@media ${Media.desktop} {
							font-size: 50px;
							line-height: 40px;
							color: var(--terracota);
						}
					}
					p {
						font-size: 12px;
						line-height: 24px;
						color: var(--violet);
						@media ${Media.desktop} {
							font-size: 16px;
						}
					}
				`}
			>
				<img src="/static/img/platzi_master.png" alt="Logo Platzi Master" />
				<div className="description">
					<h1>
						Una comunidad <br /> dispuesta a ayudar
					</h1>
					<p>
						Este proyecto es gracias a toda comunida que esta detras del
						programa Platzi Master.
					</p>
				</div>
			</div>
			<div
				css={css`
					padding: 30% 10%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-family: var(--font);
					background-color: var(--blue);
					color: var(--white);
					@media ${Media.tablet} {
						padding: 10%;
					}
					@media ${Media.desktop} {
						padding: 5%;
					}
					h1 {
						margin: 0 0 10px;
					}
					p {
						font-size: 14px;
						margin: 0 0 50px;
					}
					div {
						display: flex;
						justify-content: center;
						svg {
							width: 20px;
							height: 20px;
							margin: 0 10px;
							fill: var(--white);
						}
					}
				`}
			>
				<IconMosine width="180" heigh="80" />
				<p>Codigos QR para pacientes Alzheimer</p>
				<div>
					<IconFacebook />
					<IconTwitter />
					<IconInstagram />
				</div>
			</div>
		</Layout>
	);
}
