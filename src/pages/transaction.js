import axios from 'axios';
import { Body, Card, CardItem, Left, Right, Thumbnail } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../helper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { State } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardTransaction from '../components/cardTrans';

const TransactionPage = (props) => {
    const [transaction, setTransaction] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        getTransaction()
    }, [])

    const getTransaction = async () => {
        try {
            let id = await AsyncStorage.getItem('id_tkn')
            let get = await axios.get(URL_API + `/userTransaction?idUser=${id}`)
            setTransaction(get.data)
        } catch (error) {
            console.log(error)
        }
    }
    console.log("data transaksi:", transaction)

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                data={transaction}
                renderItem={({ item, index }) => (
                    <CardTransaction data={item} />
                )}
            />
        </View>
    )
}

export default TransactionPage;
