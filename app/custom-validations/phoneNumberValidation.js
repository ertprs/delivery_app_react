const phoneNumberValidation = (value) => {

    //se o campo não foi preenchido
    if (value.length < 8) {
        return 'Por favor, informe no mínimo 8 caracteres.';
    }
    else if (value.length > 12) {
        return 'Por favor, informe no máximo 12 caracteres.';
    }
    //se o campo não contem um endereço de email válido
    else if (!/^[0-9]{8,12}$/.test(value)) {
        return 'Por favor, informe somente números.'
    }

    return true;
}

export default phoneNumberValidation;