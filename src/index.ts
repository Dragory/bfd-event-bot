import path from "node:path";
import fs from "node:fs/promises";
import { Client, IntentsBitField } from "discord.js";
import { Constants } from "./constants";
import { Knub } from "knub";
import { availableGuildPlugins } from "./plugins/availablePlugins";
import { dataSource } from "./dataSource";

const availableGuildPluginNames = new Set(availableGuildPlugins.map(plugin => plugin.name));

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
  ],
  allowedMentions: {
    parse: [],
    users: [],
    roles: [],
    repliedUser: false,
  },
});

const knub = new Knub(client, {
  guildPlugins: availableGuildPlugins,
  options: {
    async getConfig(id) {
      const configFile = path.join(Constants.configDir, `${id}.json`);
      try {
        await fs.access(configFile, fs.constants.R_OK);
        const contents = await fs.readFile(configFile, { encoding: "utf8" });
        return JSON.parse(contents);
      } catch (err) {
        console.warn(`Could not load config id ${id} from ${configFile}: ${(err as Error)?.message}`);
        return {};
      }
    },
    getEnabledGuildPlugins(ctx, plugins) {
      const configuredPlugins = ctx.config.plugins || ({} as Required<typeof ctx.config>["plugins"]);
      return Object.keys(configuredPlugins).filter(pluginName => availableGuildPluginNames.has(pluginName));
    },
  },
});

dataSource.initialize().then(() => {
  console.log("Initializing Knub");
  knub.initialize();
  console.log("Logging in");
  client.login(Constants.env.TOKEN);
});
