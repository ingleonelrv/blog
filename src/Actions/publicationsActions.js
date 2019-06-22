import trae from "trae";
import { GET_POSTS, LOADING, ERROR } from "../Types/publicationsTypes";
import { GET_USERS } from "../Types/usersTypes";

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

    //saving the previus data more new data
    const updatedPublications = [...publications, response.data];
    //get the index of new post for passing to users
    const publications_key = updatedPublications.length - 1;
    //update users
    const updatedUsers = [...users];
    //in the position of the user clicked add a new field to say user which is the post's index, such as a relation
    updatedUsers[index] = {
      ...users[index],
      publications_key
    };
    dispatch({
      type: GET_USERS,
      payload: updatedUsers
    });
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
