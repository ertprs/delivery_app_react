import React from 'react';
import { ScrollView } from 'react-native';
import Header from '../components/Header';
import ShoppingCartItems from '../components/ShoppingCartItems';

//tela de carrinho de compras
export default function ShoppingCart() {
    return (
        <ScrollView style={{
            backgroundColor: '#FFF'
        }}>
            <Header />
            <ShoppingCartItems />
        </ScrollView>
    )
}