export type Activity = {
  name: string;
  cycle: number;
  startDate: number;
  timeSlots: number;
};

export const activities = {
  bfd: {
    name: 'BFD',
    cycle: 3,
    timeSlots: 2,
  },
  loa: { name: 'Lost Ark Raids', cycle: 7, timeSlots: 1 },
  sunken: { name: 'Sunken Temple', cycle: 7, timeSlots: 1 },
};
