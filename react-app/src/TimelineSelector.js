import React from 'react';
import create from './actionCreator';

function TimelineSelector({ timelines, state, dispatch }) {
  return (
    <div className="TimelineSelector">
      <ul>
        {
          timelines.map((timeline) => (
            <li
              key={timeline[0][0]}
              onClick={() => dispatch(create.setFocusedTimeline(timeline))}
            >
              {timeline[0][1][0]}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default TimelineSelector;
