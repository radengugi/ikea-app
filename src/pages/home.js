import axios from 'axios';
import { Body, Card, CardItem } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView, FlatList, ImageBackground, Text, View, StyleSheet } from 'react-native';
import { Header, Icon, SearchBar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../helper';
import { getProducts } from '../actions'


const style = StyleSheet.create({
    SearchBar: {
        width: wp('60%'),
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        padding: 0,
        marginLeft: wp('-5%')
    },
    inputSearch: {
        height: hp('5%'),
        backgroundColor: 'white'
    }
})
const HomePage = ({ navigation }) => {
    const dispatch = useDispatch()
    const [banner, setBanner] = useState([])
    // const [products, setProducts] = useState([])

    useEffect(() => {
        getBanner()
        dispatch(getProducts())
    }, [])

    const { products } = useSelector(({ productReducer }) => {
        return {
            products: productReducer.listProduct
        }
    })

    const getBanner = () => {
        axios.get(URL_API + `/banner`)
            .then(res => {
                // console.log("Get Banner :", res.data)
                setBanner(res.data)
            })
            .catch(err => {
                console.log("Error Get Users :", err)
            })
    }

    // const getProduct = () => {
    //     axios.get(URL_API + `/products`)
    //         .then(res => {
    //             // console.log("Get Products :", res.data)
    //             setProducts(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                placement="left"
                centerComponent={
                    <SearchBar placeholder="Search Product"
                        containerStyle={style.SearchBar}
                        inputContainerStyle={style.inputSearch}
                    />
                }
                rightComponent={
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <Icon name="heart" type="feather" size={24}
                            iconStyle={{ color: 'white' }} style={{ marginHorizontal: wp('2%') }} />
                        <Icon name="message-circle" type="feather" size={24}
                            iconStyle={{ color: 'white' }} style={{ marginHorizontal: wp('2%') }} />
                        <Icon name="bell" type="feather" size={24}
                            iconStyle={{ color: 'white' }} style={{ marginHorizontal: wp('2%') }} />
                    </View>
                }
            />
            <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
                <View>
                    <FlatList
                        data={banner}
                        renderItem={({ item }) => (
                            <ImageBackground source={{ uri: item }} style={{ width: wp(90), height: hp(30) }} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                    </FlatList>
                </View>
                <View>
                    <FlatList
                        data={products}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Detail', item)} >
                                <Card style={{ width: wp(50), justifyContent: 'space-around' }}>
                                    <CardItem>
                                        <Body>
                                            <Text style={{ fontWeight: 'bold' }}>{item.nameProduct}</Text>
                                            <Image source={{ uri: item.image[0] }} style={{ flex: 1, width: wp(40), height: hp(30) }} />
                                            <Text style={{ fontWeight: 'bold' }}>IDR {item.price}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Icon name="more-horizontal" type="feather" size={22} />
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        vertical
                        showsHorizontalScrollIndicator={false}
                    >
                    </FlatList>
                </View>
            </ScrollView>
        </View >
    )
}

export default HomePage;