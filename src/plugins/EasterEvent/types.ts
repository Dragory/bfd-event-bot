import { BasePluginType } from "knub";
import { z } from "zod";
import { Queue } from "../../utils/Queue";

export const EasterEventPluginConfigSchema = z.object({
  easter_egg_messages: z.array(z.string()),
  log_channel: z.string().optional(),
});

export interface EasterEventPluginType extends BasePluginType {
  config: z.TypeOf<typeof EasterEventPluginConfigSchema>;
  state: {
    queue: Queue;
  };
}
