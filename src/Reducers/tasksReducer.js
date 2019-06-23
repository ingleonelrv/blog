import { GET_TASKS, LOADING, ERROR } from "../Types/tasksTypes";
const INITIAL_STATE = {
  tasks: [],
  loading: false,
  error: null
};
function tasksReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_TASKS:
      return { ...state, tasks: payload, loading: false };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
export default tasksReducer;
