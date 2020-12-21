//----- import Libraries
import styled from '@emotion/styled';
import { useContext, useState } from 'react';

//----- import components
import Layout from '../components/layouts/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import IconMosineAlt from '../components/ui/icons/IconMosineAlt';
import { Media } from '../types/mediaquery';

//----- import context
import validarRecupera from '../validation/validarRecupera';
import AuthContext from '../context/auth/authContext';
import Link from 'next/link';

const LoginContainer = styled.main`
	width: 100vw;
	height: 100vh;
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
		display: flex;
		flex-direction: column;
		margin-top: 20px;
		input {
			background-color: var(--gray);
			margin: 20px 0;
			@media ${Media.tablet} {
				font-size: 14px;
			}
		}
		button {
			width: 100%;
			justify-content: center;
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
	const { recuperarContrasena } = useContext(AuthContext);

	const [user, setUser] = useState({
		email: '',
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
		const errores = validarRecupera(user);
		setError(errores);
		if (Object.keys(errores).length === 0) {
			recuperarContrasena(user);
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
						<label htmlFor="email">* Correo electrónico</label>
						<Input
							type="email"
							name="email"
							placeholder="Escribe tu correo electrónico"
							value={user.email}
							onChange={onChange}
						/>
						{error.email && <p>* {error.email}</p>}
						<Button
							bgColor="var(--purple1)"
							textColor="#FAFAFA"
							borderColor="var(--purple1)"
							type="submit"
						>
							Enviar Correo
						</Button>
						<Link href="/">
							<Button
								bgColor="transparent"
								textColor="var(--purple1)"
								borderColor="var(--purple1)"
								width="100%"
							>
								Regresar al inicio
							</Button>
						</Link>
					</form>
				</LoginContainer>
			</DesktopContainer>
		</Layout>
	);
}
