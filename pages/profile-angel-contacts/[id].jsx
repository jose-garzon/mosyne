//----- import Libraries
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';

//----- import components
import Header from '../../components/layouts/Header';
import Layout from '../../components/layouts/Layout';
import Logout from '../../components/layouts/Logout';
import Menu from '../../components/layouts/Menu';
import CardAngel from '../../components/layouts/CardAngel';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Media } from '../../types/mediaquery';

//----- import context
import validarAngelContact from '../../validation/validarAngelContact';
import AngelContext from '../../context/angel/angelContext';

const ProfileAngelContactsContainer = styled.section`
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
	header {
		background-color: var(--gray);
	}
	form {
		background-color: var(--gray);
		padding: 10px;
		min-height: 100%;
		@media ${Media.tablet} {
			padding: 20px 30px;
		}
		@media ${Media.desktop} {
			padding: 30px 250px;
		}
		div {
			margin-top: 5px;
			display: flex;
			flex-direction: column;
			label {
				font-weight: 700;
				color: var(--violet);
				font-size: 12px;
				@media ${Media.tablet} {
					font-size: 14px;
				}
			}
			input {
				background-color: var(--white);
				@media ${Media.tablet} {
					font-size: 14px;
				}
			}
		}
		select {
			margin-top: 5px;
			height: 40px;
			color: var(--black);
			background-color: var(--white);
			border-color: var(--gray);
			border-radius: 2px;
			@media ${Media.tablet} {
				font-size: 14px;
			}
		}
		.row {
			display: flex;
			flex-direction: row;
			div {
				width: 50%;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				@media ${Media.tablet} {
					align-items: center;
					flex-direction: row;
					margin-top: 10px;
				}
				label {
					margin-right: 12px;
				}
				input {
					width: 100%;
					@media ${Media.tablet} {
						margin: 0;
						font-size: 14px;
					}
				}
			}
			div:first-of-type {
				padding-right: 20px;
			}
		}
		.buttons {
			flex-direction: row;
			justify-content: flex-end;
			margin-top: 20px;
			button {
				margin: 0;
				&:first-of-type {
					margin-right: 10px;
				}
			}
		}
	}
`;

export default function ProfileAngelContacts() {
	const [menu, showMenu] = useState(false);
	const router = useRouter();
	const { obtenerAngel, editarAngelContact, angelinfo } = useContext(
		AngelContext
	);
	const {
		query: { id },
	} = router;
	const windowWith = typeof window !== 'undefined' && window.innerWidth;
	const [error, setError] = useState({});
	const [contact, setContact] = useState({});

	useEffect(() => {
		obtenerAngel(id);
		if (windowWith >= 1440) {
			showMenu(true);
		}
	}, []);
	useEffect(() => {
		setContact({
			angel_relation: angelinfo.contacts[0].angel_relation,
			name: angelinfo.contacts[0].name,
			cel: angelinfo.contacts[0].cel,
			phone: angelinfo.contacts[0].phone,
		});
	}, [angelinfo]);

	const handleChange = (e) => {
		setContact({
			...contact,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errores = validarAngelContact(contact);
		setError(errores);
		if (Object.keys(errores).length === 0) {
			editarAngelContact(id, contact);
		}
	};

	return (
		<Layout display="flex" menu={true}>
			<Menu menu={menu} showMenu={showMenu} />
			<ProfileAngelContactsContainer menu={menu}>
				<Header>
					<Logout />
				</Header>
				<CardAngel tab="2" menu={menu} id={id} />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="angel_relation">¿Qué eres de tu angel?*</label>
						<select
							name="angel_relation"
							id="angel_relation"
							onChange={handleChange}
							value={contact.angel_relation}
						>
							<option value="">-- Selecciona --</option>
							<option value="hijo">Hijo</option>
							<option value="hija">Hija</option>
							<option value="madre">Madre</option>
							<option value="padre">Padre</option>
							<option value="abuela">Abuela</option>
							<option value="abuelo">Abuelo</option>
							<option value="nieto">Nieto</option>
							<option value="nieta">Nieta</option>
							<option value="amig@">Amig@</option>
							<option value="tio">Tio</option>
							<option value="tia">Tia</option>
							<option value="prim@">Prim@</option>
							<option value="otro">Otro</option>
						</select>
						{error.angel_relation && <p>* {error.angel_relation}</p>}
					</div>
					<div>
						<label htmlFor="name">Nombre*</label>
						<Input
							type="text"
							placeholder="Mínimo 2 caracteres"
							name="name"
							id="name"
							defaultValue={contact.name}
							onChange={handleChange}
						/>
					</div>
					<div className="row">
						<div>
							<label htmlFor="phone">Teléfono de casa</label>
							<Input
								type="text"
								name="phone"
								id="phone"
								defaultValue={contact.phone}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="cel">Teléfono celular</label>
							<Input
								type="text"
								name="cel"
								id="cel"
								defaultValue={contact.cel}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="buttons">
						<Button
							bgColor="transparent"
							textColor="var(--purple1)"
							borderColor="var(--purple1)"
						>
							Regresar
						</Button>
						<Button
							bgColor="var(--purple1)"
							textColor="#FAFAFA"
							borderColor="var(--purple1)"
							shadow="true"
							type="submit"
						>
							Guardar
						</Button>
					</div>
				</form>
			</ProfileAngelContactsContainer>
		</Layout>
	);
}
