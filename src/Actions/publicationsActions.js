import trae from "trae";
import { GET_POSTS, LOADING, ERROR } from "../Types/publicationsTypes";

export const getAll = () => async dispatch => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await trae.get(
      "http://jsonplaceholder.typicode.com/posts"
    );
    dispatch({
      type: GET_POSTS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Something was wrong, try later!"
    });
  }
};
export const bringByUser = index => async (dispatch, getState) => {
  //getState give me access to actual global state
  const { users } = getState().usersReducer;
  const user_id = users[index].id;
  dispatch({
    type: LOADING
  });
  try {
    const response = await trae.get(
      `http://jsonplaceholder.typicode.com/posts?userId=${user_id}`
    );
    dispatch({
      type: GET_POSTS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Something was wrong, try later!"
    });
  }
};
