import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./src/entities/user.entity";
import { ProgramEntity } from "./src/entities/program.entity";
import { PlanEntity } from "./src/entities/plan.entity";
import dotenv from "dotenv-flow";

dotenv.config();

export const  AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "its lock", 
    database: "hame_porsi", 
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD, 
    // database: process.env.DB_NAME, 
    synchronize: true,
    logging: false,
    entities: [UserEntity, ProgramEntity, PlanEntity],
    migrations: [],
    subscribers: [], 
})