const passwordValidation = (value) => {

    //se o campo não foi preenchido
    if (value.length < 8) {
        return 'Por favor, informe no mínimo 8 caracteres.';
    }
    else if (value.length > 20) {
        return 'Por favor, informe no máximo 20 caracteres.';
    }
    //se o campo não contem um endereço de email válido
    else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)) {
        return 'Por favor, informe pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial.'
    }

    return true;
}

export default passwordValidation;