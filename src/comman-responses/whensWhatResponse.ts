import {
  ActionRowBuilder,
  StringSelectMenuInteraction,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from 'discord.js';
import { createWeek, getWeekday } from '../utils/dateHelpers';
// https://discord.com/oauth2/authorize?client_id=1192467608088367246&permissions=0&scope=bot
const whensWhatResponse = async (interaction: StringSelectMenuInteraction) => {
  const currentDate = new Date();
  const weekArray = createWeek(currentDate);
  const select = new StringSelectMenuBuilder()
    .setCustomId('dateSelector')
    .setPlaceholder("What's the first day in the cycle?");

  weekArray.forEach(weekday => {
    const selectedActivity = JSON.parse(interaction.values[0]);
    selectedActivity.startDate = weekday.getTime();
    select.addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel(
          `${getWeekday(weekday.getDay())} ${weekday
            .toLocaleDateString()
            .slice(-5)}`
        )
        .setValue(JSON.stringify(selectedActivity))
    );
  });

  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    select
  );

  return interaction.reply({
    ephemeral: true,
    components: [row],
  });
};

export default whensWhatResponse;
