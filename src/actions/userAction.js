import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { URL_API } from "../helper"

export const getUsers = () => {
    return (dispatch) => {
        axios.get(URL_API + `/users`)
            .then(res => {
                console.log("Get Users :", res.data)
            })
            .catch(err => {
                console.log("Error Get Users :", err)
            })
    }
}

export const dataLogin = (username, password) => {
    return (dispatch) => {
        axios.get(URL_API + `/users?username=${username}&password=${password}`)
            .then(res => {
                if (res.data.length > 0) {
                    console.log("DATA User :", res.data[0])
                    // mengirim data ke reducer
                    dispatch({
                        type: "USER_LOGIN",
                        payload: res.data[0]
                    })
                    AsyncStorage.setItem("id_tkn", `${res.data[0].id}`)
                } else {
                    console.log("User Not Available")
                }
            })
            .catch(err => {
                console.log("ERROR :", err)
            })
    }
}

export const SignOut = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem('id_tkn')
        dispatch({ type: "LOGOUT" })
    }
}

export const keepLogin = () => {
    return async (dispatch) => {
        try {
            let getLogin = await AsyncStorage.getItem('id_tkn')
            console.log("keepLogin data :", getLogin)
            let res = await axios.get(URL_API + `/users?id=${getLogin}`)
            if (res.data.length > 0) {
                // mengirim data ke reducer
                console.log("Login User :", res.data[0])
                dispatch({
                    type: "USER_LOGIN",
                    payload: res.data[0]
                })
                AsyncStorage.setItem('id_tkn', `${res.data[0].id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const dataSignUp = (username, email, password) => {
    return (dispatch) => {
        axios.post(URL_API + `/users`, { username, email, password, role: 'user', cart: [] })
            .then(res => {
                console.log("Register Success :", res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const updateCart = (data) => {
    return {
        type: "UPDATE_CART",
        payload: data
    }
}