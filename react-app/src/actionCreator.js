const actionSpecs = {
  SELECT_REPLY_TARGET: ['id'],
  MOUSE_OVER_COMMENT: ['id'],
  MOUSE_OUT_OF_COMMENT: ['id'],
  EDIT_REPLY: ['reply'],
  SEND_REPLY: []
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