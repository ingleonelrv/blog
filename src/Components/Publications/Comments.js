import React from "react";
import { connect } from "react-redux";

import Loading from "../Global/Spinner";
import NotFound from "../Global/NotFound";

const Comments = props => {
  if (props.errorComment) return <NotFound message={props.errorComment} />;
  //must have !props.comments else appear loading always in the other post
  if (props.loadingComment && !props.comments.length) return <Loading />;
  const putComment = () =>
    props.comments.map(comment => (
      <li key={comment.id}>
        <b>
          <u>{comment.email}</u>
        </b>
        <br />
        {comment.body}
      </li>
    ));
  return <ul>{putComment()}</ul>;
};
const mapStateToProps = ({ publicationsReducer }) => publicationsReducer;

export default connect(mapStateToProps)(Comments);
