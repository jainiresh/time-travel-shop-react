const initialState = {
    showLoader: true
};

const loaderStateReducer = (state = initialState, action) => {
    switch(action.type){
        case 'TURN_ON_LOADING':
            return {showLoader: true};
        case 'TURN_OFF_LOADING':
            return {showLoader: false}
        default:
            return state;
    }
}

export default loaderStateReducer