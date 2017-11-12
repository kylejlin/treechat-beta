export default (socket) => [
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
        if (!state.ui.reply) {
          return state;
        }

        socket.emit('new update', [state.focusedTimeline[0][0], state.ui.replyTargetId, state.ui.reply]);

        return {
          ...state,
          ui: {
            ...state.ui,
            reply: '',
            replyTargetId: -1
          }
        };
      case 'EDIT_LOGIN_USERNAME':
        return {
          ...state,
          ui: {
            ...state.ui,
            login: {
              ...state.ui.login,
              username: action.username
            }
          }
        };
      case 'EDIT_LOGIN_PASSWORD':
        return {
          ...state,
          ui: {
            ...state.ui,
            login: {
              ...state.ui.login,
              password: action.password
            }
          }
        };
      case 'LOGIN':
        if (state.ui.login.username && state.ui.login.password) {
          socket.emit('login', state.ui.login);
        }
        return state;
      case 'EDIT_NEW_USERNAME':
        return {
          ...state,
          ui: {
            ...state.ui,
            signUp: {
              ...state.ui.signUp,
              username: action.username
            }
          }
        };
      case 'EDIT_NEW_PASSWORD':
        return {
          ...state,
          ui: {
            ...state.ui,
            signUp: {
              ...state.ui.signUp,
              password: action.password
            }
          }
        };
      case 'SIGN_UP':
        if (state.ui.signUp.username && state.ui.signUp.password) {
          socket.emit('sign up', state.ui.signUp);
        }
        return state;
      case 'SET_TIMELINES':
        return {
          ...state,
          timelines: action.timelines,
          focusedTimeline: null,
          isLoggedIn: true
        };
      case 'UPDATE_TIMELINE':
        return {
          ...state,
          timelines: state.timelines.map((timeline) => {
            return timeline[0][0] === action.timelineId ?
              timeline.concat([action.update]) : timeline;
          }),
          focusedTimeline: state.focusedTimeline[0][0] === action.timelineId ?
            state.focusedTimeline.concat([action.update]) : state.focusedTimeline
        };
      case 'SET_FOCUSED_TIMELINE':
        return {
          ...state,
          focusedTimeline: action.timeline
        };
      default:
        throw new Error('Illegal action dispatched!'); // Fail loudly
        // return state;
    }
  }
];
