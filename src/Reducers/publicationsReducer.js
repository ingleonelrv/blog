import { GET_POSTS, LOADING, ERROR } from "../Types/publicationsTypes.js";
const INITIAL_STATE = {
  publications: [],
  loading: false,
  error: null
};
function publicationsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_POSTS:
      return { ...state, publications: payload, loading: false, error: null };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
export default publicationsReducer;
