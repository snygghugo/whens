import {
  ActionRowBuilder,
  CommandInteraction,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from 'discord.js';
import { activities } from '../activities/activities';
export const data = new SlashCommandBuilder()
  .setName('whens')
  .setDescription('Who knows!!!!');

export const execute = async (interaction: CommandInteraction) => {
  const activitySelect = new StringSelectMenuBuilder()
    .setCustomId('whensWhat')
    .setPlaceholder("When's what?");

  Object.values(activities).forEach(activityObject => {
    activitySelect.addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel(activityObject.name)
        .setValue(JSON.stringify(activityObject))
    );
  });

  const whensWhatRow =
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      activitySelect
    );
  const response = await interaction.reply({
    ephemeral: true,
    components: [whensWhatRow],
    fetchReply: true,
  });
  setTimeout(() => {
    response.delete();
  }, 5 * 60 * 1000);
  return;
};
