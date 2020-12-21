import React, { useReducer } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/Axios';

import { LOGIN_GOOGLE } from '../../types';

const AuthState = (props) => {
	const router = useRouter();

	const initialState = {
		usuario: {},
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const windowWith = typeof window !== 'undefined' && window.innerWidth;

	const registrarUsuario = async (usuario) => {
		const { status } = await clienteAxios.post('/auth/signup', usuario);
		if (status === 201) {
			router.push('/');
			Swal.fire(
				'¡Registro exitoso!',
				'Verifica tu email para poder loguearte.',
				'success'
			);
			if (windowWith >= 1440) {
				window.location = '/';
			} else {
				window.location = '/register-confirm';
			}
		}
		if (status === 409) {
			Swal.fire({
				icon: 'error',
				title: '¡Error!',
				text: 'Este correo ya está registrado.',
			});
		}
	};

	const loginUsuario = async (usuario) => {
		const { status } = await clienteAxios.post('/auth/login', usuario);
		if (status === 200) {
			window.location = '/profile';
			Swal.fire(
				'¡Inicio de sesión exitoso!',
				'Haz iniciado sesión correctamente.',
				'success'
			);
		}
		if (status === 401) {
			Swal.fire({
				icon: 'error',
				title: '¡Error!',
				text: 'Correo o contraseña incorrecta.',
			});
		}

		if (status === 412) {
			Swal.fire({
				icon: 'error',
				title: '¡Error!',
				text: 'No haz verificado tu correo.',
			});
		}
	};

	const logoutUsuario = async () => {
		const { status } = await clienteAxios.post('/auth/logout');
		if (status === 200) {
			router.push('/');
		}
	};

	const recuperarContrasena = async (mail) => {
		const { status } = await clienteAxios.post('/auth/reset_password', mail);
		if (status === 200) {
			Swal.fire(
				'Recuperar contraseña',
				'Se envío el correo exitosamente.',
				'success'
			);
			router.push('/');
		} else if (status === 404) {
			Swal.fire({
				icon: 'warning',
				title: '',
				text: 'El correo electrónico no existe.',
			});
		}
	};

	const registrarGoogle = (usuario) => {
		dispatch({
			type: LOGIN_GOOGLE,
			payload: usuario,
		});
		if (windowWith < 1440) {
			router.push('/info');
		} else {
			router.push('/register');
		}
	};

	return (
		<AuthContext.Provider
			value={{
				usuario: state.usuario,
				registrarUsuario,
				loginUsuario,
				logoutUsuario,
				registrarGoogle,
				recuperarContrasena,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
