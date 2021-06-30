import React from 'react';
import { ScrollView } from 'react-native';
import Header from '../components/Header';
import FormCheckout from '../components/FormCheckout';

//tela de pagamento do App
export default function Checkout() {
    return (
        <ScrollView style={{
            backgroundColor: '#FFF'
        }}>
            <Header />
            <FormCheckout />
        </ScrollView>
    )
}