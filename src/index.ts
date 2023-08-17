import express from "express";
import { router as planRoutes } from "./controllers/plan";
import { UserController } from "./controllers/user";
import { router as programRoutes } from "./controllers/program";
import { router as voteRouter } from "./controllers/vote";

export const app = express();
export const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userController = new UserController();

app.use("/plan", planRoutes);
app.use("/program", programRoutes);
app.use("/vote", voteRouter);
app.use(userController.router);
