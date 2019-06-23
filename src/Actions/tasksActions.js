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
