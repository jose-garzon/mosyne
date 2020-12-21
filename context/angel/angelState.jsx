import React, { useReducer } from 'react';
import clienteAxios from '../../config/Axios';
import { useRouter } from 'next/router';

import AngelContext from './angelContext';
import AngelReducer from './angelReducer';

import {
	AGREGAR_ANGEL_INFO,
	AGREGAR_ANGEL_CONTACT,
	AGREGAR_ANGEL_DISEASES,
	AGREGAR_ANGEL,
	OBTENER_ANGELES,
	OBTENER_ANGEL,
	EDITAR_ANGEL_INFO,
	EDITAR_ANGEL_CONTACT,
} from '../../types';

import Swal from 'sweetalert2';

const AngelState = (props) => {
	const router = useRouter();

	const initialState = {
		angelinfo: {
			address: {
				city: '',
			},
			contacts: [{}],
		},
		contacts: [],
		angelid: '',
		angels: [],
	};

	const [state, dispatch] = useReducer(AngelReducer, initialState);

	const agregarAngelInfo = (angelinfo) => {
		dispatch({
			type: AGREGAR_ANGEL_INFO,
			payload: angelinfo,
		});
	};

	const agregarAngelContact = (contact) => {
		dispatch({
			type: AGREGAR_ANGEL_CONTACT,
			payload: contact,
		});
	};

	const agregarAngelDisease = (disease) => {
		dispatch({
			type: AGREGAR_ANGEL_DISEASES,
			payload: disease,
		});
	};

	const agregarAngel = async () => {
		const angelinfo = state.angelinfo;
		const contacts = state.contacts;
		const { status, data } = await clienteAxios.post('/angels', {
			angel_info: angelinfo,
			contacts: contacts,
		});
		if (status === 201) {
			dispatch({
				type: AGREGAR_ANGEL,
				payload: data.id,
			});
			Swal.fire(
				'¡Angel creado!',
				'Tu angel fue creado exitosamente.',
				'success'
			);
			router.push('/generate-qr');
		} else {
			Swal.fire({
				icon: 'error',
				title: '¡Error!',
				text: 'Hubo un error.',
			});
		}
	};

	const editarAngelInfo = async (id, angel) => {
		const angelinfo = state.angelinfo;
		const { status, data } = await clienteAxios.put(`/angels/${id}`, angel);
		if (status === 201) {
			// dispatch({
			// 	type: EDITAR_ANGEL_INFO,
			// 	payload: data.id,
			// });
			Swal.fire(
				'¡Ángel modificado!',
				'La información de tu angel se ha modificado exitosamente.',
				'success'
			);
			router.push('/profile');
		} else {
			Swal.fire({
				icon: 'error',
				title: '¡Error!',
				text: 'Hubo un error.',
			});
		}
	};

	const editarAngelContact = async (id, angelContact) => {
		const { status, data } = await clienteAxios.put(
			`/angels/contact/${id}`,
			angelContact
		);
		if (status === 201) {
			// dispatch({
			// 	type: EDITAR_ANGEL_CONTACT,
			// 	payload: data.id,
			// });
			Swal.fire(
				'¡Ángel modificado!',
				'El contacto de tu ángel se ha modificado exitosamente.',
				'success'
			);
			router.push('/profile');
		} else {
			Swal.fire({
				icon: 'error',
				title: '¡Error!',
				text: 'Hubo un error.',
			});
		}
	};

	const obtenerAngeles = async () => {
		const { status, data } = await clienteAxios.get('/angels');
		if (status === 200) {
			dispatch({
				type: OBTENER_ANGELES,
				payload: data,
			});
		}
	};

	const obtenerAngel = async (id) => {
		const { status, data } = await clienteAxios.get(`/angels/${id}`);
		if (status === 200) {
			dispatch({
				type: OBTENER_ANGEL,
				payload: data,
			});
		}
	};

	const encontrarAngel = async (id) => {
		const { status, data } = await clienteAxios.get(
			`/angels/${id}?send_email=true`
		);
		if (status === 200) {
			dispatch({
				type: OBTENER_ANGEL,
				payload: data,
			});
		}
	};

	return (
		<AngelContext.Provider
			value={{
				angelinfo: state.angelinfo,
				angelid: state.angelid,
				angels: state.angels,
				agregarAngelInfo,
				agregarAngelContact,
				agregarAngelDisease,
				agregarAngel,
				obtenerAngeles,
				obtenerAngel,
				editarAngelInfo,
				editarAngelContact,
				encontrarAngel,
			}}
		>
			{props.children}
		</AngelContext.Provider>
	);
};

export default AngelState;
