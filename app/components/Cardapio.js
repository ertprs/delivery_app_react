import React, { useState, useEffect } from 'react';
import { Card, Paragraph, Button } from 'react-native-paper';
import * as config from '../config/apiConfig';
import * as services from '../services/deliveryServices';
import { useNavigation } from '@react-navigation/native';
import { Alert, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { adicionarItem } from '../actions/deliveryActions';

export default function Cardapio() {

    const [cardapio, setCardapio] = useState([]); //Hook (state do componente)
    const navigation = useNavigation(); //Hook (navegação)
    const dispatch = useDispatch(); //Hook (react-redux)

    //função para consultar os itens do cardapio
    const consultarCardapio = () => {
        services.getCardapio() //chamada para a API
            .then(data => { setCardapio(data) }) //promisse de sucesso!
            .catch(e => { Alert.alert("Erro!") }) //promisse de erro!
    }

    //Hook para executar antes do componente ser renderizado
    //similar ao comportamento da função 'componentDidMount'
    useEffect(() => {
        consultarCardapio();
    }, []);

    return (
        <Card>
            <Card.Title
                title="Conheça nosso cardápio!"
                subtitle="Escolha os itens e monte o seu pedido."
            />
            <Card.Content>
                {
                    cardapio.map(
                        function(item, i){
                            return(
                                <Card key={i}>
                                    <Card.Title
                                        title={item.nome}
                                        subtitle={item.preco}
                                    />
                                    <Card.Content>
                                        <Paragraph>
                                            <Text>{item.categoria.nome}</Text>
                                        </Paragraph>
                                        <Paragraph>
                                            <Text>{item.descricao}</Text>
                                        </Paragraph>
                                    </Card.Content>
                                    <Card.Cover
                                        style={{ marginTop: 20 }}
                                        source={{ 
                                            uri : config.getApiDelivery() + item.foto
                                         }}
                                    />
                                    <Card.Actions>
                                        <Button
                                            mode="outlined"
                                            icon="cart-outline"
                                            onPress={ () => {

                                                //disparar uma ação para o REDUCER!
                                                dispatch(adicionarItem(item));

                                                //navegar para o carrinho de compras..
                                                navigation.navigate('shopping-cart');
                                            }}
                                        >
                                            Adicionar ao pedido
                                        </Button>
                                    </Card.Actions>
                                </Card>
                            )
                        }
                    )
                }
            </Card.Content>
        </Card>
    )
}