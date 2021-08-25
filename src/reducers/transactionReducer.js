const INITIAL_STATE = {
    transaction_list: []
}

export const transactionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_TRANSACTION":
            return { ...state, transaction_list: action.payload }
        default:
            return state
    }
}