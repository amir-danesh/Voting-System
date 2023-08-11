import express from "express";
import { router as planRoutes } from "./controllers/plan";
import {router as userRoutes}  from "./controllers/user";
import { router as programRoutes } from "./controllers/program";

export const app = express();
export const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/plan", planRoutes);
app.use("/program", programRoutes) 
app.use(userRoutes);


