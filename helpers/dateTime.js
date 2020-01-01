
exports.getDiffInSeconds = (start, end) => {

  start = new Date(start);
  end = new Date(end);

  return ((end.getTime() - start.getTime()) / 1000);

};

exports.convertDateToSeconds = (date) => {

  date = new Date(date);

  return (date / 1000);

};
