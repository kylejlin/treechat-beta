import React from 'react';
import Button from './Button';
import create from './actionCreator';

function TimelineCreator({ state, dispatch }) {
  return (
    <div className="TimelineCreator">
      <h2>Create a thread</h2>
      <p>Name:</p>
      <input
        type="text"
        value={state.ui.createTimeline.name}
        onChange={(e) => dispatch(create.editTimelineName(e.target.value))}
      />
      <p>Members:</p>
      <ul>
        {
          state.ui.createTimeline.members.map((member, index) => (
            <li key={index}>
              {member}
              <Button action={create.removeMember(index)} dispatch={dispatch}>Remove</Button>
            </li>
          )).concat([
            <li key="create">
              <p>Add member</p>
              <input
                type="text"
                value={state.ui.createTimeline.newMemberName}
                onChange={(e) => dispatch(create.editNewMemberName(e.target.value))}
              />
              <Button
                action={create.addMember()}
                dispatch={dispatch}
                disabled={state.ui.createTimeline.newMemberName === ''}
              >
                Add
              </Button>
            </li>
          ])
        }
      </ul>
      <Button
        action={create.createTimeline()}
        dispatch={dispatch}
        disabled={state.ui.createTimeline.name === '' || state.ui.createTimeline.members.length === 0}
      >
        Create
      </Button>
    </div>
  );
}

export default TimelineCreator;
