const ONE_SECOND_MS = 1000;
const ONE_MINUTE_MS = ONE_SECOND_MS * 60;
const ONE_HOUR_MS = ONE_MINUTE_MS * 60;
const ONE_DAY_MS = ONE_HOUR_MS * 24;
const DAYS_IN_WEEK = 7;

export const createCycleArr = (initialDay: number, numDays: number) => {
  const applicableDays = [];
  for (let i = 0; i < numDays; i++) {
    applicableDays.push(initialDay + ONE_DAY_MS * i);
  }
  return applicableDays;
};

export const getWeekday = (weekIndex: number) => {
  switch (weekIndex) {
    case 0:
      return 'SUNDAY';
    case 1:
      return 'MONDAY';
    case 2:
      return 'TUESDAY';
    case 3:
      return 'WEDNESDAY';
    case 4:
      return 'THURSDAY';
    case 5:
      return 'FRIDAY';
    case 6:
      return 'SATURDAY';
    default:
      return 'Unkonwn';
  }
};

export const createWeek = (dateNumber: Date) => {
  const weekArray: Date[] = [];
  for (let i = 1; i < 10; i++) {
    weekArray.push(new Date(dateNumber.getTime() + i * ONE_DAY_MS));
  }
  return weekArray;
};
