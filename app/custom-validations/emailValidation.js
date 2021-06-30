const emailValidation = (value) => {

    //se o campo não foi preenchido
    if (value.length == 0) {
        return 'Por favor, informe o email.'
    }
    //se o campo não contem um endereço de email válido
    else if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(value)) {
        return 'Por favor, informe um endereço de email válido.'
    }

    return true;
}

export default emailValidation;