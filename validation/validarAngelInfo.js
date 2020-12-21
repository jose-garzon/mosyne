export default function validarAngelInfo(valores) {
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

	if (valores.guardian_relation?.trim() === '') {
		errores.guardian_relation = 'Completa este campo.';
	}
	if (valores.nationality?.trim() === '') {
		errores.nationality = 'Completa este campo.';
	}

	return errores;
}
