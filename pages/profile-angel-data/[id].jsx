//----- import Libraries
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

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
import validarAngelInfo from '../../validation/validarAngelInfo';
import AngelContext from '../../context/angel/angelContext';

const ProfileAngelDataContainer = styled.section`
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
		padding: 10px;
		background-color: var(--gray);
		min-height: 100%;
		@media ${Media.tablet} {
			padding: 20px 30px;
		}
		@media ${Media.desktop} {
			padding: 30px 250px;
		}
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
			select {
				height: 40px;
				background-color: var(--white);
				border: none;
				border-radius: 3px;
			}
			input {
				background-color: var(--white);
				@media ${Media.tablet} {
					font-size: 14px;
				}
			}
			textarea {
				margin-top: 5px;
				background-color: var(--white);
				border-color: var(--gray);
				font-family: var(--font);
				padding: 10px;
				@media ${Media.tablet} {
					font-size: 14px;
				}
			}
			}
						.image > div {
				background-color: var(--white);
				color: var(--violet);
				cursor: pointer;
				font-size: 12px;
				min-height: 30px;
				overflow: hidden;
				padding: 4px;
				position: relative;
				justify-content: center;
				align-items: center;
				display: flex;
				width: 200px;
				border-radius: 2px;
				margin-top: 10px;
				input {
					border: 10000px solid transparent;
					cursor: pointer;
					font-size: 10000px;
					margin: 0;
					opacity: 0;
					outline: 0 none;
					padding: 0;
					position: absolute;
					right: -1000px;
					top: -1000px;
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
		.buttons {
			flex-direction: row;
			justify-content: flex-end;
			margin: 20px 0;
			button {
				margin: 0;
				&:first-of-type {
					margin-right: 10px;
				}
			}
		}
	}
`;

export default function ProfileAngelData() {
	const [menu, showMenu] = useState(false);
	const { editarAngelInfo } = useContext(AngelContext);
	const router = useRouter();
	const {
		query: { id },
	} = router;
	const windowWith = typeof window !== 'undefined' && window.innerWidth;

	const { obtenerAngel, angelinfo } = useContext(AngelContext);
	const [error, setError] = useState({});
	const [angel, setAngel] = useState({});

	useEffect(() => {
		obtenerAngel(id);
		if (windowWith >= 1440) {
			showMenu(true);
		}
	}, []);
	useEffect(() => {
		setAngel({
			...angelinfo,
			photo: angelinfo.photo,
			guardian_relation: angelinfo.guardian_relation,
			firstname: angelinfo.firstname,
			lastname: angelinfo.lastname,
			nationality: angelinfo.nationality,
			about: angelinfo.about,
			address: {
				city: angelinfo.address.city,
				municipality: angelinfo.address.municipality,
				neighborhood: angelinfo.address.neighborhood,
				street: angelinfo.address.street,
				num_int: angelinfo.address.num_int,
				num_ext: angelinfo.address.num_ext,
				cp: angelinfo.address.cp,
			},
		});
	}, [angelinfo]);

	const readImageFile = () => {
		const imageFile = document.getElementById('inputImageAngel').files[0];
		const reader = new FileReader();
		reader.readAsDataURL(imageFile);
		reader.onload = () => setAngel({ ...angel, photo: reader.result });
	};

	const handleChange = (e) => {
		setAngel({
			...angel,
			[e.target.name]: e.target.value,
		});
	};

	const handleChangeAddress = (e) => {
		setAngel({
			...angel,
			address: {
				...angel.address,
				[e.target.name]: e.target.value,
			},
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errores = validarAngelInfo(angel);
		setError(errores);
		if (Object.keys(errores).length === 0) {
			editarAngelInfo(id, angel);
		}
	};

	return (
		<Layout display="flex" menu={true}>
			<Menu menu={menu} showMenu={showMenu} />
			<ProfileAngelDataContainer>
				<Header>
					<Logout />
				</Header>
				<CardAngel tab="1" menu={menu} angel={id} />
				<form onSubmit={handleSubmit}>
					<div className="image">
						<label htmlFor="image">Foto</label>
						<div>
							<input
								type="file"
								accept="image/*"
								id="inputImageAngel"
								onChange={readImageFile}
							/>
							{angel.photo?.trim() === ''
								? 'Sube una fotografía de tu angel'
								: 'Foto subida'}
						</div>
					</div>
					<div className="row">
						<div>
							<label htmlFor="firstname">Nombre*</label>
							<Input
								type="text"
								placeholder="Mínimo 2 caracteres"
								name="firstname"
								id="firstname"
								defaultValue={angel.firstname}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="lastname">Apellido*</label>
							<Input
								type="text"
								placeholder="Mínimo 3 caracteres"
								name="lastname"
								id="lastname"
								defaultValue={angel.lastname}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div>
						<label htmlFor="nationality">Nacionalidad*</label>
						<select
							defaultValue={angel.nationality}
							name="nationality"
							id="nationality"
							onChange={handleChange}
						>
							<option value="">-- Selecciona --</option>
							<option value="Argentina">Argentina</option>
							<option value="Bolivia">Boliviana</option>
							<option value="Chile">Chilena</option>
							<option value="Colombia">Colombiana</option>
							<option value="Guatemala">Gautemalteca</option>
							<option value="Honduras">Hondureña</option>
							<option value="Mexico">Mexicana</option>
							<option value="Panama">Panameña</option>
							<option value="Peru">Peruana</option>
							<option value="Spain">Española</option>
							<option value="Venezuela">Venezolana</option>
						</select>
						{error.nationality && <p>* {error.nationality}</p>}
					</div>
					<div>
						<label htmlFor="about">Sobre tu angel</label>
						<textarea
							name=""
							id=""
							cols="30"
							rows="10"
							placeholder="Escribe sus gustos, miedo, personalidad, etc."
							name="about"
							id="about"
							defaultValue={angel.about}
							onChange={handleChange}
						></textarea>
					</div>
					<hr />
					<div className="row">
						<div>
							<label htmlFor="city">Estado</label>
							<Input
								type="text"
								name="city"
								id="city"
								defaultValue={angel.address?.city}
								onChange={handleChangeAddress}
							/>
						</div>
						<div>
							<label htmlFor="municipality">Municipio/Delegación</label>
							<Input
								type="text"
								name="municipality"
								id="municipality"
								defaultValue={angel.address?.municipality}
								onChange={handleChangeAddress}
							/>
						</div>
					</div>
					<div className="row">
						<div>
							<label htmlFor="neighborhood">Colonia</label>
							<Input
								type="text"
								name="neighborhood"
								id="neighborhood"
								defaultValue={angel.address?.neighborhood}
								onChange={handleChangeAddress}
							/>
						</div>
						<div>
							<label htmlFor="cp">CP</label>
							<Input
								type="text"
								name="cp"
								id="cp"
								defaultValue={angel.address?.municipality}
								onChange={handleChangeAddress}
							/>
						</div>
					</div>
					<div>
						<label htmlFor="street">Calle y número</label>
						<Input
							type="text"
							name="street"
							id="street"
							defaultValue={angel.address?.street}
							onChange={handleChangeAddress}
						/>
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
			</ProfileAngelDataContainer>
		</Layout>
	);
}
