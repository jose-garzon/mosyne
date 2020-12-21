//----- import Libraries
import styled from '@emotion/styled';
import Link from 'next/link';
import { useContext, useState } from 'react';

//----- import components
import Layout from '../components/layouts/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import IconGoogle from '../components/ui/icons/IconGoogle';
import IconMosineAlt from '../components/ui/icons/IconMosineAlt';
import { Media } from '../types/mediaquery';

//----- import context
import validarLogin from '../validation/validarLogin';
import AuthContext from '../context/auth/authContext';

const LoginContainer = styled.main`
	width: 100vw;
	min-height: 100vh;
	font-family: var(--font);
	position: relative;
	@media ${Media.tablet} {
		width: 70vw;
		margin: 0 auto;
	}
	@media ${Media.desktop} {
		width: 50%;
		padding: 50px 0;
	}
	.logo {
		padding: 20px 0;
		background-color: var(--gray);
		display: flex;
		justify-content: center;
		height: 67px;
		@media ${Media.desktop} {
			margin: 0 150px;
		}
	}
	form {
		margin-top: 20px;
		padding: 30px 10px;
		@media ${Media.desktop} {
			padding: 0 150px;
		}
		div {
			display: flex;
			flex-direction: column;
			margin-top: 20px;
			&:last-of-type {
				flex-direction: row;
			}
			input {
				background-color: var(--gray);
				@media ${Media.tablet} {
					font-size: 14px;
				}
			}
		}
		div label,
		> p {
			color: var(--black);
			font-size: 12px;
			font-weight: 700;
			@media ${Media.tablet} {
				font-size: 14px;
			}
		}
		div:last-of-type {
			display: flex;
			align-items: center;
			input[type='checkbox']:checked {
				background-color: var(--purple1);
			}
			label {
				font-weight: 400;
			}
		}
		> p {
			text-align: right;
			cursor: pointer;
			&:hover {
				color: var(--purple1);
			}
		}
		button {
			margin-top: 20px;
			width: 100%;
			justify-content: center;
		}
		.recuerdame {
			margin-left: 10px;
			cursor: pointer;
		}
	}
	.footer {
		position: absolute;
		bottom: 10px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 10px;
		margin: 0 0 20px 0;
		@media ${Media.desktop} {
			padding: 0 150px;
		}
		button {
			width: 100%;
			justify-content: center;
			svg {
				margin-right: 10px;
			}
		}
	}
`;

const DesktopContainer = styled.div`
	@media ${Media.desktop} {
		display: flex;
	}
`;

const DesktopImage = styled.div`
	display: none;
	width: 50vw;
	height: 100vh;
	background-image: url('/static/img/hero.png');
	background-repeat: no-repeat;
	background-size: 100%;
	border-radius: 0 30px 30px 0;
	box-shadow: 8px 0px 16px rgba(0, 0, 0, 0.2);
	@media ${Media.desktop} {
		display: block;
	}
`;

export default function Login() {
	const { loginUsuario } = useContext(AuthContext);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState({});

	const onChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errores = validarLogin(user);
		setError(errores);
		if (Object.keys(errores).length === 0) {
			loginUsuario(user);
		}
	};

	return (
		<Layout>
			<DesktopContainer>
				<DesktopImage />
				<LoginContainer>
					<div className="logo">
						<IconMosineAlt />
					</div>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email">* Correo electrónico</label>
							<Input
								type="email"
								name="email"
								placeholder="Escribe tu correo electrónico"
								value={user.email}
								onChange={onChange}
							/>
							{error.email && <p>* {error.email}</p>}
						</div>
						<div>
							<label htmlFor="password">* Contraseña</label>
							<Input
								type="password"
								name="password"
								placeholder="Escribe tu contraseña"
								value={user.password}
								onChange={onChange}
							/>
							{error.password && <p>* {error.password}</p>}
						</div>
						<Link href="/recover-password">
							<p>No recuerdo mi contraseña</p>
						</Link>
						<div>
							<input id="recuerdame" type="checkbox" />
							<label className="recuerdame" htmlFor="recuerdame">
								Recuerdame
							</label>
						</div>
						<Button
							bgColor="var(--purple1)"
							textColor="#FAFAFA"
							borderColor="var(--purple1)"
							type="submit"
						>
							Iniciar sesión
						</Button>
					</form>
					<div className="footer">
						<Button
							bgColor="#DB4A39"
							textColor="#FAFAFA"
							borderColor="#DB4A39"
							shadow="true"
						>
							<IconGoogle /> Entrar con Google
						</Button>
						<Link href="/register">
							<Button
								bgColor="transparent"
								textColor="var(--purple1)"
								borderColor="var(--purple1)"
							>
								Registrate
							</Button>
						</Link>
					</div>
				</LoginContainer>
			</DesktopContainer>
		</Layout>
	);
}
