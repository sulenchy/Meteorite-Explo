import {
    IS_LOADING,
    IS_COMPLETE,
    SET_ITEM,
 } from '../actions/index';

 export const initialState = {
    item: [],
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
      case IS_LOADING:
        return {
            ...state,
            isLoading: action.isLoading
        };
  
      case IS_COMPLETE:
        return {
            ...state,
            isLoading: action.isLoading
        };

      case SET_ITEM:
        return {
            ...state,
            item: action.item
        };
    

      default:
        return state;
    }
  };