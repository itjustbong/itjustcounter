const getKstDate = () => {
  const now = new Date(); // 현재 시간
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaNow = new Date(utcNow + koreaTimeDiff);

  return koreaNow;
};

const compareDates = (date1: Date, date2: Date) => {
  return date1.toDateString() === date2.toDateString();
};

export { getKstDate, compareDates };
