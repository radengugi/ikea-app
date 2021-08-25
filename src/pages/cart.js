import axios from 'axios';
import React from 'react';
import { Button, View, FlatList, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import CardCart from '../components/cardCart';
import { createLocalNotification, notifConfiguration, URL_API } from '../helper';
import { updateCart } from '../actions'

const CartPage = (props) => {

    const dispatch = useDispatch()

    const { cart, username, idUser } = useSelector(({ userReducer }) => {
        return {
            cart: userReducer.cart,
            username: userReducer.username,
            idUser: userReducer.id
        }
    })

    const totalPayment = () => {
        let total = 0
        if (cart.length > 0) {
            cart.forEach(item => {
                total += item.totalHarga
            })
        }
        return total
    }

    const btnCheckout = () => {
        // userTransaction = {idUser, username, date, status,totalPayment, detail barang yg dibeli}
        let nameUser = username
        let totalPembayaran = totalPayment()
        let keranjang = cart
        let status = "unpaid"
        let time = new Date()
        let date = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear()

        axios.post(URL_API + `/userTransaction`, { idUser, nameUser, totalPembayaran, keranjang, status, date })
            .then(res => {
                axios.patch(URL_API + `/users/${idUser}`, { cart: [] })
                    .then(resPatch => {
                        dispatch(updateCart(resPatch.data.cart))
                        notifConfiguration(() => props.navigation.navigate("Transaction"))
                        createLocalNotification("A1", "Checkout", "Pesanan sedang diproses, silahkan lakukan pembayaran")
                        props.navigation.navigate('Transaction')
                        // Alert.alert("Input Success")
                    })
                    .catch(errPatch => {
                        console.log(errPatch)
                    })
            })
            .catch(err => {
                console.log("Transaction Failed :", err)
            })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: hp(3.5) }}>
            {
                cart.length > 0 &&
                <FlatList
                    data={cart}
                    renderItem={({ item, index }) => (
                        <CardCart idx={index} data={item} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ marginTop: wp(2) }}
                />
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text>Total Payment</Text>
                    <Text h4>IDR {totalPayment()}</Text>
                </View>
                <Button
                    title="Checkout"
                    containerStyle={{ width: wp(40) }}
                    buttonStyle={{ backgroundColor: '#FBD914' }}
                    titleStyle={{ color: '#0058AB' }}
                    onPress={() => btnCheckout(idUser)}
                />
            </View>
        </View>
    )
}

export default CartPage;