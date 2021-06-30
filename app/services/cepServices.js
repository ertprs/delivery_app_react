import axios from 'axios';
import * as config from '../config/apiConfig';

//função para executar a consulta do endereço por cep
export const getEndereco = (cep) => {
    return axios.get(config.getApiViaCep() + "/" + cep + "/json")
        .then(
            response => {
                return response.data;
            }
        )
}