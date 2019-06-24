import trae from "trae";
import {
  GET_TASKS,
  LOADING,
  ERROR,
  CHANGE_USER_ID,
  CHANGE_TITLE,
  TASK_SAVED,
  TASK_UPDATED,
  CLEAR
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
      type: TASK_SAVED
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Tasks couldn't saved!"
    });
  }
};
export const editTask = editTask => async dispatch => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await trae.put(
      `https://jsonplaceholder.typicode.com/todos/${editTask.id}`,
      editTask
    );
    dispatch({
      type: TASK_SAVED
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Tasks couldn't saved!"
    });
  }
};
export const changeCheckbox = (us_id, tk_id) => async (dispatch, getState) => {
  const { tasks } = getState().tasksReducer;
  const selected = tasks[us_id][tk_id];

  const updated = { ...tasks };
  updated[us_id] = { ...tasks[us_id] };
  updated[us_id][tk_id] = {
    ...tasks[us_id][tk_id],
    completed: !selected.completed
  };
  dispatch({
    type: TASK_UPDATED,
    payload: updated
  });
};
export const remove = tk_id => async dispatch => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await trae.delete(
      `https://jsonplaceholder.typicode.com/todos/${tk_id}`
    );
    dispatch({
      type: GET_TASKS,
      payload: []
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Tasks couldn't saved!"
    });
  }
};
export const clearForm = () => async dispatch => {
  dispatch({
    type: CLEAR
  });
};
