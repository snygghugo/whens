import { Client, StringSelectMenuInteraction } from 'discord.js';
import { config } from './config';
import { commands } from './commands';
import { deployCommands } from './deploy-commands';
import dateSelectorReponse from './comman-responses/dateSelectorResponse';
import whensWhatResponse from './comman-responses/whensWhatResponse';
// https://discord.com/api/oauth2/authorize?client_id=1192467608088367246&permissions=131072&scope=bot
const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'DirectMessages'],
});

client.once('ready', ting => {
  console.log('Discord bot is ready! 🤖');
});

client.on('guildCreate', async guild => {
  await deployCommands({ guildId: guild.id });
});

client.on('interactionCreate', async interaction => {
  if ('customId' in interaction) {
    const { customId } = interaction;
    switch (customId) {
      case 'whensWhat':
        const whensWhatInteraction = interaction as StringSelectMenuInteraction;
        await whensWhatResponse(whensWhatInteraction);
        return;
      case 'dateSelector':
        const stringSelectInteraction =
          interaction as StringSelectMenuInteraction;
        await dateSelectorReponse(stringSelectInteraction);
        return;
      default:
        break;
    }
  }
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.login(config.DISCORD_TOKEN);
