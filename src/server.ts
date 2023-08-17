import { app, PORT } from ".";
import { AppDataSource } from "../data-source";
import { seedUser } from "./entities/seed";

AppDataSource.initialize()
    .then(() => seedUser())
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})