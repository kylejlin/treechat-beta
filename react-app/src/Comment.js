import React from 'react';
import create from './actionCreator';
import './Comment.css';

function Comment({
  text,
  author,
  timestamp,
  id,
  childComments,
  state,
  dispatch
}) {
  let className = 'Comment';

  className += ' ';
  className += (id % 2 === 0 ? 'Comment-green' : 'Comment-white');

  className += (state.ui.highlightedCommentId === id ? ' Comment-highlighted' : '');

  return (
    <div
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(create.selectReplyTarget(id));
      }}
      onMouseOver={(e) => {
        e.stopPropagation();
        dispatch(create.mouseOverComment(id));
      }}
      onMouseOut={(e) => {
        e.stopPropagation(id);
        dispatch(create.mouseOutOfComment(id));
      }}
    >
      <p className="Comment-text">{text}</p>
      <p className="Comment-author">{author}</p>
      <p className="Comment-timestamp">{timestamp}</p>

      {
        childComments.length > 0
          ? (
            <ul>
              {
                childComments.map((comment) => {
                  const [text, author, timestamp, id, ...childComments] = comment;
                  return <Comment
                    key={id}
                    text={text}
                    author={author}
                    timestamp={timestamp}
                    id={id}
                    childComments={childComments}
                    state={state}
                    dispatch={dispatch}
                  />;
                })
              }
            </ul>
          )
          : null
      }

      {
        id === state.ui.replyTargetId
          ? (
            <div>
              <input type="text" value={state.ui.reply} autoFocus onChange={(e) => {dispatch(create.editReply(e.target.value))}} />
              <button onClick={(e) => {e.stopPropagation();dispatch(create.sendReply())}}>Send</button>
            </div>
          )
          : null
      }
    </div>
  );
}

export default Comment;
