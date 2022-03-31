function formatTime(time) {
  const hour = parseInt(time / 3600, 10);
  const min = parseInt((time % 3600) / 60, 10);
  const sec = time % 60;

  const hourString = hour < 10 ? `0${hour}` : hour;
  const minString = min < 10 ? `0${min}` : min;
  const secString = sec < 10 ? `0${sec}` : sec;

  return hour > 1
    ? `${hourString} : ${minString} : ${secString}`
    : `${minString} : ${secString}`;
}

export default formatTime;
