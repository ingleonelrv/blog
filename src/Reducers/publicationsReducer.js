import {
  GET_POSTS,
  LOADING,
  ERROR,
  LOADING_COMMENTS,
  ERROR_COMMENT,
  GET_COMMENTS
} from "../Types/publicationsTypes.js";
const INITIAL_STATE = {
  publications: [],
  loading: false,
  error: null,
  loadingComment: false,
  errorComment: null
};
function publicationsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_POSTS:
      return { ...state, publications: payload, loading: false, error: null };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: payload, loading: false };
    case GET_COMMENTS:
      return {
        ...state,
        publications: payload,
        loadingComment: false,
        errorComment: null
      };
    case LOADING_COMMENTS:
      return { ...state, loadingComment: true };
    case ERROR_COMMENT:
      return { ...state, errorComment: payload, loadingComment: false };
    default:
      return state;
  }
}
export default publicationsReducer;
