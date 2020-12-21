import Axios from 'axios';

const BASE_URL = 'https://mosine-api-297015.uc.r.appspot.com/api';

const request = async (path, method, body) => {
	try {
		const { data, status } = await Axios({
			url: `${BASE_URL}${path}`,
			method,
			data: body,
			withCredentials: true,
		});
		return { data, status };
	} catch (error) {
		const data = error.response.data || {};
		const status = error.response.status || 500;
		return { data, status };
	}
};

export const clienteAxios = {
	get: async (path) => request(path, 'GET'),
	post: async (path, data) => request(path, 'POST', data),
	put: async (path, data) => request(path, 'PUT', data),
};

export default clienteAxios;
