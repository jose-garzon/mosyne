export default function validarLogin(valores) {
	let errores = {};

	if (valores.email?.trim() === '') {
		errores.email = 'Completa este campo.';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
		errores.email = 'Correo electrónico no válido.';
	}

	if (valores.password?.trim() === '') {
		errores.password = 'Completa este campo.';
	}

	return errores;
}
