import React, { Component } from 'react';
import Login from './Login';
import Comment from './Comment';
import TimelineSelector from './TimelineSelector';
import Button from './Button';
import ConfirmPrompt from './ConfirmPrompt';
import createStore from './createStore';
import createReducers from './reducers';
import addSocketListeners from './addSocketListeners';
import createRootCommentFromTimeline from './createRootCommentFromTimeline';
import openSocket from 'socket.io-client';
import create from './actionCreator';
import './TreechatUglyInterface.css';

class TreechatUglyInterface extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timelines: [],
      focusedTimeline: null,
      isLoggedIn: false,
      deleteTimelineId: null,
      username: null,
      ui: {
        deleteTimelineName: '',
        highlightedCommentId: -1,
        replyTargetId: -1,
        reply: '',
        login: {
          username: '',
          password: ''
        },
        signUp: {
          username: '',
          password: ''
        },
        createTimeline: {
          name: '',
          members: [],
          newMemberName: ''
        }
      }
    };

    this.socket = openSocket(window.location.origin + window.location.pathname);

    this.store = createStore(createReducers(this.socket), this.state, this.setState.bind(this));

    addSocketListeners(this.socket, () => this.state, this.store.dispatch);
  }

  render(props) {
    return (
      <div className="TreechatUglyInterface">
        <h1>Ugly Treechat Prototype <span>(version 0.0.0)</span></h1>
        {
          !this.state.isLoggedIn ?
            <Login
              state={this.state}
              dispatch={this.store.dispatch}
            /> : (
            this.state.focusedTimeline === null ?
              (
                <TimelineSelector
                  timelines={this.state.timelines}
                  state={this.state}
                  dispatch={this.store.dispatch}
                />
              ) :
              (
                this.state.deleteTimelineId === null ?
                  ((() => {
                    const [text, author, timestamp, id, ...childComments] = createRootCommentFromTimeline(this.state.focusedTimeline);

                    return [
                      <Button action={create.reselectTimeline()} dispatch={this.store.dispatch}>Select another thread</Button>,
                      <Comment
                        text={text}
                        author={author}
                        timestamp={timestamp}
                        id={id}
                        childComments={childComments}
                        nestLevel={0}
                        state={this.state}
                        dispatch={this.store.dispatch}
                      />
                    ];
                  })())
                : (
                  <ConfirmPrompt
                    title="Confirm deletion"
                    confirmAction={create.confirmTimelineDeletion()}
                    cancelAction={create.cancelTimelineDeletion()}
                    dispatch={this.store.dispatch}
                  >
                    Are you sure you want to delete this thread? The deletion process is irreversible.
                    If you are certain this is what you want, type the name of the thread in the box below.
                    <input
                      type="text"
                      value={this.state.ui.deleteTimelineName}
                      onChange={(e) => this.store.dispatch(create.editTimelineDeletionConfirmationName(e.target.value))}
                      style={{width: '100%'}}
                    />
                  </ConfirmPrompt>
                )
              )
            )
        }
      </div>
    );
  }
}

export default TreechatUglyInterface;
