export default (timeline) => {
  const comments = [];

  for (let [parentId, idlessComment] of timeline) {
    const comment = idlessComment.concat([comments.length]);

    if (parentId in comments) {
      comments[parentId].push(comment);
    } else if (comments.length > 0) {
      window.alert('Nooooooo: Something went wrong!');
    }

    comments.push(comment);
  }

  return comments[0];
};
