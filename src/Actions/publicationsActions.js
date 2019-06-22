import trae from "trae";
import {
  GET_POSTS,
  LOADING,
  ERROR,
  LOADING_COMMENTS,
  ERROR_COMMENT,
  GET_COMMENTS
} from "../Types/publicationsTypes";
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
    //update users, Inmutable
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
export const openClose = (publications_index, comment_index) => (
  dispatch,
  getState
) => {
  const { publications } = getState().publicationsReducer;
  const selected = publications[publications_index][comment_index];
  const selectedUpd = {
    ...selected,
    open: !selected.open
  };
  //INMUTABLE,level by level
  //first level, array of array
  const updatedPublications = [...publications];
  //second level, array of publications of user
  updatedPublications[publications_index] = [
    ...publications[publications_index]
  ];
  //thrid level, publications selected and updated
  updatedPublications[publications_index][comment_index] = selectedUpd;
  dispatch({
    type: GET_POSTS,
    payload: updatedPublications
  });
};
export const bringComments = (publications_index, comment_index) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: LOADING_COMMENTS
  });
  //select a publications where i'm goint to bring comments
  const { publications } = getState().publicationsReducer;
  const selected = publications[publications_index][comment_index];
  try {
    const response = await trae.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${selected.id}`
    );
    const selectedUpd = {
      ...selected,
      comments: response.data
    };
    //INMUTABLE,level by level
    //first level, array of array
    const updatedPublications = [...publications];
    //second level, array of publications of user
    updatedPublications[publications_index] = [
      ...publications[publications_index]
    ];
    //thrid level, publications selected and updated
    updatedPublications[publications_index][comment_index] = selectedUpd;
    dispatch({
      type: GET_COMMENTS,
      payload: updatedPublications
    });
  } catch (error) {
    dispatch({
      type: ERROR_COMMENT,
      payload: "Comments couldn't loaded!"
    });
  }
};
