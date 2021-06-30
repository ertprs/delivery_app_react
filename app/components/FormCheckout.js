import React, { useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../helpers/formatCurrency';
import * as cepServices from '../services/cepServices';
import * as deliveryServices from '../services/deliveryServices';
import { useForm, Controller } from 'react-hook-form';
import textValidation from '../custom-validations/textValidation';

export default function FormCheckout() {

    const [cliente, setCliente] = useState({}); //HOOK!
    const [cestaDeCompras, setCestaDeCompras] = useState([]); //HOOK!
    const [valorTotal, setValorTotal] = useState(0); //HOOK!
    const [quantidadeItens, setQuantidadeItens] = useState(0); //HOOK!
    const [accessToken, setAccessToken] = useState('');
    const [cep, setCep] = useState(''); //HOOK!
    const [possuiEndereco, setPossuiEndereco] = useState(false); //HOOK!

    //declarando os dados para construção do formulário
    const {
        control, //captura dos campos do formulário
        handleSubmit, //evento de SUBMIT do formulário
        formState: { //captura os erros de validação
            errors
        },
        reset //manipular os valores dos campos
    } = useForm(); //REACT HOOK FORM

    const dadosLogin = useSelector( //HOOK REACT-REDUX
        state => state.login //login -> nome do reducer!
    );

    const dadosDelivery = useSelector( //HOOK REACT-REDUX
        state => state.delivery //delivery -> nome do reducer!
    )

    //evento executado quando o componente é carregado
    useEffect(() => {

        //dados do cliente
        setCliente(dadosLogin.cliente);
        setAccessToken(dadosLogin.accessToken);

        //dados do delivery
        setCestaDeCompras(dadosDelivery.cestaDeCompras);
        setValorTotal(dadosDelivery.valorTotal);
        setQuantidadeItens(dadosDelivery.quantidadeItens);        
    }, []);

    //função para buscar o endereço do cliente atraves do CEP
    const obterEndereco = () => {
        cepServices.getEndereco(cep)
            .then(
                data => {
                    if (!data.erro) {
                        reset({
                            logradouro: data.logradouro,
                            bairro: data.bairro,
                            cidade: data.localidade,
                            estado: data.uf
                        });

                        setPossuiEndereco(true);
                    }
                    else {
                        Alert.alert('Endereço não encontrado', 'Por favor, verifique o CEP informado.');
                        setPossuiEndereco(false);
                    }
                }
            )
            .catch(
                e => {
                    Alert.alert('Cep inválido', 'Por favor, verifique o CEP informado.');
                    setPossuiEndereco(false);
                }
            )
    }

    //função para cadastrar o pedido
    const finalizarPedido = data => {
      
        deliveryServices.postPedido({
            logradouro : data.logradouro,
            numero : data.numero,
            complemento : data.complemento,
            bairro : data.bairro,
            cidade : data.cidade,
            estado : data.estado,
            cep : cep
        }, accessToken)
        .then(
            data => {
                Alert.alert('Sucesso!', 'Pedido realizado com sucesso.');
            }
        )
        .catch(
            e => {
                Alert.alert('Erro');
            }
        )
    }

    return (
        <Card>
            <Card.Title
                title="Finalizar Pedido"
                subtitle="Preencha os campos para finalizar o seu pedido."
            />
            <Card.Content>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    Dados do Cliente:
                </Text>
                <Text>{cliente.nome}</Text>
                <Text>Email: {cliente.email}</Text>
                <Text>Telefone: {cliente.telefone}</Text>

                <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>
                    Itens selecionados:
                </Text>

                {
                    cestaDeCompras.map(
                        function (item, i) {
                            return (
                                <View key={i} style={{ marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {item.nome}
                                    </Text>
                                    <Text>Preço: {item.preco}</Text>
                                    <Text>Quantidade: {item.quantidade}</Text>
                                </View>
                            )
                        }
                    )
                }

                <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10 }}>
                    Total do Pedido: {formatCurrency(valorTotal)}
                </Text>
                <Text>
                    Quantidade de itens: {quantidadeItens}
                </Text>

                <TextInput
                    label="Informe o CEP de entrega"
                    keyboardType="numeric"
                    mode="outlined"
                    placeholder="Digite aqui"
                    style={{ marginTop: 20 }}
                    onChangeText={(value) => setCep(value)}
                    value={cep}
                />

                <Button mode="outlined" icon="check-circle"
                    style={{
                        marginTop: 20
                    }}
                    onPress={
                        () => obterEndereco()
                    }>
                    Obter Endereço
                </Button>

                {
                    possuiEndereco && <View>

                        <Controller
                            control={control}
                            rules={{
                                validate: textValidation
                            }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ marginTop: 20 }}
                                        label="Logradouro:"
                                        keyboardType="default"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )
                            }
                            name="logradouro"
                            defaultValue=""
                        />
                        {
                            errors.logradouro && <Text style={{
                                color: '#bb2124'
                            }}>
                                {errors.logradouro.message}
                            </Text>
                        }

                        <Controller
                            control={control}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ marginTop: 20 }}
                                        label="Número:"
                                        keyboardType="default"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )
                            }
                            name="numero"
                            defaultValue=""
                        />
                        {
                            errors.numero && <Text style={{
                                color: '#bb2124'
                            }}>
                                {errors.numero.message}
                            </Text>
                        }

                        <Controller
                            control={control}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ marginTop: 20 }}
                                        label="Complemento:"
                                        keyboardType="default"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )
                            }
                            name="complemento"
                            defaultValue=""
                        />
                        {
                            errors.complemento && <Text style={{
                                color: '#bb2124'
                            }}>
                                {errors.complemento.message}
                            </Text>
                        }

                        <Controller
                            control={control}
                            rules={{
                                validate: textValidation
                            }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ marginTop: 20 }}
                                        label="Bairro:"
                                        keyboardType="default"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )
                            }
                            name="bairro"
                            defaultValue=""
                        />
                        {
                            errors.bairro && <Text style={{
                                color: '#bb2124'
                            }}>
                                {errors.bairro.message}
                            </Text>
                        }

                        <Controller
                            control={control}
                            rules={{
                                validate: textValidation
                            }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ marginTop: 20 }}
                                        label="Cidade:"
                                        keyboardType="default"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )
                            }
                            name="cidade"
                            defaultValue=""
                        />
                        {
                            errors.cidade && <Text style={{
                                color: '#bb2124'
                            }}>
                                {errors.cidade.message}
                            </Text>
                        }

                        <Controller
                            control={control}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ marginTop: 20 }}
                                        label="Estado:"
                                        keyboardType="default"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )
                            }
                            name="estado"
                            defaultValue=""
                        />
                        {
                            errors.estado && <Text style={{
                                color: '#bb2124'
                            }}>
                                {errors.estado.message}
                            </Text>
                        }

                        <Button mode="contained" icon="check-circle"
                            style={{
                                marginTop: 20,
                                marginBottom: 60
                            }}
                            onPress={
                                handleSubmit(finalizarPedido)
                            }>
                            Finalizar Pedido
                        </Button>

                    </View>
                }

            </Card.Content>
        </Card>
    )
}