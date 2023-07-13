import { LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    CLEAR_ERRORS} from "../constants/userConstants";


export const userReducer=(state={users:{}},action)=>{
    switch(action.type)
    {
        case LOGIN_REQUEST:
            case REGISTER_USER_REQUEST:
            return{
                loading:true,
                isAuthenticated:false,
            };
        case LOGIN_SUCCESS:
            case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload,
            };
        case LOGIN_FAIL:
            case REGISTER_USER_FAIL:
            return {
                ...state,
                loading:false,
                isAuthenticated:false,
                error:action.payload,
                user:null,
                
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        default:
            return state;
    }
}