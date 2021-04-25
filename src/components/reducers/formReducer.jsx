const formReducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH':
            return {
                ...state,
                [action.field]: action.payload,
            };
        case 'FILTER':
            return {
                ...state,
                [action.field]: `+language:"${action.payload}"`,
            };
        case 'SORT':
            return {
                ...state,
                [action.field]: `&sort=${action.payload}`,
            };
        default:
            return state;
    }
};

export default formReducer;
