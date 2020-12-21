export default function validarAngelContact(valores) {
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

	if (valores.angel_relation?.trim() === '') {
		errores.angel_relation = 'Completa este campo.';
	}

	if (valores.phone?.trim() === '') {
		errores.phone = 'Completa este campo.';
	}

	if (valores.cel?.trim() === '') {
		errores.cel = 'Completa este campo.';
	}

	return errores;
}
