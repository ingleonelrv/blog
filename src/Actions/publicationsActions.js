import trae from "trae";
import { GET_POSTS, LOADING, ERROR } from "../Types/publicationsTypes";

export const bringByUser = index => async (dispatch, getState) => {
  //getState give me access to actual global state
  const { users } = getState().usersReducer;
  const { publications } = getState().publicationsReducer;
  const user_id = users[index].id;

  dispatch({
    type: LOADING
  });
  try {
    const response = await trae.get(
      `http://jsonplaceholder.typicode.com/posts?userId=${user_id}`
    );
    const updatedPublications = [...publications, response.data];
    dispatch({
      type: GET_POSTS,
      payload: updatedPublications
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Something was wrong, try later!"
    });
  }
};
