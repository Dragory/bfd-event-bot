import { guildPlugin } from "knub";
import { EasterEventPluginConfigSchema, EasterEventPluginType } from "./types";
import { Queue } from "../../utils/Queue";
import { findEggContextMenuCommand } from "./commands/findEggContextMenuCommand";
import { listWinnersCommand } from "./commands/listWinnersCommand";
import { findEggSlashCommand } from "./commands/findEggSlashCommand";

export const EasterEventPlugin = guildPlugin<EasterEventPluginType>()({
  name: "easter_event",
  configParser: (input) => EasterEventPluginConfigSchema.parse(input),

  slashCommands: [
    listWinnersCommand,
    findEggSlashCommand,
  ],

  contextMenuCommands: [
    findEggContextMenuCommand,
  ],

  beforeLoad(pluginData) {
    pluginData.state.queue = new Queue();
  },
});
