import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { transactionReducer } from './transactionReducer'
import { productReducer } from './productReducer'

export default combineReducers({
    userReducer, transactionReducer, productReducer
})