const INITIAL_STATE = {
    listProduct: []
}

export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCT":
            return { ...state, listProduct: action.payload }
        default:
            return state
    }
}