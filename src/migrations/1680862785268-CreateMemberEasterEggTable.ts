import { MigrationInterface, QueryRunner, Table, TableColumn, TableIndex } from "typeorm"

export class CreateMemberEasterEggTable1680862785268 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "member_easter_eggs",
        columns: [
          new TableColumn({
            name: "id",
            type: "INTEGER",
            generationStrategy: "increment",
            isPrimary: true,
          }),
          new TableColumn({
            name: "guild_id",
            type: "TEXT",
          }),
          new TableColumn({
            name: "member_id",
            type: "TEXT",
          }),
          new TableColumn({
            name: "message_id",
            type: "TEXT",
          }),
        ],
        indices: [
          new TableIndex({
            columnNames: ["guild_id", "member_id", "message_id"],
            isUnique: true,
          }),
        ],
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("member_easter_eggs");
    }
}
