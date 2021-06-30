import React from 'react';
import { ScrollView } from 'react-native';
import Header from '../components/Header';
import FormRegister from '../components/FormRegister';

//tela de cadastro de clientes
export default function Register() {
    return (
        <ScrollView style={{
            backgroundColor: '#FFF'
        }}>
            <Header />
            <FormRegister />
        </ScrollView>
    )
}