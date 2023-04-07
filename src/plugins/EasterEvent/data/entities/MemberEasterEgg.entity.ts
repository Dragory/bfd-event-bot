import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity("member_easter_eggs")
export class MemberEasterEgg {
  @Column()
  @PrimaryColumn()
  @Generated()
  id: number;

  @Column({ type: String })
  guild_id: string;

  @Column({ type: String })
  member_id: string;

  @Column({ type: String })
  message_id: string;
}
