import {
    IS_LOADING,
    IS_COMPLETE,
    SET_ITEM,
    SET_ERROR,
 } from '../actions/index';

 export const initialState = {
    item: [],
    isLoading: false,
    error: ''
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
        
      case SET_ERROR:
        return {
            ...state,
            error: action.error
        };
    
      default:
        return state;
    }
  };