import path from "node:path";
import { DataSource } from "typeorm";
import { Constants } from "./constants";

export const dataSource = new DataSource({
  type: "sqlite",
  database: path.join(Constants.dataDir, "database.sqlite"),
  entities: [
    "./dist/**/*.entity.js",
  ],
  migrations: [
    "./dist/migrations/*.js",
  ],
});
