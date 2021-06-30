import React from 'react';
import { Card, TextInput, Button } from 'react-native-paper';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as services from '../services/clienteServices';
import { useForm, Controller } from 'react-hook-form';
import emailValidation from '../custom-validations/emailValidation';
import passwordValidation from '../custom-validations/passwordValidation';
import { useDispatch } from 'react-redux';
import { autenticarCliente } from '../actions/loginActions';

export default function FormLogin() {

    const navigation = useNavigation(); //HOOK (NAVIGATION NATIVE)

    const dispatch = useDispatch(); //HOOK (REACT-REDUX)

    //objetos para manipular o formulário
    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm(); //HOOK!

    //função para capturar o evento SUBMIT do formulário
    const onSubmit = data => {
        services.postLogin(data)
            .then(
                (data) => {
                    Alert.alert(
                        `Seja bem vindo(a), ${data.cliente.nome}`,
                        data.message);

                    //limpar os campos
                    reset({
                        email: '',
                        senha: ''
                    });

                    //executando a ACTION
                    dispatch(autenticarCliente(data));

                    //navegando para a página de finalizar pedido
                    navigation.navigate('checkout');

                    //TODO
                    //Armazenar os dados e o TOKEN do cliente
                }
            )
            .catch(
                (err) => {

                    var e = err.response;

                    switch (e.status) {
                        case 500:
                            Alert.alert(
                                'Não foi possivel autenticar o cliente.',
                                e.data.message);
                            break;
                    }
                }
            )
    }

    return (
        <Card>
            <Card.Title
                title="Iniciar Sessão"
                subtitle="Acesse sua conta de cliente."
            />
            <Card.Content>
                <View style={{ marginBottom: 20 }}>

                    <Controller
                        control={control}
                        rules={{
                            validate: emailValidation
                        }}
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label="Email de Acesso:"
                                    keyboardType="email-address"
                                    autoCompleteType="email"
                                    mode="outlined"
                                    placeholder="Digite aqui"
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            )
                        }
                        name="email"
                        defaultValue=""
                    />
                    {
                        errors.email && <Text style={{
                            fontSize: 15,
                            color: '#bb2124'
                        }}>
                            {errors.email.message}
                        </Text>
                    }
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Controller
                        control={control}
                        rules={{
                            validate: passwordValidation
                        }}
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label="Senha de Acesso:"
                                    keyboardType="default"
                                    secureTextEntry={true}
                                    mode="outlined"
                                    placeholder="Digite aqui"
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            )
                        }
                        name="senha"
                        defaultValue=""
                    />
                    {
                        errors.senha && <Text style={{
                            fontSize: 15,
                            color: '#bb2124'
                        }}>
                            {errors.senha.message}
                        </Text>
                    }
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Button mode="contained" icon="check-circle"
                        onPress={
                            handleSubmit(onSubmit)
                        }>
                        Acessar Conta
                    </Button>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Button mode="outlined" icon="account-circle"
                        onPress={
                            () => navigation.navigate('register')
                        }>
                        Criar Conta de Cliente
                    </Button>
                </View>
            </Card.Content>
        </Card>
    )
}