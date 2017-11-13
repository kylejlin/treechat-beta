import create from './actionCreator';

export default (socket, state, dispatch) => {
  socket.on('invalid field', () => window.alert('Invalid field!'));

  socket.on('timelines', timelines => {
    dispatch(create.setTimelines(timelines));
  });

  socket.on('new timeline', timeline => {
    dispatch(create.newTimeline(timeline));
  });

  socket.on('new update', ([timelineId, update]) => {
    const timeline = state().timelines.find(([[id]]) => id === timelineId);

    if (!timeline) {
      return;
    }

    dispatch(create.updateTimeline(timelineId, update));
  });
};
