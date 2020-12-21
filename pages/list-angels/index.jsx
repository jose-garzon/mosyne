//----- import Libraries
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

//----- import components
import Image from '../../components/ui/Image';
import Layout from '../../components/layouts/Layout';
import Header from '../../components/layouts/Header';
import Menu from '../../components/layouts/Menu';
import Logout from '../../components/layouts/Logout';
import IconUserDefault from '../../components/ui/icons/IconUserDefault';
import { Media } from '../../types/mediaquery';

//----- import context
import UserContext from '../../context/user/userContext';
import AngelContext from '../../context/angel/angelContext';

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
				width: 80%;
				margin-right: 15px;
				cursor: pointer;
				padding: 0 15px;
				padding-top: 15px;
        transition: 0.3s;
        display: flex;
        align-items: center;
				&:hover {
					background: var(--gray);
					border-radius: 10px;
				}
				@media ${Media.tablet} {
					margin-right: 30px;
				}
				img {
          margin-right: 20px;
				}
				p {
					font-weight: bold;
				}
			}
			svg {
				cursor: pointer;
			}
		}
	}
`;

export default function Profile() {
	const [menu, showMenu] = useState(false);
	const router = useRouter();
	const { obtenerUsuario, usuario } = useContext(UserContext);
	const { angels, obtenerAngeles } = useContext(AngelContext);
	const { photo, firstname, lastname } = usuario;

	const windowWith = typeof window !== 'undefined' && window.innerWidth;

	useEffect(() => {
		if (Object.keys(usuario).length === 0) {
			obtenerUsuario();
		}
		if (angels.length === 0) {
			obtenerAngeles();
		}
		if (windowWith >= 1440) {
			showMenu(true);
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
														width="60px"
														height="60px"
													/>
													<p>
														{angel.firstname} {angel.lastname}
													</p>
												</>
											) : (
												<>
													<Image
														src={angel.photo}
														width="60px"
														height="60px"
													/>
													<p>
														{angel.firstname} {angel.lastname}
													</p>
												</>
											)}
										</div>
									</Link>
								))}
							</>
						)}
					</div>
				</div>
			</ProfileContainer>
		</Layout>
	);
}
