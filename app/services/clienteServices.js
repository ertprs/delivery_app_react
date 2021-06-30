import axios from 'axios';
import * as config from '../config/apiConfig';

//função para executar o serviço de cadastro de cliente na API..
export const postCliente = (cliente) => {
    return axios.post(config.getApiDelivery() + "/api/cliente", cliente)
        .then(
            response => {
                return response.data;
            }
        )
}

//função para executar o serviço de autenticação de cliente na API..
export const postLogin = (login) => {
    return axios.post(config.getApiDelivery() + "/api/login", login)
        .then(
            response => {
                return response.data;
            }
        )
}