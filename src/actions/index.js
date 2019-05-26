// action type : isLoading, isFetching
import axios from 'axios';

// Action Types
export const IS_LOADING = 'IS_LOADING';
export const IS_COMPLETE = 'IS_COMPLETE';
export const SET_ITEM = 'SET_ITEM';
export const FETCH_ITEM = 'FETCH_ITEM';
export const SET_ERROR = 'IS_ERROR';


const httpClient = axios.create();
httpClient.defaults.timeout = 5000;

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

export function setError(error) {
  return { type: SET_ERROR, error }
}

export const fetchItem = () => async (dispatch) => {
  try {
    const response = await httpClient.get(`${process.env.REACT_APP_DEFAULT_URL}?$order=name`);
    if (response.status === 404) return false;
    dispatch(setError(''));
    return dispatch(setItem(response.data));
  } catch (error) {
    if(error.status === 400){
      return dispatch(setError('Search term not found (status code: 400)'))
    }
    if (error.status !== 404) {
      return dispatch(setError(error.message))
    }
  }
}


export const searchItem = (query) => async (dispatch) => {
  try {
    if(query === undefined){
      const error = new Error("Invalid search parameter");
      error.status = 422;
      throw error;
    }
    const response = await httpClient.get(`${process.env.REACT_APP_DEFAULT_URL}?$where=lower(name)%20like%20(lower(%22%25${query}%25%22))&$order=name`);
    if (response.status === 404) return false;
    dispatch(setError(''));
    return dispatch(setItem(response.data));
  } catch (error) {
    const message = error.message;
    dispatch(setError(''));
    if(message.slice(-3) === '400'){
      return dispatch(setError('Search term not found (status code: 400)'))
    }
    if (error.status !== 404 || error.status !== 400) {
      return dispatch(setError(message));
    }
  }
}
