//----- import Libraries
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

//----- import components
import Layout from '../components/layouts/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import IconMosineAlt from '../components/ui/icons/IconMosineAlt';
import { Media } from '../types/mediaquery';
import ButtonGoogle from '../components/ui/ButtonGoogle';

//----- import context
import validarRegister from '../validation/validarRegister';
import AuthContext from '../context/auth/authContext';

const RegisterContainer = styled.main`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	font-family: var(--font);
	@media ${Media.tablet} {
		width: 70vw;
		margin: 0 auto;
	}
	@media ${Media.desktop} {
		width: 50vw;
		padding: 50px 150px;
	}
	.logo {
		display: flex;
		justify-content: center;
		padding: 20px 0;
		height: 67px;
	}
	form {
		margin-top: 20px;
		padding: 0 10px;
		.input {
			display: flex;
			flex-direction: column;
			margin-bottom: 10px;
			label {
				font-weight: 700;
				font-size: 12px;
			}
		}
	}
	.buttons {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 30px 10px;
		@media ${Media.desktop} {
			padding: 0 150px;
		}
		button {
			width: 100%;
			margin: 0 5px 0 0;
			justify-content: center;
			font-weight: 700;
			&:last-of-type {
				margin: 0 0 0 5px;
			}
		}
	}
	.buttons-google {
		display: flex;
		justify-content: center;
		text-align: center;
	}
`;

const RegisterDesktopContainer = styled.div`
	@media ${Media.desktop} {
		display: flex;
	}
`;

const RegisterDesktopImage = styled.div`
	display: none;
	width: 50vw;
	height: 100vh;
	background-image: url('/static/img/registerDesktop.png');
	background-repeat: no-repeat;
	background-size: 120%;
	border-radius: 0 30px 30px 0;
	box-shadow: 8px 0px 16px rgba(0, 0, 0, 0.2);
	@media ${Media.desktop} {
		display: block;
	}
`;

export default function Register() {
	const { registrarUsuario, usuario } = useContext(AuthContext);

	const [error, setError] = useState({});

	const [user, setUser] = useState({
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		confirmar: '',
	});

	const { firstname, lastname, email, password, confirmar } = user;

	const onChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = () => {
		const errores = validarRegister(user);
		setError(errores);
		if (Object.keys(errores).length === 0) {
			registrarUsuario({
				email,
				password,
				firstname,
				lastname,
			});
		}
	};

	useEffect(() => {
		if (Object.keys(usuario).length !== 0) {
			setUser({
				...usuario,
				password: '',
				confirmar: '',
			});
		}
	}, []);

	const windowWith = typeof window !== 'undefined' && window.innerWidth;

	return (
		<Layout>
			<RegisterDesktopContainer>
				<RegisterDesktopImage />
				<RegisterContainer>
					<div className="logo">
						<IconMosineAlt />
					</div>
					<form>
						<div className="input">
							<label htmlFor="nombre">* Nombre</label>
							<Input
								type="text"
								placeholder="Mínimo 2 caracteres"
								name="firstname"
								value={firstname}
								onChange={onChange}
							/>
							{error.firstname && <p>* {error.firstname}</p>}
						</div>
						<div className="input">
							<label htmlFor="apellido">* Apellidos</label>
							<Input
								type="text"
								placeholder="Mínimo 3 caracteres"
								name="lastname"
								value={lastname}
								onChange={onChange}
							/>
							{error.lastname && <p>* {error.lastname}</p>}
						</div>
						<div className="input">
							<label htmlFor="email">* Correo electrónico</label>
							<Input
								type="email"
								placeholder="ejemplo@mail.com"
								name="email"
								value={email}
								onChange={onChange}
							/>
							{error.email && <p>* {error.email}</p>}
						</div>
						<div className="input">
							<label htmlFor="password">* Contraseña</label>
							<Input
								type="password"
								placeholder="Mínimo 8 caracteres"
								name="password"
								value={password}
								onChange={onChange}
							/>
							{error.password && <p>* {error.password}</p>}
						</div>
						<div className="input">
							<label htmlFor="confirmar">* Confirma tu contraseña</label>
							<Input
								type="password"
								placeholder="Escríbe de nuevo tu contraseña"
								name="confirmar"
								value={confirmar}
								onChange={onChange}
							/>
							{error.confirmar && <p>* {error.confirmar}</p>}
						</div>
					</form>
					<div className="buttons">
						<Link href={windowWith < 1440 ? '/info' : '/'}>
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
							onClick={() => handleSubmit()}
						>
							Crear Cuenta
						</Button>
					</div>
					<div className="buttons-google">
						<ButtonGoogle
							bgColor="#DB4A39"
							textColor="#FAFAFA"
							borderColor="#DB4A39"
							shadow="true"
							width="initial"
						/>
					</div>
				</RegisterContainer>
			</RegisterDesktopContainer>
		</Layout>
	);
}
