import trae from "trae";
import { GET_TASKS, LOADING, ERROR } from "../Types/tasksTypes";

export const getAll = () => async dispatch => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await trae.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    dispatch({
      type: GET_TASKS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Tasks not available!"
    });
  }
};
