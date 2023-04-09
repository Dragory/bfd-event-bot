import { DataSource } from "typeorm";
import { Constants } from "./constants";

export const dataSource = new DataSource({
  type: "mysql",

  host: "mysql",
  username: "bfd-easter-bot",
  password: Constants.env.MYSQL_PASSWORD,
  database: "bfd-easter-bot",

  charset: "utf8mb4",
  timezone: "UTC",
  supportBigNumbers: true,
  bigNumberStrings: true,
  dateStrings: true,

  entities: [
    "./dist/**/*.entity.js",
  ],
  migrations: [
    "./dist/migrations/*.js",
  ],
});
