import { guildPluginMessageContextMenuCommand } from "knub";
import { EasterEventPluginType } from "../types";
import { checkMessageForEggs } from "./checkMessageForEggs";

export const findEggContextMenuCommand = guildPluginMessageContextMenuCommand<EasterEventPluginType>()({
  name: "I found an egg!",
  async run({ pluginData, interaction }) {
    await checkMessageForEggs(pluginData, interaction.targetMessage.id, interaction);
  },
});
