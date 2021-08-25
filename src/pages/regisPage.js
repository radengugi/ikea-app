import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { dataSignUp } from '../actions';
import { URL_API } from '../helper';

const RegisPage = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const dispatch = useDispatch()

    const { idUser } = useSelector(({ userReducer }) => {
        return {
            idUser: userReducer.id
        }
    })

    useEffect(() => {
        if (idUser) {
            props.navigation.dispatch(StackActions.replace('TabNav'))
            // props.navigation.dispatch(StackActions.replace('Login'))
        }
    })

    const btnSignUp = () => {
        if (username == '' || email == '' || password == '' || confPassword == '') {
            Alert.alert("Isi Semua Form !")
        } else {
            dispatch(dataSignUp(username, email, password))
            // props.navigation.dispatch(StackActions.replace('Login'))
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ikea_logo.svg/1024px-Ikea_logo.svg.png' }} style={{ width: wp('50%'), height: hp('10%') }} />
            <View style={{ width: wp(60), alignItems: 'center', margin: hp(5) }}>
                <Input placeholder="Input username"
                    leftIcon={
                        <Icon
                            name="user"
                            type="feather"
                            size={22}
                        />
                    } onChangeText={e => setUsername(e)} />
                <Input placeholder="Input email"
                    leftIcon={
                        <Icon
                            name="mail"
                            type="feather"
                            size={22}
                        />
                    } onChangeText={e => setEmail(e)} />
                <Input placeholder="Input password"
                    leftIcon={
                        <Icon
                            name="lock"
                            type="feather"
                            size={22}
                        />
                    } onChangeText={e => setPassword(e)} secureTextEntry />
                <Input placeholder="Confirm password"
                    leftIcon={
                        <Icon
                            name="lock"
                            type="feather"
                            size={22}
                        />
                    } onChangeText={e => setConfPassword(e)} secureTextEntry />
                <Button title="Sign Up"
                    onPress={btnSignUp}
                    containerStyle={{ width: wp(30) }} />
            </View>
        </View>
    )
}

export default RegisPage;