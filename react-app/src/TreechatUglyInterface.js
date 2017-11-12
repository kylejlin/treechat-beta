import React, { Component } from 'react';
import Login from './Login';
import Comment from './Comment';
import createStore from './createStore';
import reducers from './reducers';
import testComment from './testComment';
import './TreechatUglyInterface.css';

class TreechatUglyInterface extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: 'test-token',
      rootComment: testComment,
      username: 'John Doe',
      idCounter: 10,
      ui: {
        highlightedCommentId: -1,
        replyTargetId: -1,
        reply: ''
      }
    };

    this.store = createStore(reducers, this.state, this.setState.bind(this));
  }

  render(props) {
    const [text, author, timestamp, id, ...childComments] = this.state.rootComment;

    return (
      <div className="TreechatUglyInterface">
        <h1>Ugly Treechat Prototype <span>(version 0.0.0)</span></h1>
        {
          this.state.token === null ?
            <Login /> :
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
        }
      </div>
    );
  }
}

export default TreechatUglyInterface;
