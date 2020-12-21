export default function validarAngelDiseases(valores) {
	let errores = {};

	if (valores.detonant?.trim() === '') {
		errores.detonant = 'Completa este campo.';
	}

	if (valores.blood_type?.trim() === '') {
		errores.blood_type = 'Completa este campo.';
	}

	return errores;
}
