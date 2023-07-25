import { FAVOURITE_ITEM,REMOVE_FAVOURITE_ITEM } from "../constants/favouriteConstants";

export const favouriteReducer=(state={favourites:[]},action)=>{
    switch(action.type)
    {
        case FAVOURITE_ITEM:
            const item=action.payload;
            const isItemExist=state.favourites.find((i)=>i.productId===item.productId)

            if(isItemExist)
            {
                return{
                    ...state,
                    favourites:state.favourites.map((i)=>i.productId===isItemExist.productId?item:i)
                }
            }
            else{
                return {
                    ...state,
                    favourites:[...state.favourites,item],
                }
            }
        case REMOVE_FAVOURITE_ITEM:
            return{
                ...state,
                favourites:state.favourites.filter((i)=>i.productId!==action.payload),
            }
        default:
            return state;
    }
}