//----- import Libraries
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Modal from 'react-modal';

//----- import components
import Image from '../components/ui/Image';
import Layout from '../components/layouts/Layout';
import Header from '../components/layouts/Header';
import Menu from '../components/layouts/Menu';
import Logout from '../components/layouts/Logout';
import IconPlus from '../components/ui/icons/IconPlus';
import IconPolice from '../components/ui/icons/IconPolice';
import IconCruzRoja from '../components/ui/icons/IconCruzRoja';
import IconUserDefault from '../components/ui/icons/IconUserDefault';
import { Media } from '../types/mediaquery';
import InfoModal from '../components/layouts/InfoModal';

//----- import context
import UserContext from '../context/user/userContext';
import AngelContext from '../context/angel/angelContext';

const ProfileContainer = styled.main`
	min-height: 100vh;
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
	.profile {
		background-color: white;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 20px 10px;
		@media ${Media.tablet} {
			padding: 20px 30px;
		}
		@media ${Media.desktop} {
			padding: 30px 250px;
		}
		div {
			margin-left: 10px;
			h1 {
				font-weight: 700;
				font-size: 18px;
				color: var(--violet);
				margin: 0 0 5px;
				@media ${Media.tablet} {
					font-size: 20px;
				}
			}
			p {
				margin: 0;
				font-size: 8px;
				color: var(--black);
				cursor: pointer;
				transition: 0.2s;
				&:hover {
					color: var(--blue);
					font-weight: bold;
				}
				@media ${Media.tablet} {
					font-size: 12px;
				}
			}
		}
	}
	.angels {
		display: flex;
		flex-direction: column;
		padding: 10px;
		@media ${Media.tablet} {
			padding: 30px;
		}
		@media ${Media.desktop} {
			padding: 30px 250px;
		}
		h2 {
			color: var(--blue);
			margin: 0 0 5px;
			font-weight: 700;
			font-size: 12px;
			@media ${Media.tablet} {
				font-size: 20px;
			}
			@media ${Media.desktop} {
				font-size: 25px;
			}
		}
		p {
			margin: 0 0 10px;
			font-size: 10px;
			color: var(--black);
			@media ${Media.tablet} {
				font-size: 14px;
				margin-bottom: 20px;
			}
		}
		.angels-list {
			overflow-x: auto;
			display: flex;
			align-items: center;
			&::-webkit-scrollbar {
				height: 6px;
			}
			&::-webkit-scrollbar-thumb {
				background: #f1f1f1;
				border-radius: 4px;
				cursor: pointer;
			}

			span {
				width: 40px;
				height: 40px;
				border: 1px dashed black;
				border-radius: 50%;
				@media ${Media.tablet} {
					width: 50px;
					height: 50px;
					margin-top: 10px;
				}
			}
			.angel-avatar {
				width: auto;
				text-align: center;
				margin-right: 15px;
				cursor: pointer;
				padding: 0 15px;
				padding-top: 15px;
				transition: 0.3s;
				&:hover {
					background: var(--gray);
					border-radius: 10px;
				}
				@media ${Media.tablet} {
					margin-right: 30px;
				}
				img {
					margin: 0;
				}
				p {
					margin-top: 5px;
					font-weight: bold;
				}
			}
			svg {
				cursor: pointer;
			}
		}
	}
	.emergency {
		padding: 10px;
		@media ${Media.tablet} {
			padding: 30px;
		}
		@media ${Media.desktop} {
			padding: 0 250px;
		}
		h2,
		h3,
		p {
			margin: 0;
		}
		h2 {
			font-weight: 700;
			color: var(--blue);
			font-size: 18px;
			@media ${Media.tablet} {
				font-size: 20px;
			}
			@media ${Media.desktop} {
				font-size: 25px;
			}
		}
		> .NumbersContainer {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 20px;
			.NumbersItems {
				padding: 10px;
				width: 48%;
				background-color: white;
				text-align: center;
				border: 1px solid var(--gray);
				border-radius: 10px;
				margin-top: 10px;
				@media ${Media.tablet} {
					padding: 20px;
				}
				h3 {
					font-size: 10px;
					color: var(--violet);
					margin-bottom: 16px;
					@media ${Media.tablet} {
						font-size: 15px;
						margin-top: 10px;
					}
				}
				p {
					font-size: 12px;
					color: var(--black);
					margin-bottom: 10px;
					@media ${Media.desktop} {
						font-size: 14px;
					}
					&:last-of-type {
						margin-bottom: 5px;
					}
				}
			}
		}
	}
`;

