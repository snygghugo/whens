import { StringSelectMenuInteraction } from 'discord.js';
import { createCycleArr } from '../utils/dateHelpers';
import { Activity } from '../activities/activities';
import { getWeekday } from '../utils/dateHelpers';
import { createEmojiArray } from '../utils/emoji';

const getRoleForActivity = (activityName: string) => {
  switch (activityName) {
    case 'BFD':
      return '<@&1183772336265121822>';
    default:
      return 'Raiders';
  }
};

const createCoolPost = (activity: Activity, emojiArr: string[]) => {
  const applicableDays = createCycleArr(activity.startDate, activity.cycle);
  const applicableDaysToString = applicableDays.reduce(
    (accumulator, day, i) => {
      const dateDay = new Date(day);
      switch (activity.name) {
        case 'BFD':
          accumulator.push(
            `*${getWeekday(dateDay.getDay())}* ${dateDay
              .toLocaleDateString('sv-SE')
              .slice(-5)} 19:00 ${emojiArr[i * activity.timeSlots]}`
          );
          accumulator.push(
            `*${getWeekday(dateDay.getDay())}* ${dateDay
              .toLocaleDateString('sv-SE')
              .slice(-5)} 19:15 ${emojiArr[i * activity.timeSlots + 1]}`
          );
          return accumulator;
        default:
          accumulator.push(
            `*${getWeekday(dateDay.getDay())}* ${dateDay
              .toLocaleDateString('sv-SE')
              .slice(-5)} ${emojiArr[i]}`
          );
          return accumulator;
      }
    },
    <string[]>[]
  );
  const coolPost =
    `**Whens ${activity.name}?** ${getRoleForActivity(activity.name)}` +
    '\n' +
    applicableDaysToString.join('\n') +
    '\n' +
    '\n' +
    'Click all the dates you are available';

  return coolPost;
};

const dateSelectorReponse = async (
  interaction: StringSelectMenuInteraction
) => {
  const activity = JSON.parse(interaction.values[0]);
  const emojiArr = createEmojiArray(activity);
  const response = createCoolPost(activity, emojiArr);
  const whensPost = await interaction.reply({
    content: `${getRoleForActivity(activity.name)} Setting up shop...`,
    fetchReply: true,
    allowedMentions: { parse: ['roles'] },
  });
  for (const emoji of emojiArr) {
    await whensPost.react(emoji);
  }
  await whensPost.edit({
    content: response,
    allowedMentions: { parse: ['roles'] },
  });
};

export default dateSelectorReponse;
