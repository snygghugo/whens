import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { deployCommands } from '../deploy-commands';
import getGuildId from '../getters/getGuildId';

export const data = new SlashCommandBuilder()
  .setName('refresh')
  .setDescription('Refresh commands');

export async function execute(interaction: CommandInteraction) {
  const guildId = getGuildId(interaction);
  await deployCommands({ guildId });
  return interaction.reply('Commands probably refreshed!');
}
