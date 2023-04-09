import { guildPluginSlashCommand, slashOptions } from "knub";
import { EasterEventPluginType } from "../types";
import { checkMessageForEggs } from "./checkMessageForEggs";

const snowflakeRegex = /^\d{18,22}$/i;
const messageLinkRegex = /^https:\/\/(?:[^\s.]+\.)?discord.com\/channels\/\d+\/\d+\/(\d{18,22})\/?$/i;

export const findEggSlashCommand = guildPluginSlashCommand<EasterEventPluginType>()({
  name: "egg",
  description: "Check for an egg in a message",
  signature: [
    slashOptions.string({
      name: "message",
      description: "Link to the message",
      required: true,
    }),
  ],
  async run({ pluginData, options, interaction }) {
    let targetMessageId: string | null = null;
    if (snowflakeRegex.test(options.message)) {
      targetMessageId = options.message;
    } else {
      const matches = options.message.match(messageLinkRegex);
      if (matches) {
        targetMessageId = matches[1];
      }
    }

    if (! targetMessageId) {
      interaction.reply({
        content: "I couldn't find that message. Double-check you've copied the message link correctly!",
        ephemeral: true,
      });
      return;
    }

    await checkMessageForEggs(pluginData, targetMessageId, interaction);
  },
});
