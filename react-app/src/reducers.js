import updateComment from './updateComment';

export default [
  (state, action) => {
    switch (action.type) {
      case 'SELECT_REPLY_TARGET':
        return {
          ...state,
          ui: {
            ...state.ui,
            replyTargetId: action.id
          }
        };
      case 'MOUSE_OVER_COMMENT':
        return {
          ...state,
          ui: {
            ...state.ui,
            highlightedCommentId: action.id
          }
        };
      case 'MOUSE_OUT_OF_COMMENT':
        if (state.ui.highlightedCommentId === action.id) {
          return {
            ...state,
            ui: {
              ...state.ui,
              highlightedCommentId: -1
            }
          };
        }
        return state;
      case 'EDIT_REPLY':
        return {
          ...state,
          ui: {
            ...state.ui,
            reply: action.reply
          }
        };
      case 'SEND_REPLY':
        console.log('state: ', state);

        return {
          ...state,
          rootComment: updateComment(state.rootComment, [state.ui.replyTargetId, [state.ui.reply, state.username, Date.now(), state.idCounter]]),
          idCounter: state.idCounter + 1,
          ui: {
            ...state.ui,
            reply: '',
            replyTargetId: -1
          }
        };
      default:
        return state;
    }
  }
];
