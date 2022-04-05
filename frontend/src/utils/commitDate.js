function formatDate(inputdate) {
  const dateObj = new Date(inputdate);
  const month = dateObj.toLocaleString('en-US', { month: 'short' });
  const date = dateObj.toLocaleString('en-US', { day: 'numeric' });
  const year = dateObj.toLocaleString('en-US', { year: 'numeric' });

  return `${month} ${date}, ${year}`;
}

const commitDate = obj => {
  const styledDate = {
    date: new Date(obj.start_time),
    value: 1,
    valueLabel: formatDate(obj.start_time),
  };
  return styledDate;
};

export default commitDate;
