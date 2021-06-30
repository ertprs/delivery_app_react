import * as actions from '../actions/loginActions';

//declarando os dados que serão
//armazenados na STORE..
const initialState = {
    accessToken: '',
    dataExpiracao: '',
    cliente: {
        nome: '',
        email: '',
        telefone: ''
    }
}

//criando o REDUCER:
const loginReducer = (
    state = initialState,
    action
) => {

    switch (action.type) {

        case actions.AUTENTICAR_CLIENTE:            
            return {
                ...state,
                accessToken : action.data.accessToken,
                dataExpiracao : action.data.dataExpiracao,
                cliente : {
                    nome : action.data.cliente.nome,
                    email : action.data.cliente.email,
                    telefone : action.data.cliente.telefone
                }
            }

        default:
            return state;
    }

}

export default loginReducer;