Modal.setAppElement('#__next');

export default function Profile() {
	const [menu, showMenu] = useState(false);
	const [modalIsOpen, setModal] = useState(false);
	const { obtenerUsuario, usuario } = useContext(UserContext);
	const { angels, obtenerAngeles } = useContext(AngelContext);
	const { photo, firstname, lastname } = usuario;

	const openModal = () => {
		setModal(true);
	};
	const closeModal = (params) => {
		setModal(false);
	};

	const windowWith = typeof window !== 'undefined' && window.innerWidth;

	useEffect(() => {
		if (Object.keys(usuario).length === 0) {
			obtenerUsuario();
		}
		if (angels.length === 0) {
			obtenerAngeles();
		}
		if (windowWith >= 1440) {
			const modalOpened = sessionStorage.getItem('modal');
			showMenu(true);
			if (modalOpened !== 'true') {
				setTimeout(() => {
					openModal();
					sessionStorage.setItem('modal', true);
				}, 1000);
			}
		}
	}, [angels]);

	return (
		<Layout display="flex" menu={true}>
			<Menu menu={menu} showMenu={showMenu} />
			<ProfileContainer menu={menu}>
				<Header>
					<Logout />
				</Header>
				<div className="profile">
					{photo === '' ? (
						<IconUserDefault
							fill="#000000"
							width={windowWith >= 720 ? '50px' : '39px'}
							height={windowWith >= 720 ? '50px' : '39px'}
						/>
					) : (
						<Image
							src={photo}
							width={windowWith >= 720 ? '50px' : '39px'}
							height={windowWith >= 720 ? '50px' : '39px'}
						/>
					)}
					<div>
						<h1>
							Hola {firstname} {lastname}
						</h1>
						<Link href="/edit-profile">
							<p>Editar mi perfil</p>
						</Link>
					</div>
				</div>
				<div className="angels">
					<h2>Mis ángeles</h2>
					<p>Agrega a tus ángeles que cuidarás</p>
					<div className="angels-list">
						{angels.length === 0 ? (
							<span></span>
						) : (
							<>
								{angels.map((angel) => (
									<Link href={`/profile-angel-data/${angel.id}`} key={angel.id}>
										<div className="angel-avatar">
											{angel.photo === '' ? (
												<>
													<IconUserDefault
														fill="#000000"
														width={windowWith >= 720 ? '40px' : '39px'}
														height={windowWith >= 720 ? '40px' : '39px'}
													/>
													<p>
														{angel.firstname} <br /> {angel.lastname}
													</p>
												</>
											) : (
												<>
													<Image
														src={angel.photo}
														width={windowWith >= 720 ? '40px' : '39px'}
														height={windowWith >= 720 ? '40px' : '39px'}
													/>
													<p>
														{angel.firstname} <br /> {angel.lastname}
													</p>
												</>
											)}
										</div>
									</Link>
								))}
							</>
						)}
						<Link href="/privacity">
							<div>
								<IconPlus width="20px" height="20px" />
							</div>
						</Link>
					</div>
				</div>
				<div className="emergency">
					<h2>Números de emergencia</h2>
					<div className="NumbersContainer">
						<div className="NumbersItems">
							<IconCruzRoja />
							<h3>Cruz Roja Mexicana</h3>
							<p>065</p>
							<p>5557-5757</p>
							<p>5395-1111</p>
						</div>
						<div className="NumbersItems">
							<IconPolice />
							<h3>Policía CDMX</h3>
							<p>5684-2142</p>
							<p>5481-4326</p>
							<p>5256-0606</p>
						</div>
					</div>
				</div>
			</ProfileContainer>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={{
					overlay: {
						background: 'rgba(0,0,0,0.75)',
					},
					content: {
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						padding: '0',
						background: 'transparent',
						maxWidth: '30%',
						height: '70vh',
						border: 'none',
					},
				}}
			>
				<InfoModal closeModal={closeModal} />
			</Modal>
		</Layout>
	);
}
