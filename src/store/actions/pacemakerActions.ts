import { SET_PARAMS } from "types/types";

export const setParams = (data) => dispatch => {
  console.log(data)
  localStorage.setItem('params', JSON.stringify(data))
  dispatch({
    type: SET_PARAMS,
    payload: data,
  })
}