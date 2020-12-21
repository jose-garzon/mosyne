//----- import Libraries
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';

//----- import components
import Header from '../components/layouts/Header';
import Layout from '../components/layouts/Layout';
import Logout from '../components/layouts/Logout';
import Menu from '../components/layouts/Menu';
import Bullets from '../components/ui/Bullets';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Media } from '../types/mediaquery';

//----- import context
import UserContext from '../context/user/userContext';
import AngelContext from '../context/angel/angelContext';
import validarAngelContact from '../validation/validarAngelContact';

const AddAngelContactContainer = styled.main`
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
	h1,
	form {
		padding: 10px 10px 0;
		@media ${Media.tablet} {
			padding: 20px 30px;
		}
		@media ${Media.desktop} {
			padding: 30px 250px;
		}
	}
	h1 {
		font-size: 18px;
		color: var(--blue);
		margin: 0;
		@media ${Media.tablet} {
			font-size: 20px;
		}
		@media ${Media.desktop} {
			font-size: 25px;
		}
	}
	form {
		> div {
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
				@media ${Media.tablet} {
					font-size: 14px;
				}
			}
			select {
				margin-top: 5px;
				height: 40px;
				color: var(--black);
				background-color: var(--gray);
				border-color: var(--gray);
				border-radius: 2px;
				@media ${Media.tablet} {
					font-size: 14px;
				}
			}
			p {
				margin: 5px 0 0;
				font-size: 10px;
				color: var(--red);
			}
		}
		legend {
			margin-top: 10px;
			font-size: 10px;
			font-style: italic;
			@media ${Media.tablet} {
				font-size: 12px;
			}
		}
		.buttons {
			flex-direction: row;
		}
		.names,
		.telephone {
			flex-direction: ${(props) => (props.menu ? 'column' : 'row')};
		}
		.contact {
			width: 100%;
			justify-content: space-between;
		}
		.names div:first-of-type {
			margin-right: 20px;
		}
		.buttons {
			margin-top: 20px;
			justify-content: flex-end;
			button {
				margin: 0;
				&:first-of-type {
					margin-right: 10px;
				}
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
	}
`;
const CheckBox = styled.label`
	display: flex;
	align-items: center;
	p {
		font-size: 12px;
		font-weight: bold;
	}
	.button {
		position: relative;
		width: 50px;
		height: 15px;
		border-radius: 40px;
		border: 1px solid var(--terracota);
		cursor: pointer;
		transition: 0.2s;
		&::after {
			content: '';
			position: absolute;
			height: 18px;
			width: 18px;
			top: 50%;
			left: -1px;
			transform: translate(0, -48%);
			border: 1px solid var(--terracota);
			border-radius: 50%;
			background-color: var(--terracota);
			transition: 0.2s;
		}
	}
	input {
		display: none;
	}
	input:checked + .button {
		background-color: var(--terracota);
	}
	input:checked + .button::after {
		background-color: var(--white);
		left: 100%;
		transform: translate(-100%, -48%);
	}
`;

export default function AddAngelContact() {
	const router = useRouter();
	const { usuario } = useContext(UserContext);
	const { agregarAngelContact } = useContext(AngelContext);
	const [menu, showMenu] = useState(false);
	const [error, setError] = useState({});
	const [contact, setContact] = useState({
		angel_relation: '',
		firstname: '',
		lastname: '',
		cel: '',
		phone: '',
	});
	const windowWith = typeof window !== 'undefined' && window.innerWidth;

	useEffect(() => {
		if (windowWith >= 1440) {
			showMenu(true);
		}
	}, []);

	const handleChangeEmergency = (e) => {
		if (e.target.checked) {
			setContact({
				...contact,
				firstname: usuario.firstname,
				lastname: usuario.lastname,
				phone: usuario.phone,
				cel: usuario.cel,
			});
		} else {
			setContact({
				...contact,
				firstname: '',
				lastname: '',
				cel: '',
				phone: '',
			});
		}
	};

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
			const name = contact.firstname + ' ' + contact.lastname;
			agregarAngelContact({
				name,
				angel_relation: contact.angel_relation,
				cel: contact.cel,
				phone: contact.phone,
			});
			router.push('/add-angel-diseases');
		}
	};

	return (
		<Layout display="flex" menu={true}>
			<Menu menu={menu} showMenu={showMenu} />
			<AddAngelContactContainer menu={menu}>
				<Header>
					<Logout />
				</Header>
				<h1>Contactos de emergencia</h1>
				<Bullets bullet="2" />
				<form onSubmit={handleSubmit}>
					<CheckBox className="contact">
						<p>Soy contacto de emergencia</p>
						<input
							type="checkbox"
							id="emergency"
							onChange={handleChangeEmergency}
						/>
						<label className="button" htmlFor="emergency" />
					</CheckBox>
					<legend>* campos obligatorios</legend>
					<div>
						<label htmlFor="angel_relation">¿Qué eres de tu angel?*</label>
						<select
							name="angel_relation"
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
					<div className="row">
						<div>
							<label htmlFor="">Nombre*</label>
							<Input
								type="text"
								placeholder="Mínimo 2 caracteres"
								name="firstname"
								onChange={handleChange}
								value={contact.firstname}
							/>
							{error.firstname && <p>* {error.firstname}</p>}
						</div>
						<div>
							<label htmlFor="">Apellido*</label>
							<Input
								type="text"
								placeholder="Mínimo 3 caracteres"
								name="lastname"
								onChange={handleChange}
								value={contact.lastname}
							/>
							{error.lastname && <p>* {error.lastname}</p>}
						</div>
					</div>
					<div>
						<label htmlFor="">Correo*</label>
						<Input
							type="text"
							placeholder="Mínimo 3 caracteres"
							name="lastname"
							onChange={handleChange}
							value={contact.lastname}
						/>
						{error.lastname && <p>* {error.lastname}</p>}
					</div>
					<hr />
					<div className="row">
						<div>
							<label htmlFor="">Teléfono de casa*</label>
							<Input
								type="text"
								name="phone"
								onChange={handleChange}
								value={contact.phone}
							/>
							{error.phone && <p>* {error.phone}</p>}
						</div>
						<div>
							<label htmlFor="">Teléfono celular*</label>
							<Input
								type="text"
								name="cel"
								onChange={handleChange}
								value={contact.cel}
							/>
							{error.cel && <p>* {error.cel}</p>}
						</div>
					</div>
					<div className="buttons">
						<Link href="/add-angel-info">
							<Button
								bgColor="transparent"
								textColor="var(--purple1)"
								borderColor="var(--purple1)"
							>
								Regresar
							</Button>
						</Link>

						<Button
							bgColor="var(--purple1)"
							textColor="#FAFAFA"
							borderColor="var(--purple1)"
							shadow="true"
							type="submit"
						>
							Siguiente
						</Button>
					</div>
				</form>
			</AddAngelContactContainer>
		</Layout>
	);
}
