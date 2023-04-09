import { GuildPluginData } from "knub";
import { EasterEventPluginType } from "../types";
import { ChatInputCommandInteraction, ContextMenuCommandInteraction, Interaction } from "discord.js";
import { addMemberEasterEgg, getMemberEasterEggs } from "../data/memberEasterEggs";

type SupportedInteraction = ChatInputCommandInteraction | ContextMenuCommandInteraction;

function getRemainingStr(remaining: number): string {
  return remaining === 1
    ? "Just one more egg to go."
    : `There are ${remaining} eggs left.`;
}

export async function checkMessageForEggs(pluginData: GuildPluginData<EasterEventPluginType>, targetMessageId: string, interaction: SupportedInteraction) {
  const eggMessages = new Set(pluginData.config.get().easter_egg_messages);

    if (! eggMessages.has(targetMessageId)) {
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

    if (memberEggMessages.has(targetMessageId)) {
      await interaction.reply({
        content: `You've already found this egg! ${getRemainingStr(remaining)}`,
        ephemeral: true,
      });
      return;
    }

    await addMemberEasterEgg(pluginData.guild.id, interaction.user.id, targetMessageId);
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
}
