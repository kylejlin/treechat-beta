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
      case 'RESELECT_TIMELINE':
        return {
          ...state,
          focusedTimeline: null
        };
      case 'EDIT_TIMELINE_NAME':
        return {
          ...state,
          ui: {
            ...state.ui,
            createTimeline: {
              ...state.ui.createTimeline,
              name: action.name
            }
          }
        };
      case 'CREATE_TIMELINE':
        if (
          !state.ui.createTimeline.name ||
          state.ui.createTimeline.members.length === 0
        ) {
          return state;
        }

        socket.emit('new timeline', [state.ui.createTimeline.name, state.ui.createTimeline.members]);

        return {
          ...state,
          ui: {
            ...state.ui,
            createTimeline: {
              ...state.ui.createTimeline,
              name: '',
              members: [],
              newMemberName: ''
            }
          }
        };
      case 'REMOVE_MEMBER':
        const memberArrayWithoutRemovee = state.ui.createTimeline.members.slice();

        if (action.index in memberArrayWithoutRemovee) {
          memberArrayWithoutRemovee.splice(action.index, 1);
        }

        return {
          ...state,
          ui: {
            ...state.ui,
            createTimeline: {
              ...state.ui.createTimeline,
              members: memberArrayWithoutRemovee
            }
          }
        };
      case 'EDIT_NEW_MEMBER_NAME':
        return {
          ...state,
          ui: {
            ...state.ui,
            createTimeline: {
              ...state.ui.createTimeline,
              newMemberName: action.name
            }
          }
        };
      case 'ADD_MEMBER':
        return {
          ...state,
          ui: {
            ...state.ui,
            createTimeline: {
              ...state.ui.createTimeline,
              newMemberName: '',
              members: state.ui.createTimeline.members.concat([state.ui.createTimeline.newMemberName])
            }
          }
        };
      case 'NEW_TIMELINE':
        return {
          ...state,
          timelines: state.timelines.concat([action.timeline])
        };
      case 'REMOVE_LOCAL_TIMELINE':
        return {
          ...state,
          timelines: state.timelines.filter(timeline => timeline[0][0] === action.timelineId),
          focusedTimeline: state.focusedTimeline[0][0] === action.timelineId ? null : state.focusedTimeline
        };
      case 'CHECK_DELETE_TIMELINE':
        return {
          ...state,
          deleteTimelineId: action.timelineId
        };
      case 'CONFIRM_TIMELINE_DELETION':
        const timeline = state.timelines.find(timeline => timeline[0][0] === state.deleteTimelineId);
        if (
          !timeline ||
          state.ui.deleteTimelineName !== timeline[0][1][0]
        ) {
          window.alert('Names do not match!');
          return state;
        }

        socket.emit('delete timeline', [state.deleteTimelineId, state.ui.deleteTimelineName]);

        return {
          ...state,
          deleteTimelineId: null,
          ui: {
            ...state.ui,
            deleteTimelineName: ''
          }
        };
      case 'CANCEL_TIMELINE_DELETION':
        return {
          ...state,
          deleteTimelineId: null,
          ui: {
            ...state.ui,
            deleteTimelineName: ''
          }
        };
      case 'EDIT_TIMELINE_DELETION_CONFIRMATION_NAME':
        return {
          ...state,
          ui: {
            ...state.ui,
            deleteTimelineName: action.name
          }
        };
      case 'SET_USERNAME':
        return {
          ...state,
          username: action.username,
          isLoggedIn: true
        };
      default:
        throw new Error('Illegal action dispatched!'); // Fail loudly
        // return state;
    }
  }
];
