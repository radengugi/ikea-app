import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, Image } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux'
import { dataLogin, getUsers } from '../actions'
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native'

const LoginPage = (props) => {
    // digunakan untuk menjalankan fungsi dari actions,pengganti connect pada class component
    const dispatch = useDispatch()

    // useState : menyimpan data pada state
    const [splash, setSplash] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // useEffect : pengganti fungsi componentDidMount
    useEffect(() => {
        // menjalankan fungsi
        dispatch(getUsers())
        setTimeout(() => setSplash(true), 3000)
        // AsyncStorage.removeItem("id_tkn")
    }, [])

    // useSelector : pengganti mapStateToProps pada class component
    const { idUser } = useSelector(({ userReducer }) => {
        return {
            idUser: userReducer.id
        }
    })

    // useEffect : pengganti componentDidUpdate (tanpa [])
    useEffect(() => {
        console.log("Data dari Reducer :", idUser)
        if (idUser) {
            // page login yg awalnya menjadi page utama, digantikan oleh page home
            props.navigation.dispatch(StackActions.replace("TabNav"))
        }
    })

    const btnSignIn = () => {
        if (username == '' || password == '') {
            Alert.alert("Isi Semua Form")
        } else {
            dispatch(dataLogin(username, password))
        }
    }

    if (splash) {
        return (
            <>
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ikea_logo.svg/1024px-Ikea_logo.svg.png' }} style={{ width: wp('50%'), height: hp('10%') }} />
                    {/* <Text>Sign In with Your Account</Text> */}
                    <View style={{ width: wp(75), alignItems: 'center', margin: hp(5) }}>
                        <Input placeholder="Username"
                            leftIcon={
                                <Icon name="user" type="feather" size={22} />
                            } onChangeText={e => setUsername(e)} />
                        <Input placeholder="Password"
                            leftIcon={
                                <Icon name="lock" type="feather" size={22} />
                            } onChangeText={e => setPassword(e)} secureTextEntry />
                        <Button title="Sign In"
                            onPress={btnSignIn}
                            // onPress={() => props.navigation.navigate('Home')}
                            containerStyle={{ width: wp(30) }} />
                    </View>
                </View >
                <Text style={{ backgroundColor: 'white', textAlign: 'center', padding: hp(1) }}>Belum Punya Akun ?<Text style={{ color: 'skyblue', fontWeight: 'bold' }} onPress={() => props.navigation.navigate('Register')}> Register Now</Text></Text>
            </>
        )
    }
    // splashscreen
    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ikea_logo.svg/1024px-Ikea_logo.svg.png" }} style={{ width: wp('50%'), height: hp('10%') }} />
        </View>
    )
}

export default LoginPage;