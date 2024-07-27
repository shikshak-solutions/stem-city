const initialState = {
    someValue: 'Initial value',
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EXAMPLE_ACTION':
            return {
                ...state,
                someValue: action.payload.someValue,
            };
        default:
            return state;
    }
};

export default productReducer;
