export default function validarRegister(valores) {
	let errores = {};

	if (valores.firstname?.trim() === '') {
		errores.firstname = 'Completa este campo';
	} else if (valores.firstname?.length < 2) {
		errores.firstname = 'Mínimo 2 caracteres';
	}

	if (valores.lastname?.trim() === '') {
		errores.lastname = 'Completa este campo';
	} else if (valores.lastname?.length < 3) {
		errores.lastname = 'Mínimo 3 caracteres';
	}

	if (valores.email?.trim() === '') {
		errores.email = 'Completa este campo.';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
		errores.email = 'Correo electrónico no válido.';
	}

	if (valores.password?.trim() === '') {
		errores.password = 'Completa este campo.';
	} else if (valores.password?.length < 8) {
		errores.password = 'Mínimo 8 caracteres.';
	}

	if (valores.confirmar?.trim() === '') {
		errores.confirmar = 'Completa este campo';
	} else if (valores.confirmar !== valores.password) {
		errores.confirmar = 'Las contraseñas no coinciden';
	}

	return errores;
}
