import React, { useState } from 'react';
import axios from 'axios';
import { Icon, Image, Input, Overlay } from 'react-native-elements';
import { Text, View } from 'react-native';
import { Form, Item, Picker } from 'native-base';
import { Card, CardItem, Thumbnail, Body, Left, Badge, Button, } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../helper';
import { updateCart } from '../actions/userAction'

const DetailPage = ({ route }) => {
    const { nameProduct, type, image, price, description, brand, category, stock } = route.params
    const [selected, setSelected] = useState(`${stock[0].type},${stock[0].qty}`)
    const [reqQty, setReqQty] = useState('')

    // Ambil data dari select
    const onValueChange = (value) => {
        setSelected(value)
    }

    const [visible, setVisible] = useState(false);
    // Buka / Tutup modal atau overlay
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const { cart, idUser } = useSelector(({ userReducer }) => {
        return {
            cart: userReducer.cart,
            idUser: userReducer.id
        }
    })

    const dispatch = useDispatch()

    // fungsi Add To Cart
    const btnAddToCart = () => {
        if (parseInt(reqQty) > parseInt(selected.split(",")[1])) {
            Alert.alert("Out of Stock !")
        } else {
            cart.push({
                nameProduct: nameProduct,
                type: selected.split(",")[0],
                image: image[0],
                price: price,
                qty: parseInt(reqQty),
                totalHarga: parseInt(price * reqQty)
            })
            // console.log("Cek Cart : ", cart)
            // console.log("Cek Id : ", idUser)
            axios.patch(URL_API + `/users/${idUser}`, { cart })
                .then(res => {
                    console.log("Success Add Cart :", res.data)
                    Alert.alert("Success Add to Cart")
                    dispatch(updateCart(res.data.cart))
                    setVisible(!visible)
                })
                .catch(err => {
                    console.log("Error Cart :", err)
                })
        }
    }

    return (
        <View style={{ width: wp(100), marginHorizontal: 1, flex: 1, flexDirection: 'row' }}>
            <Card style={{ width: wp(100) }}>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: 'https://download.logo.wine/logo/IKEA/IKEA-Logo.wine.png' }} />
                        <Body>
                            <Text style={{ fontSize: 20 }}>{brand}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Image source={{ uri: image[0] }} style={{ width: wp(80), height: hp(35) }} />
                </CardItem>
                <CardItem>
                    <Body>
                        <Badge info>
                            <Text note style={{ fontSize: 12 }}>{category}</Text>
                        </Badge>
                        <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black' }}>
                            {nameProduct}
                        </Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'gray' }}>
                            {description}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ width: wp(50), fontSize: 15, fontWeight: 'bold', color: 'gray' }}>
                                Type
                            </Text>
                            <Form>
                                <Item picker>
                                    <Picker
                                        mode="dialog"
                                        // iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: wp(45), height: hp(5) }}
                                        placeholder="Choose Type"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={selected}
                                        onValueChange={onValueChange}
                                    >
                                        {stock.map((item, index) => {
                                            return <Picker.Item label={`${item.type} Stock:${item.qty}`} value={`${item.type},${item.qty}`} />
                                        })}
                                    </Picker>
                                </Item>
                            </Form>
                        </View>
                    </Body>
                </CardItem>
                <CardItem style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', marginTop: -15 }}>
                        IDR {price}
                    </Text>
                </CardItem>
                <CardItem style={{ alignItems: 'center' }}>
                    <Button transparent rounded success onPress={toggleOverlay} style={{ width: wp(100), flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="shopping-cart" type="feather" size={22} />
                        <Text>  Add To Cart</Text>
                    </Button>
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                        <Input placeholder="Masukkan Jumlah Barang" containerStyle={{ width: wp(75) }}
                            onChangeText={e => setReqQty(e)} />
                        <Button transparent rounded success style={{
                            width: wp(40), flex: 1,
                            alignItems: 'center', justifyContent: 'center'
                        }} onPress={btnAddToCart}>
                            {/* <Icon name="shopping-cart" type="feather" size={22} /> */}
                            <Text>  Push To Cart</Text>
                        </Button>
                    </Overlay>
                </CardItem>
            </Card>
        </View>
    );
};

export default DetailPage;