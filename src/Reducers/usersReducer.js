import { GET_USERS, LOADING, ERROR } from "../Types/usersTypes";
const INITIAL_STATE = {
  users: [],
  loading: false,
  error: null
};
function usersReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_USERS:
      return { ...state, users: payload, loading: false };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
export default usersReducer;
