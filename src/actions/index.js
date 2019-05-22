// action type : isLoading, isFetching
import axios from 'axios';

// Action Types
export const IS_LOADING = 'IS_LOADING';
export const IS_COMPLETE = 'IS_COMPLETE';
export const SET_ITEM = 'SET_ITEM';
export const FETCH_ITEM = 'FETCH_ITEM';

// type DispatchFn = (dispatch?: any, getState?: any) => any;


// action creator
export function isLoading() {
    return { type: IS_LOADING, isLoading: true }
}
export function isComplete() {
    return { type: IS_COMPLETE, isLoading: false }
}

export function setItem(item) {
    return { type: SET_ITEM, item }
}

export const fetchItem = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_DEFAULT_URL}?$order=name`);
        if (response.status === 404) return false;
        return dispatch(setItem(response.data));
      } catch (error) {
        if (error.status !== 404) {
          return Promise.reject(error);
        }
      }
}


export const searchItem = (query) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_DEFAULT_URL}?$where=lower(name)%20like%20(lower(%22%25${query}%25%22))&$order=name`);
        if (response.status === 404) return false;
        return dispatch(setItem(response.data));
      } catch (error) {
        if (error.status !== 404) {
          return Promise.reject(error);
        }
      }
}
