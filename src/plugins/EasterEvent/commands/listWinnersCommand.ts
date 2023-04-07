import { guildPluginSlashCommand } from "knub";
import { EasterEventPluginType } from "../types";
import { getMembersWithAllEasterEggs } from "../data/memberEasterEggs";
import { AttachmentBuilder } from "discord.js";

export const listWinnersCommand = guildPluginSlashCommand<EasterEventPluginType>()({
  name: "egg_winners",
  description: "List everyone who has found all the eggs",
  signature: [],
  async run({ pluginData, interaction }) {
    const messageIds = pluginData.config.get().easter_egg_messages;
    const winners = await getMembersWithAllEasterEggs(pluginData.guild.id, messageIds);
    if (winners.length === 0) {
      interaction.reply("No one has found all the eggs yet!");
      return;
    }

    const content = winners.join("\n");
    interaction.reply({
      files: [
        new AttachmentBuilder(Buffer.from(content), {
          name: "winners.txt",
        }),
      ],
    });
  },
});
