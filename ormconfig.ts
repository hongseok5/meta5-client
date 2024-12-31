import { DataSource } from "typeorm";
import { Player } from "@/entities/Player";
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "9254619o",
  database: "metas",
  synchronize: true, // 개발 환경에서만 true로 설정
  logging: false,
  entities: [Player],
  migrations: ["src/migrations/*.ts"],
});
// entities : 경로로 설정하면 안됨