import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, Icon, Image, ListItem, Overlay, Text } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ImagePicker from 'react-native-image-crop-picker'
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SignOut } from '../actions/userAction';

const ProfilePage = (props) => {
    const [gambar, setGambar] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAaAidKSZaTJqrMpU7QHJvy92LglptkGVDhw&usqp=CAU")

    const [state, setState] = useState({
        account: [
            {
                title: 'Transactions',
                icon: 'shopping-cart',
                press: () => props.navigation.navigate("Transaction")
            }
            , {
                title: 'Change Profile',
                icon: 'user',
                press: () => { }
            }
            , {
                title: 'My Promo',
                icon: 'credit-card',
                press: () => { }
            }
        ],
        about: [
            {
                title: 'Settings',
                icon: 'cog',
                press: () => { }
            }
            , {
                title: 'Privacy and Police',
                icon: 'shield',
                press: () => { }
            }
            , {
                title: 'Logout',
                icon: 'sign-out',
                press: () => dispatch(SignOut())
            }
        ]
    })

    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()

    const { iduser, username } = useSelector(({ userReducer }) => {
        return {
            iduser: userReducer.id,
            username: userReducer.username
        }
    })

    useEffect(() => {
        console.log("data dari reducer :", iduser)
        if (!iduser) {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        }
    })

    const btnCamera = () => {
        ImagePicker.openCamera({
            width: wp(40),
            height: wp(40),
            cropping: true,
            mediaType: 'photo'
        }).then(image => {
            console.log("Image from camera :", image)
            setGambar(image.path)
            setVisible(!visible)
        }).catch(err => {
            console.log(err)
        })
    }

    const btnGallery = () => {
        ImagePicker.openPicker({
            width: wp(40),
            height: wp(40),
            cropping: true,
            mediaType: 'photo'
        }).then(image => {
            console.log("Image from camera :", image)
            setGambar(image.path)
            setVisible(!visible)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <View>
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                <ListItem bottomDivider containerStyle={{ width: wp(60) }} onPress={btnGallery}>
                    <Icon name="folder" type="feather" />
                    <ListItem.Content>
                        <ListItem.Title>Select From Gallery</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                <ListItem bottomDivider onPress={btnCamera}>
                    <Icon name="camera" type="feather" />
                    <ListItem.Content>
                        <ListItem.Title>Open Camera</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </Overlay>
            <Image
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT820nkeksIiKyQfh0BjArPyRR2UeLSNvd8yg&usqp=CAU" }}
                style={{ width: wp(100), height: hp(30), alignItems: 'center', justifyContent: 'center' }}
            >
                <Avatar source={{ uri: gambar }}
                    size="xlarge"
                    rounded
                    title="CR"
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                >
                    <Avatar.Accessory
                        name="edit"
                        type="feather"
                        size={40}
                        iconStyle={{ fontSize: 25 }}
                        onPress={() => setVisible(!visible)}
                    />
                </Avatar>
            </Image>
            <Card>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Card containerStyle={{ padding: 0, marginHorizontal: 0, borderWidth: 0 }}>
                        <Text style={{ fontSize: 20, paddingStart: 22, fontWeight: 'bold', color: "#f3a683" }}>Account</Text>
                        {
                            state.account.map((item, i) => (
                                <ListItem
                                    key={i}
                                    bottomDivider
                                    onPress={item.press}
                                >
                                    <Icon name={item.icon} size={25} type='font-awesome' color="#1d9c73" />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            ))
                        }
                    </Card>
                    <Card containerStyle={{ padding: 0, marginHorizontal: 0, borderWidth: 0 }}>
                        <Text style={{ fontSize: 20, paddingStart: 22, paddingTop: 10, fontWeight: 'bold', color: "#f3a683" }}>About</Text>
                        {
                            state.about.map((item, i) => (
                                <ListItem
                                    key={i}
                                    bottomDivider
                                    onPress={item.press}
                                >
                                    <Icon name={item.icon} size={25} type='font-awesome' color="#1d9c73" />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            ))
                        }
                    </Card>
                </ScrollView>
            </Card>
        </View>
    )
}

export default ProfilePage;