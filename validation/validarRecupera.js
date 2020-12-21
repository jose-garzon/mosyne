export default function validarRecupera(valores) {
	let errores = {};

	if (valores.email?.trim() === '') {
		errores.email = 'Completa este campo.';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
		errores.email = 'Correo electrónico no válido.';
	}

	return errores;
}
