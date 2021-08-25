import React, { useEffect } from 'react';
import { Body, Card, CardItem, Left, Right, Thumbnail } from 'native-base';
import { Button, Icon, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { URL_API } from '../helper';
import { updateCart } from '../actions'

const CardCart = ({ data, idx }) => {

    const dispatch = useDispatch()

    const { cart, idUser } = useSelector(({ userReducer }) => {
        return {
            cart: userReducer.cart,
            idUser: userReducer.id
        }
    })

    const btnQty = (type) => {
        if (type == "Inc") {
            cart[idx].qty += 1
        } else if (type == "Dec") {
            cart[idx].qty -= 1
        }

        cart[idx].totalHarga = cart[idx].qty * cart[idx].price

        axios.patch(URL_API + `/users/${idUser}`, { cart })
            .then(res => {
                console.log("Cek data", res.data)
                dispatch(updateCart(res.data.cart))
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Card>
            <CardItem>
                <Left>
                    <Thumbnail source={{ uri: data.image }} />
                    <Body>
                        <Text>{data.nameProduct}</Text>
                        <Text>IDR {data.totalHarga}</Text>
                    </Body>
                </Left>
                <Right style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <Button type="outline" onPress={() => btnQty("Dec")} icon={
                        <Icon type="feather" name="minus" size={15} />
                    } />
                    <Text h4 style={{ marginHorizontal: 12 }}>{data.qty}</Text>
                    <Button type="outline" onPress={() => btnQty("Inc")} icon={
                        <Icon type="feather" name="plus" size={15} />
                    } />
                </Right>
            </CardItem>
        </Card>

    )
}

export default CardCart;