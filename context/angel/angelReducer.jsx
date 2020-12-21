import {
	AGREGAR_ANGEL_INFO,
	AGREGAR_ANGEL_CONTACT,
	AGREGAR_ANGEL_DISEASES,
	AGREGAR_ANGEL,
	OBTENER_ANGELES,
	OBTENER_ANGEL,
} from '../../types';

const AngelReducer = (state, action) => {
	switch (action.type) {
		case AGREGAR_ANGEL_INFO:
		case OBTENER_ANGEL:
			return {
				...state,
				angelinfo: action.payload,
			};
		case AGREGAR_ANGEL_CONTACT:
			return {
				...state,
				contacts: [action.payload],
			};
		case AGREGAR_ANGEL_DISEASES:
			return {
				...state,
				angelinfo: Object.assign(state.angelinfo, action.payload),
			};
		case AGREGAR_ANGEL:
			return {
				...state,
				angelid: action.payload,
			};
		case OBTENER_ANGELES:
			return {
				...state,
				angels: action.payload,
			};
		default:
			return state;
	}
};
export default AngelReducer;
