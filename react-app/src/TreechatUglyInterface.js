import React, { Component } from 'react';
import Login from './Login';
import Comment from './Comment';
import TimelineSelector from './TimelineSelector';
import createStore from './createStore';
import createReducers from './reducers';
import addSocketListeners from './addSocketListeners';
import createRootCommentFromTimeline from './createRootCommentFromTimeline';
import openSocket from 'socket.io-client';
import './TreechatUglyInterface.css';

class TreechatUglyInterface extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timelines: [],
      focusedTimeline: null,
      isLoggedIn: false,
      ui: {
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
              <TimelineSelector
                timelines={this.state.timelines}
                state={this.state}
                dispatch={this.store.dispatch}
              /> :
              ((() => {
                const [text, author, timestamp, id, ...childComments] = createRootCommentFromTimeline(this.state.focusedTimeline);

                return (
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
                );
              })())
            )
        }
      </div>
    );
  }
}

export default TreechatUglyInterface;
