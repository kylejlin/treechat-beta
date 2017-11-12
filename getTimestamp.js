const getTimestamp = () => {
  const date = new Date();

  const d = date.getUTCDate();
  const m = date.getUTCMonth();
  const y = date.getUTCFullYear();
  const h = date.getUTCHours();
  const min = date.getUTCMinutes();

  return [d, m, y, h, min];
};

module.exports = getTimestamp;
