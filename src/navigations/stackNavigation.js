import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import LoginPage from '../pages/loginPage';
import { keepLogin } from '../actions';
import { useDispatch } from 'react-redux';
import RegisPage from '../pages/regisPage';
import DetailPage from '../pages/detailPage';
import TabNavigation from './tabNavigation'
import TransactionPage from '../pages/transaction';

const Stack = createStackNavigator()
const StackNavigation = (props) => {
    // fungsi keepLogin
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(keepLogin())
    }, [])

    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="TabNav" component={TabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisPage} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailPage} options={{ headerShown: false }} />
            <Stack.Screen name="Transaction" component={TransactionPage} />
        </Stack.Navigator>
    )
}

export default StackNavigation;