//----- import Libraries
import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

//----- import components
import Image from '../ui/Image';
import ButtonQR from '../ui/ButtonQR';
import { Media } from '../../types/mediaquery';
import IconUserDefault from '../ui/icons/IconUserDefault';

//----- import context
import AngelContext from '../../context/angel/angelContext';

const CardAngelContainer = styled.div`
	padding: 10px;
	@media ${Media.tablet} {
		padding: 20px 30px;
	}
	@media ${Media.desktop} {
		padding: 30px 250px;
	}
	.info {
		@media ${Media.tablet} {
			display: flex;
			align-items: center;
		}
	}
	.user {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		h1 {
			font-weight: 700;
			font-size: 18px;
			color: var(--black);
			margin: 0;
			margin-left: 12px;
			margin-right: 50px;
			@media ${Media.desktop} {
				font-size: 20px;
			}
			@media ${Media.desktop} {
				font-size: 25px;
			}
		}
	}
	p {
		margin: 0;
		font-size: 12px;
		color: var(--black);
	}
	ul {
		padding: 0 10px;
		list-style: none;
		display: flex;
		li {
			font-size: 10px;
			color: var(--black);
			cursor: pointer;
			margin-right: 20px;
			@media ${Media.tablet} {
				font-size: 14px;
			}
			&:nth-of-type(${(props) => props.tab}) {
				margin-right: 20px;
				padding-bottom: 5px;
				border-bottom: 3px solid var(--blue);
			}
		}
	}
`;

const CardAngel = ({ tab, menu, angel }) => {
	const { obtenerAngel, angelinfo } = useContext(AngelContext);
	const router = useRouter();
	const {
		query: { id },
	} = router;

	useEffect(() => {
		obtenerAngel(id);
	}, []);
	const windowWith = typeof window !== 'undefined' && window.innerWidth;

	return (
		<CardAngelContainer tab={tab} menu={menu}>
			<div className="info">
				<div className="user">
					{angelinfo.photo === '' ? (
						<IconUserDefault
							fill="#000000"
							width={windowWith >= 720 ? '50px' : '39px'}
							height={windowWith >= 720 ? '50px' : '39px'}
						/>
					) : (
						<Image
							src={angelinfo.photo}
							alt={angelinfo.firstname}
							width="50px"
							height="50px"
						/>
					)}
					<h1>
						{angelinfo.firstname} {angelinfo.lastname}
					</h1>
				</div>
				<ButtonQR id={id} />
			</div>
			<ul>
				<Link href={`/profile-angel-data/${id}`}>
					<li>Datos personales</li>
				</Link>
				<Link href={`/profile-angel-contacts/${id}`}>
					<li>Contactos de emergencia</li>
				</Link>
				<Link href={`/profile-angel-diseases/${id}`}>
					<li>Padecimientos y síntomas</li>
				</Link>
			</ul>
		</CardAngelContainer>
	);
};

export default CardAngel;
