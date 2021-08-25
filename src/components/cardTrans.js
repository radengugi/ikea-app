import axios from 'axios';
import React, { useState } from 'react';
import { Body, Card, CardItem, Left, Right, Thumbnail } from 'native-base';
import { Button, Text, Badge, Overlay } from 'react-native-elements';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { URL_API } from '../helper'
import { useDispatch } from 'react-redux';
import { View } from 'react-native';

const CardTransaction = ({ data }) => {

    const [visible, setVisibe] = useState(false)
    const dispatch = useDispatch()

    const getUserTransaction = () => {
        axios.get(URL_API + `/userTransactions`)
            .then(res => {
                dispatch(userTransactions(res.data))
            }).catch(err => {
                console.log(err)
            })
    }

    const btnPaid = () => {
        if (data.status == "unpaid") {
            axios.patch(URL_API + `/userTransaction/${data.id}`, {
                status: "paid"
            })
                .then(res => {
                    console.log("Cek status :", res.data)
                    getUserTransaction()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const printCard = () => {
        return data.keranjang.map((item, index) => {
            return (
                <Card style={{ display: 'flex', flexDirection: 'column', width: wp(90) }}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{ uri: item.image }} />
                            <Body>
                                <Text style={{ fontSize: 18 }}>{item.nameProduct}</Text>
                            </Body>
                        </Left>
                        <Right>
                            <Text style={{ fontSize: 18 }}>{item.qty}</Text>
                        </Right>
                    </CardItem>
                </Card>
            )
        })
    }

    return (
        <View>
            <Card>
                <CardItem>
                    <Left>
                        <Text>{data.date}</Text>
                        <Text style={{ fontWeight: 'bold', marginLeft: wp(2) }} >{data.status}</Text>
                        <Badge
                            containerStyle={{ marginLeft: wp(2) }} status="warning"
                            value={<Text style={{ fontWeight: 'bold' }} >IDR {data.totalPembayaran}
                            </Text>} />
                    </Left>
                    <Right>
                        {
                            data.status === "unpaid" ?
                                <Button onPress={btnPaid} title="paid" />
                                :
                                <>
                                    <Button onPress={() => setVisibe(visible)} title="Detail" />
                                </>
                        }
                    </Right>
                </CardItem>
            </Card>
            <Overlay isVisible={visible} onBackdropPress={() => setVisibe(!visible)}>
                {printCard()}
            </Overlay>
        </View>
    )
}

export default CardTransaction