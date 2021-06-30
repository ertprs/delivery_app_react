import axios from 'axios';
import * as config from '../config/apiConfig';

//consulta de cardápio
export const getCardapio = () => {
    return axios.get(config.getApiDelivery() + "/api/cardapio")
        .then(
            response => {
                return response.data;
            }
        )
}

//finalizar o pedido
export const postPedido = (pedido, token) => {
    return axios.post(config.getApiDelivery() + "/api/pedido", pedido, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(
            response => {
                return response.data;
            }
        )
}