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

    //Now i'm going to add two fields to publications for comments and open/close
    const new_response = response.data.map(publication => ({
      ...publication,
      comments: [],
      open: false
    }));
    //saving the previus data more new data
    const updatedPublications = [...publications, new_response];
    dispatch({
      type: GET_POSTS,
      payload: updatedPublications
    });
    //get the index of new post for passing to users
    const publications_index = updatedPublications.length - 1;
    //update users
    const updatedUsers = [...users];
    //in the position of the user clicked add a new field to say user which is the post's index, such as a relation
    updatedUsers[index] = {
      ...users[index],
      publications_index
    };
    dispatch({
      type: GET_USERS,
      payload: updatedUsers
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Publications not available!"
    });
  }
};
export const openClose = (publications_index, comment_index) => dispatch => {
  alert("Hello in OpenClose Action");
};
