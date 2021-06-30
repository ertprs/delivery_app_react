const textValidation = (value) => {

    if (value.length < 6) {
        return 'Por favor, informe no mínimo 6 caracteres.'
    }
    else if (value.length > 100) {
        return 'Por favor, informe no máximo 100 caracteres.'
    }

    return true;
}

export default textValidation;