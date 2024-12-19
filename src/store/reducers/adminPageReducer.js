const initialState = {
    isAdminPage : false
}

const adminPageReducer = (state=initialState, action) => {
    switch(action.type){
        case 'TRAVEL_TO_ADMIN_PAGE':
            return {
                isAdminPage: true
            };
        case 'TRAVEL_OUT_FROM_ADMIN_PAGE':
            return {
                isAdminPage: false
            }
        default:
            return state;
    }
        
}

export default adminPageReducer;