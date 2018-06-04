import React from 'react';
import TimelineCreator from './TimelineCreator';
import Button from './Button';
import create from './actionCreator';
import './TimelineSelector.css';

const MAX_MEMBERS_DISPLAYED = 3;

function TimelineSelector({ timelines, state, dispatch }) {
  return (
    <div className="TimelineSelector">
      <ul>
        {
          timelines.map((timeline) => {
            const [[timelineId, [text, author], otherMembers]] = timeline;
            return (
              <li
                key={timelineId}
                onClick={() => dispatch(create.setFocusedTimeline(timeline))}
              >
                {text}
                {' - '}
                {otherMembers.concat([author]).slice(0, MAX_MEMBERS_DISPLAYED).join(', ')}
                {
                  otherMembers.length + 1 > MAX_MEMBERS_DISPLAYED ?
                    ` and ${otherMembers.length + 1 - MAX_MEMBERS_DISPLAYED} more`
                    : null
                }
                {
                  timeline[0][1][1] === state.username ?
                    <Button
                      action={create.checkDeleteTimeline(timeline[0][0])}
                      dispatch={dispatch}
                    >
                      Delete
                    </Button>
                    : null
                }
              </li>
            );
          }).concat([
            <li key="create">
              <TimelineCreator state={state} dispatch={dispatch} />
            </li>
          ])
        }
      </ul>
    </div>
  );
}

export default TimelineSelector;
