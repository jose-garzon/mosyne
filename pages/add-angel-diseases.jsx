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
import IconPlus from '../components/ui/icons/IconPlus';
import IconDelete from '../components/ui/icons/IconDelete';
import { Media } from '../types/mediaquery';

//----- import context
import validarAngelDiseases from '../validation/validarAngelDiseases';
import AngelContext from '../context/angel/angelContext';

const AddAngelDiseasesContainer = styled.main`
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
		legend {
			font-size: 10px;
			font-style: italic;
			@media ${Media.tablet} {
				font-size: 12px;
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
				margin-top: 5px;
				color: var(--black);
				background-color: var(--gray);
				border-color: var(--gray);
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
			.error {
				margin: 5px 0 0;
				font-size: 10px;
				color: var(--red);
			}
		}
		.checkbox-group {
			display: flex;
			justify-content: flex-start;
      margin-top: 10px;
		  }
    .checkbox {
      display: flex;
      align-items: center;
      padding: 2px 10px;
      border-radius: 20px;
      margin-right: 5px;
      border: 2px solid var(--gray);
      div {
        width: 10px;
        height: 10px;
        margin-right: 8px;
        border-radius:50%;
        border: 1px solid var(--purple1);
      }
      input:checked + div {
        background: var(--purple1);
      }
      input {
        display: none;
      }
    }
		}
		.alergias,
		.cirugias,
		.medicamentos {
			div {
				margin-top: 5px;
				display: flex;
				align-items: center;
				svg {
					cursor: pointer;
				}
				input {
					margin-top: 0;
					margin-right: 40px;
					width: 70%;
				}
			}
			div:not(:first-of-type) {
				width: 70%;
				justify-content: space-between;
				p {
					font-size: 12px;
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

export default function AddAngelDiseases() {
	const router = useRouter();

	const { agregarAngelDisease, agregarAngel } = useContext(AngelContext);

	const [menu, showMenu] = useState(false);
	const [error, setError] = useState({});
	const [diseases, setDiseases] = useState({
		blood_type: '',
		living_alone: false,
		detonant: '',
		alergies: [],
		surgeries: [],
		medicines: [],
		diabetes: false,
		hypertension: false,
		suffering: '',
		health_info: '',
	});

	const handleChange = (e) => {
		setDiseases({
			...diseases,
			[e.target.name]: e.target.value,
		});
	};

	const handleChangeDH = (e) => {
		setDiseases({
			...diseases,
			[e.target.name]: e.target.checked,
		});
	};

	const handleChangeASM = (name) => {
		let value = document.getElementById(name).value;
		if (value.trim() === '') {
			setError({
				...error,
				[name]: 'Completa este campo',
			});
			return;
		}
		setError({});
		document.getElementById(name).value = '';
		setDiseases({
			...diseases,
			[name]: [...diseases[name], value],
		});
	};

	const deleteASM = (name, elemento) => {
		setDiseases({
			...diseases,
			[name]: diseases[name].filter((d, index) => index !== elemento),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errores = validarAngelDiseases(diseases);
		setError(errores);
		if (Object.keys(errores).length === 0) {
			agregarAngelDisease(diseases);
			agregarAngel();
		}
	};
	const windowWith = typeof window !== 'undefined' && window.innerWidth;

	useEffect(() => {
		if (windowWith >= 1440) {
			showMenu(true);
		}
	}, []);

	return (
		<Layout display="flex" menu={true}>
			<Menu menu={menu} showMenu={showMenu} />
			<AddAngelDiseasesContainer>
				<Header>
					<Logout />
				</Header>
				<h1>Enfermedades y Padecimientos</h1>
				<Bullets bullet="3" />
				<form onSubmit={handleSubmit}>
					<legend>* campos obligatorios</legend>
					<div>
						<label htmlFor="">Tipo de sangre*</label>
						<select name="blood_type" onChange={handleChange}>
							<option value="">-- Selecciona --</option>
							<option value="A-">A-</option>
							<option value="A+">A+</option>
							<option value="B-">B-</option>
							<option value="B+">B+</option>
							<option value="AB-">AB-</option>
							<option value="AB+">AB+</option>
							<option value="O-">O-</option>
							<option value="O+">O+</option>
						</select>
						{error.blood_type && <p className="error">* {error.blood_type}</p>}
					</div>
					<div className="life">
						<label htmlFor="">¿Vive solo?</label>
						<div className="checkbox-group">
							<div className="checkbox">
								<input
									type="radio"
									name="living_alone"
									id="si"
									value={true}
									onChange={handleChange}
								/>
								<div></div>
								<label htmlFor="si">Si</label>
							</div>
							<div className="checkbox">
								<input
									type="radio"
									name="living_alone"
									id="no"
									value={false}
									onChange={handleChange}
								/>
								<div></div>
								<label htmlFor="no">No</label>
							</div>
						</div>
					</div>
					<div className="detonante">
						<label htmlFor="">Detonante del Alzheimer*</label>
						<div className="checkbox-group">
							<div className="checkbox">
								<input
									type="radio"
									name="detonant"
									id="herencia"
									value="inherited"
									onChange={handleChange}
								/>
								<div></div>
								<label htmlFor="herencia">Herencía</label>
							</div>
							<div className="checkbox">
								<input
									type="radio"
									name="detonant"
									id="depresion"
									value="depression"
									onChange={handleChange}
								/>
								<div></div>
								<label htmlFor="depresion">Depresión</label>
							</div>
							<div className="checkbox">
								<input
									type="radio"
									name="detonant"
									id="neurologico"
									value="neurological"
									onChange={handleChange}
								/>
								<div></div>
								<label htmlFor="neurologico">Neurologico</label>
							</div>
						</div>
						{error.detonant && <p className="error">* {error.detonant}</p>}
					</div>
					<div className="alergias">
						<label htmlFor="">Alergías</label>
						<div>
							<Input type="text" id="alergies" />
							<IconPlus
								width="20px"
								height="20px"
								onClick={() => handleChangeASM('alergies')}
							/>
						</div>
						{error.alergies && <p className="error">* {error.alergies}</p>}
						{diseases.alergies.map((alergie, index) => (
							<div key={`alergie-${index}`}>
								<p>{alergie}</p>
								<IconDelete
									width="15px"
									height="15px"
									onClick={() => deleteASM('alergies', index)}
								/>
							</div>
						))}
					</div>
					<div className="cirugias">
						<label htmlFor="">Cirugías</label>
						<div>
							<Input type="text" id="surgeries" />
							<IconPlus
								width="20px"
								height="20px"
								onClick={() => handleChangeASM('surgeries')}
							/>
						</div>
						{error.surgeries && <p className="error">* {error.surgeries}</p>}
						{diseases.surgeries.map((surgerie, index) => (
							<div key={`surgerie-${index}`}>
								<p>{surgerie}</p>
								<IconDelete
									width="15px"
									height="15px"
									onClick={() => deleteASM('surgeries', index)}
								/>
							</div>
						))}
					</div>
					<div className="medicamentos">
						<label htmlFor="">Medicamentos</label>
						<div>
							<Input type="text" id="medicines" />
							<IconPlus
								width="20px"
								height="20px"
								onClick={() => handleChangeASM('medicines')}
							/>
						</div>
						{error.medicines && <p className="error">* {error.medicines}</p>}
						{diseases.medicines.map((medicine, index) => (
							<div key={`medicine-${index}`}>
								<p>{medicine}</p>
								<IconDelete
									width="15px"
									height="15px"
									onClick={() => deleteASM('medicines', index)}
								/>
							</div>
						))}
					</div>
					<div className="disease">
						<label htmlFor="">¿Sufré de alguna de estas enfermedades?</label>
						<div className="checkbox-group">
							<div className="checkbox">
								<input
									type="checkbox"
									name="diabetes"
									id="diabetes"
									onChange={handleChangeDH}
								/>
								<div></div>
								<label htmlFor="diabetes">Diabetes</label>
							</div>
							<div className="checkbox">
								<input
									type="checkbox"
									name="hypertension"
									id="hypertension"
									onChange={handleChangeDH}
								/>
								<div></div>
								<label htmlFor="hypertension">Hipertensión</label>
							</div>
						</div>
					</div>
					<div>
						<label htmlFor="health_info">Reacciones ante medicamentos</label>
						<textarea
							name="health_info"
							cols="30"
							rows="10"
							placeholder="Describe reacciones ante medicamentos"
							onChange={handleChange}
						></textarea>
					</div>
					<div>
						<label htmlFor="suffering">Dolencias</label>
						<textarea
							name="suffering"
							id=""
							cols="30"
							rows="10"
							placeholder="Describe dolencias recientes"
							onChange={handleChange}
						></textarea>
					</div>
					<div className="buttons">
						<Link href="/add-angel-contact">
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
							Guardar y generar QR
						</Button>
					</div>
				</form>
			</AddAngelDiseasesContainer>
		</Layout>
	);
}
