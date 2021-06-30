import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function Header() {

    const navigation = useNavigation(); //Hook!

    return (
        <Appbar.Header>
            <Appbar.Content
                title="Steakhouse"
                subtitle="Faça o seu pedido!"
            />
            <Appbar.Action
                icon="home-outline"
                onPress={() => navigation.navigate('products')}
            />
            <Appbar.Action
                icon="account-circle-outline"
                onPress={() => navigation.navigate('login')}
            />
            <Appbar.Action
                icon="cart-outline"
                onPress={() => navigation.navigate('shopping-cart')}
            />
        </Appbar.Header>
    )
}