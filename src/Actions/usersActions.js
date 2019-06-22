import trae from "trae";
import { GET_USERS, LOADING, ERROR } from "../Types/usersTypes";

export const getAll = () => async dispatch => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await trae.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
      type: GET_USERS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Something was wrong, try later!"
    });
  }
};
