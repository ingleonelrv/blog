import trae from "trae";
import {
  GET_TASKS,
  LOADING,
  ERROR,
  CHANGE_USER_ID,
  CHANGE_TITLE,
  TASK_ADDED
} from "../Types/tasksTypes";

export const getAll = () => async dispatch => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await trae.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    //normalize data
    const tasks = {};
    response.data.map(
      tk =>
        (tasks[tk.userId] = {
          ...tasks[tk.userId],
          [tk.id]: {
            ...tk
          }
        })
    );
    dispatch({
      type: GET_TASKS,
      payload: tasks
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Tasks not available!"
    });
  }
};
export const changeUserId = userId => dispatch => {
  dispatch({
    type: CHANGE_USER_ID,
    payload: userId
  });
};
export const changeTitle = title => dispatch => {
  dispatch({
    type: CHANGE_TITLE,
    payload: title
  });
};
export const addTask = newTask => async dispatch => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await trae.post(
      "https://jsonplaceholder.typicode.com/todos",
      newTask
    );
    dispatch({
      type: TASK_ADDED
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Tasks couldn't saved!"
    });
  }
};
