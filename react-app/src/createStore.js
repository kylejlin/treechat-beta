export default (reducers, initState, setState) => {
  const store = {
    state: initState,
    dispatch: action => {
      store.state = reducers.reduce((state, reducer) => reducer(state, action), store.state);
      setState(store.state);
    }
  };

  return store;
};
