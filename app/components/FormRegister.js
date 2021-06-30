import React from 'react';
import { Card, TextInput, Button } from 'react-native-paper';
import { Alert, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as services from '../services/clienteServices';
import textValidation from '../custom-validations/textValidation';
import emailValidation from '../custom-validations/emailValidation';
import phoneNumberValidation from '../custom-validations/phoneNumberValidation';
import passwordValidation from '../custom-validations/passwordValidation';

export default function FormRegister() {

    //objeto para fazer navegação entre telas no aplicativo
    const navigation = useNavigation(); //HOOK!

    //objetos para manipular o formulário
    const {
        control, //capturar os dados de cada campo do formulário
        handleSubmit, //criar o evento 'SUBMIT' fo formulário
        formState: { //gerar os erros de validação dos campos
            errors
        },
        reset //utilizado para setar valores nos campos
    } = useForm(); //HOOK!

    //função para capturar os campos preenchidos
    //data -> objeto contendo os campos do formulário
    const onSubmit = data => {

        //fazendo o cadastro do cliente na API..
        services.postCliente(data)
            .then( //promisse de sucesso..
                (data) => {
                    Alert.alert('Sucesso!', data.message);
                    //limpar os campos do formulário..
                    reset({
                        nome: '',
                        email: '',
                        telefone: '',
                        senha: '',
                        senhaConfirmacao: ''
                    });
                }
            )
            .catch( //promisse de erro..
                (err) => {

                    var e = err.response;

                    switch (e.status) {

                        case 400:
                            Alert.alert(
                                'Não foi possivel realizar o cadastro.',
                                'Ocorreram erros no preenchimento do formulário');
                            break;

                        case 500:
                            Alert.alert(
                                'Não foi possivel realizar o cadastro.',
                                e.data.message);
                            break;
                    }
                }
            )
    }

    return (
        <Card>
            <Card.Title
                title="Criar Conta de Cliente"
                subtitle="Preencha os campos para criar sua conta."
            />
            <Card.Content>
                <View style={{ marginBottom: 20 }}>
                    <Controller
                        control={control}
                        rules={{
                            validate: textValidation
                        }}
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label="Nome do Cliente:"
                                    keyboardType="default"
                                    autoCompleteType="name"
                                    mode="outlined"
                                    placeholder="Digite aqui"
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            )
                        }
                        name="nome"
                        defaultValue=""
                    />
                    {
                        errors.nome && <Text style={{
                            fontSize: 15,
                            color: '#bb2124'
                        }}>
                            {errors.nome.message}
                        </Text>
                    }
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Controller
                        control={control}
                        rules={{
                            validate: emailValidation
                        }}
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label="Email do Cliente:"
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
                            validate: phoneNumberValidation
                        }}
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label="Telefone do Cliente:"
                                    keyboardType="phone-pad"
                                    autoCompleteType="tel"
                                    mode="outlined"
                                    placeholder="Digite aqui"
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                            )
                        }
                        name="telefone"
                        defaultValue=""
                    />
                    {
                        errors.telefone && <Text style={{
                            fontSize: 15,
                            color: '#bb2124'
                        }}>
                            {errors.telefone.message}
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
                    <Controller
                        control={control}
                        rules={{
                            validate: passwordValidation
                        }}
                        render={
                            ({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label="Confirme a Senha:"
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
                        name="senhaConfirmacao"
                        defaultValue=""
                    />
                    {
                        errors.senhaConfirmacao && <Text style={{
                            fontSize: 15,
                            color: '#bb2124'
                        }}>
                            {errors.senhaConfirmacao.message}
                        </Text>
                    }
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Button mode="contained" icon="check-circle"
                        onPress={
                            handleSubmit(onSubmit)
                        }>
                        Confirmar Cadastro
                    </Button>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Button mode="outlined" icon="account-circle"
                        onPress={
                            () => navigation.navigate('login')
                        }>
                        Acessar Conta
                    </Button>
                </View>
            </Card.Content>
        </Card>
    )
}