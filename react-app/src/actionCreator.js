const actionSpecs = {
  SELECT_REPLY_TARGET: ['id'],
  MOUSE_OVER_COMMENT: ['id'],
  MOUSE_OUT_OF_COMMENT: ['id'],
  EDIT_REPLY: ['reply'],
  SEND_REPLY: [],
  EDIT_LOGIN_USERNAME: ['username'],
  EDIT_LOGIN_PASSWORD: ['password'],
  LOGIN: [],
  EDIT_NEW_USERNAME: ['username'],
  EDIT_NEW_PASSWORD: ['password'],
  SIGN_UP: [],
  SET_TIMELINES: ['timelines'],
  UPDATE_TIMELINE: ['timelineId', 'update'],
  SET_FOCUSED_TIMELINE: ['timeline'],
  RESELECT_TIMELINE: [],
  EDIT_TIMELINE_NAME: ['name'],
  CREATE_TIMELINE: [],
  REMOVE_MEMBER: ['index'],
  EDIT_NEW_MEMBER_NAME: ['name'],
  ADD_MEMBER: [],
  NEW_TIMELINE: ['timeline'],
  REMOVE_LOCAL_TIMELINE: ['timelineId'],
  CHECK_DELETE_TIMELINE: ['timelineId'],
  CONFIRM_TIMELINE_DELETION: [],
  CANCEL_TIMELINE_DELETION: [],
  EDIT_TIMELINE_DELETION_CONFIRMATION_NAME: ['name'],
  SET_USERNAME: ['username']
};

const createActionCreator = (name, propertyNames) => {
  return (...args) => {
    const action = { type: name };

    propertyNames.forEach((property, index) => {
      action[property] = args[index];
    });

    return action;
  };
}

const toCamelCaseFromUnderscoreSeparatedCaps = name => {
  const lowerCaseWords = name.split('_').map(word => word.toLowerCase());
  const capitalizedWords = lowerCaseWords.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  return lowerCaseWords.length === 1 ? lowerCaseWords[0] : lowerCaseWords[0] + capitalizedWords.slice(1).join('');
};

const actions = {};

for (let name in actionSpecs) {
  const propertyNames = actionSpecs[name];
  actions[toCamelCaseFromUnderscoreSeparatedCaps(name)] = createActionCreator(name, propertyNames);
}

export default actions;
