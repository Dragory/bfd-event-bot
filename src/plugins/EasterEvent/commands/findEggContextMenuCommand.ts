import { guildPluginMessageContextMenuCommand } from "knub";
import { EasterEventPluginType } from "../types";
import { addMemberEasterEgg, getMemberEasterEggs } from "../data/memberEasterEggs";

function getRemainingStr(remaining: number): string {
  return remaining === 1
    ? "Just one more egg to go."
    : `There are ${remaining} eggs left.`;
}

export const findEggContextMenuCommand = guildPluginMessageContextMenuCommand<EasterEventPluginType>()({
  name: "I found an egg!",
  async run({ pluginData, interaction }) {
    const eggMessages = new Set(pluginData.config.get().easter_egg_messages);

    if (! eggMessages.has(interaction.targetMessage.id)) {
      interaction.reply({
        content: "Sorry, that message does not contain an easter egg!",
        ephemeral: true,
      });
      return;
    }

    const memberEggs = await getMemberEasterEggs(pluginData.guild.id, interaction.user.id);
    const memberEggMessages = new Set(memberEggs.map(egg => egg.message_id));

    if (Array.from(eggMessages.values()).every(msgId => memberEggMessages.has(msgId))) {
      await interaction.reply({
        content: "You've already found all eggs! Congratulations!",
        ephemeral: true,
      });
      return;
    }
    
    let remaining = Array.from(eggMessages.values()).filter(msgId => ! memberEggMessages.has(msgId)).length;

    if (memberEggMessages.has(interaction.targetMessage.id)) {
      await interaction.reply({
        content: `You've already found this egg! ${getRemainingStr(remaining)}`,
        ephemeral: true,
      });
      return;
    }

    await addMemberEasterEgg(pluginData.guild.id, interaction.user.id, interaction.targetMessage.id);
    remaining--;

    if (remaining === 0) {
      await interaction.reply({
        content: "You found the last egg! Congratulations!",
        ephemeral: true,
      });

      const logChannelId = pluginData.config.get().log_channel;
      const logChannel = logChannelId != null ? pluginData.guild.channels.cache.get(logChannelId) : null;
      if (logChannel?.isTextBased()) {
        logChannel.send({
          content: `<@!${interaction.user.id}> has found all ${eggMessages.size} eggs!`,
        }).catch(() => {});
      }

      return;
    }

    await interaction.reply({
      content: `You found an egg! ${getRemainingStr(remaining)}`,
      ephemeral: true,
    });
  },
});
