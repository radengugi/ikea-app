import axios from "axios"
import { URL_API } from "../helper"

export const getProducts = () => {
    return async (dispatch) => {
        try {
            let get = await axios.get(URL_API + `/products`)
            dispatch({
                type: "GET_PRODUCT",
                payload: get.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}