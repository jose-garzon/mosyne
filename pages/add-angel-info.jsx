//----- import Libraries
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';

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
import AngelContext from '../context/angel/angelContext';
import validarAngelInfo from '../validation/validarAngelInfo';

const AddAngelInfoContainer = styled.main`
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
		padding: 10px;
	}
	h1 {
		font-size: 18px;
		color: var(--blue);
		margin: 0;
		@media ${Media.tablet} {
			padding: 20px 30px;
			font-size: 20px;
		}
		@media ${Media.desktop} {
			padding: 30px 250px;
			font-size: 25px;
		}
	}
	form {
		@media ${Media.tablet} {
			padding: 30px;
		}
		@media ${Media.desktop} {
			padding: 30px 250px;
		}
		legend {
			font-size: 10px;
			font-style: italic;
			@media ${Media.tablet} {
				font-size: 12px;
			}
		}
		input {
			@media ${Media.tablet} {
				font-size: 14px;
			}
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
			textarea,
			select {
				margin-top: 10px;
				color: var(--black);
				background-color: var(--gray);
				border-color: var(--gray);
				border-radius: 2px;
				@media ${Media.tablet} {
					font-size: 14px;
				}
			}
			textarea {
				font-family: var(--font);
				padding: 10px;
			}
			select {
				height: 40px;
			}
			p {
				margin: 5px 0 0;
				font-size: 10px;
				color: var(--red);
			}
		}
		.image > div {
			background-color: var(--gray);
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
		.buttons {
			flex-direction: row;
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
		.state {
			width: 100%;
			justify-content: space-between;
			div {
				margin-right: 20px;
				&:last-of-type {
					margin-right: 0;
				}
			}
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
	}
`;

export default function AddAngelInfo() {
	const router = useRouter();
	const { agregarAngelInfo } = useContext(AngelContext);
	const [menu, showMenu] = useState(false);
	const [error, setError] = useState({});
	const [angel, setAngel] = useState({
		photo: '',
		guardian_relation: '',
		firstname: '',
		lastname: '',
		nationality: '',
		about: '',
		address: {
			city: '',
			municipality: '',
			neighborhood: '',
			street: '',
			num_int: '',
			num_ext: '',
			cp: '',
		},
	});
	const windowWith = typeof window !== 'undefined' && window.innerWidth;

	useEffect(() => {
		if (windowWith >= 1440) {
			showMenu(true);
		}
	}, []);

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
			agregarAngelInfo(angel);
			router.push('/add-angel-contact');
		}
	};

	return (
		<Layout display="flex" menu={true}>
			<Menu menu={menu} showMenu={showMenu} />
			<AddAngelInfoContainer>
				<Header>
					<Logout />
				</Header>
				<h1>Agrega a tu angel</h1>
				<Bullets bullet="1" />
				<form onSubmit={handleSubmit}>
					<legend>* campos obligatorios</legend>
					<div className="image">
						<label htmlFor="image">Foto</label>
						<div>
							<input
								type="file"
								accept="image/*"
								id="inputImageAngel"
								onChange={readImageFile}
							/>
							{angel.photo.trim() === ''
								? 'Sube una fotografía de tu angel'
								: 'Foto subida'}
						</div>
					</div>
					<div>
						<label htmlFor="guardian_relation">Parentesco*</label>
						<select name="guardian_relation" onChange={handleChange}>
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
						{error.guardian_relation && <p>* {error.guardian_relation}</p>}
					</div>
					<div className="row">
						<div>
							<label htmlFor="firstname">Nombre*</label>
							<Input
								type="text"
								placeholder="Mínimo 2 caracteres"
								name="firstname"
								onChange={handleChange}
							/>
							{error.firstname && <p>* {error.firstname}</p>}
						</div>
						<div>
							<label htmlFor="lastname">Apellido*</label>
							<Input
								type="text"
								placeholder="Mínimo 3 caracteres"
								name="lastname"
								onChange={handleChange}
							/>
							{error.lastname && <p>* {error.lastname}</p>}
						</div>
					</div>
					<div>
						<label htmlFor="nationality">Nacionalidad*</label>
						<select name="nationality" onChange={handleChange}>
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
							cols="30"
							rows="10"
							placeholder="Escribe sus gustos, miedos, personalidad, etc."
							name="about"
							id="about"
							onChange={handleChange}
						></textarea>
					</div>
					<hr />
					<div className="row">
						<div>
							<label htmlFor="city">Estado</label>
							<Input type="text" name="city" onChange={handleChangeAddress} />
						</div>
						<div>
							<label htmlFor="municipality">Municipio/Delegación</label>
							<Input
								type="text"
								name="municipality"
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
								onChange={handleChangeAddress}
							/>
						</div>
						<div>
							<label htmlFor="cp">CP</label>
							<Input type="text" name="cp" onChange={handleChangeAddress} />
						</div>
					</div>
					<div>
						<label htmlFor="street">Calle</label>
						<Input type="text" name="street" onChange={handleChangeAddress} />
					</div>
					<div className="row">
						<div>
							<label htmlFor="num_int">Numero interior</label>
							<Input
								type="text"
								name="num_int"
								onChange={handleChangeAddress}
							/>
						</div>
						<div>
							<label htmlFor="num_ext">Numero exterior</label>
							<Input
								type="text"
								name="num_ext"
								onChange={handleChangeAddress}
							/>
						</div>
					</div>
					<div className="buttons">
						<Link href="/profile">
							<Button
								bgColor="transparent"
								textColor="var(--purple1)"
								borderColor="var(--purple1)"
							>
								Cancelar
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
			</AddAngelInfoContainer>
		</Layout>
	);
}
