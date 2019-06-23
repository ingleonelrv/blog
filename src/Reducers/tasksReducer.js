import {
  GET_TASKS,
  LOADING,
  ERROR,
  CHANGE_USER_ID,
  CHANGE_TITLE
} from "../Types/tasksTypes";
const INITIAL_STATE = {
  tasks: [],
  loading: false,
  error: null,
  userId: "",
  title: ""
};
function tasksReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_TASKS:
      return { ...state, tasks: payload, loading: false };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: payload, loading: false };
    case CHANGE_USER_ID:
      return { ...state, userId: payload };
    case CHANGE_TITLE:
      return { ...state, title: payload };
    default:
      return state;
  }
}
export default tasksReducer;
