import { dataSource } from "../../../dataSource";
import { MemberEasterEgg } from "./entities/MemberEasterEgg.entity";

export function getMemberEasterEggs(guildId: string, memberId: string): Promise<MemberEasterEgg[]> {
  return dataSource.manager.find(MemberEasterEgg, {
    where: {
      guild_id: guildId,
      member_id: memberId,
    },
  });
}

export async function addMemberEasterEgg(guildId: string, memberId: string, messageId: string): Promise<void> {
  await dataSource.manager.insert(MemberEasterEgg, {
    guild_id: guildId,
    member_id: memberId,
    message_id: messageId,
  });
}

type MemberEggsRow = {
  member_id: string;
  message_ids: string;
};
export async function getMembersWithAllEasterEggs(guildId: string, messageIds: string[]): Promise<string[]> {
  const rows = await dataSource
    .getRepository(MemberEasterEgg)
    .createQueryBuilder()
    .where("guild_id = :guildId", { guildId })
    .groupBy("member_id")
    .select("member_id")
    .addSelect("GROUP_CONCAT(message_id, ',')", "message_ids")
    .getRawMany<MemberEggsRow>();
  
  const membersWithAllEasterEggs: string[] = [];
  for (const row of rows) {
    const rowMessageIds = row.message_ids.split(",");
    if (messageIds.every(id => rowMessageIds.includes(id))) {
      membersWithAllEasterEggs.push(row.member_id);
    }
  }

  return membersWithAllEasterEggs;
}
