export default (comment, update) => {
  const [parentId, childComment] = update;

  const appendChildCommentIfCommentIsParent = (comment) => {
    const id = comment[3];

    if (!(comment instanceof Array)) {
      return comment;
    }

    if (id === parentId) {
      const cloneComment = comment.slice();
      cloneComment.push(childComment);
      return cloneComment;
    }

    return comment.map(appendChildCommentIfCommentIsParent);
  }

  return appendChildCommentIfCommentIsParent(comment);
};
