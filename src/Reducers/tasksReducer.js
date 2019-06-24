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
const INITIAL_STATE = {
  tasks: [],
  loading: false,
  error: null,
  userId: "",
  title: "",
  redirect: false
};
function tasksReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_TASKS:
      return { ...state, tasks: payload, loading: false, redirect: false };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: payload, loading: false };
    case CHANGE_USER_ID:
      return { ...state, userId: payload };
    case CHANGE_TITLE:
      return { ...state, title: payload };
    case TASK_SAVED:
      return {
        ...state,
        tasks: [],
        loading: false,
        error: null,
        redirect: true,
        userId: "",
        title: ""
      };
    case TASK_UPDATED:
      return { ...state, tasks: payload };
    case CLEAR:
      return { ...state, userId: "", title: "" };
    default:
      return state;
  }
}
export default tasksReducer;
