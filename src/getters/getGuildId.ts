import { CommandInteraction } from 'discord.js';
const getGuildId = (interaction: CommandInteraction) => {
  const { guildId } = interaction;
  if (!guildId) {
    throw new Error('No guild id found');
  }
  return guildId;
};

export default getGuildId;
